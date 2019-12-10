import Vue from 'vue';
import AppHelper from './../../app-helper';
import TemplatePreview from './../components/previews/template-preview';
import PreviewVideoTemplateModal from "../components/preview-video-template-modal";
import store from './../store/index';

import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
Vue.use(VuejsDialog);

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Loading);

import axios from 'axios';
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import VariationSelector from './../components/variation-selector/variation-selector.vue';

new Vue({
    el: '#vue-app',
    name: 'page-browse-video-template',
    data: function () {
        let mediaType = AppHelper.getParameterFromURL('media_type');
        mediaType = mediaType ? mediaType : 'video';
        videoTemplates = videoTemplates.map(t => {
            t.data_json = JSON.parse(t.data_json);
            return t;
        });
        return {
            videoTemplates: videoTemplates,
            categories: CATEGORIES,
            aspects: videoAspects,
            designs: videoDesigns,
            sortBy: [
                {
                    label: 'Popularity',
                    value: 'popularity',
                },
                {
                    label: 'Date',
                    value: 'date',
                },
                {
                    label: 'Name',
                    value: 'name',
                },
            ],
            openVideoTemplate: false,
            toolMore: false,
            emptyBoxes: [
                {
                    height: 230,
                    items: [
                        {
                            create_new: true
                        }
                    ],
                },
                {
                    height: 0,
                    items: [],
                },
                {
                    height: 0,
                    items: [],
                },
                {
                    height: 0,
                    items: [],
                },
                {
                    height: 0,
                    items: [],
                }
            ],
            template_editable: TEMPLATE_EDITABLE,
            createFrom: TEMPLATE_EDITABLE ? false : true,
            mediaType: mediaType,
            selectedCategories: [],
            selectedAspects: [],
            selectedDesigns: [],
            selectedSortBy: false,
            createNew: false,
        }
    },
    computed: {
        boxes() {
            let boxes = AppHelper.cloneDeep(this.emptyBoxes);
            let templatesFiltered = this.videoTemplates.filter(template => template.media_type === this.mediaType);
            if (this.selectedCategories.length) {
                templatesFiltered = templatesFiltered.filter(template => this.selectedCategories.indexOf(template.category) > -1);
            }
            if (this.selectedAspects.length) {
                templatesFiltered = templatesFiltered.filter(template => this.selectedAspects.indexOf(template.aspect) > -1);
            }
            if (this.selectedDesigns.length) {
                templatesFiltered = templatesFiltered.filter(template => this.selectedDesigns.indexOf(template.design_type) > -1);
            }
            if (this.selectedSortBy) {
                templatesFiltered.sort((a, b) => {
                    let av, bv;
                    switch (this.selectedSortBy) {
                        case 'popularity':
                            av = a.id;
                            bv = b.id;
                            break;
                        case 'date':
                            av = b.created_at;
                            bv = a.created_at;
                            break;
                        case 'name':
                            av = a.temp_name;
                            bv = b.temp_name;
                            break;
                    }
                    if (av > bv) {
                        return 1;
                    } else if (av < bv) {
                        return  -1;
                    }
                    return  0;
                });
            }
            AppHelper.fillItemsInBoxes(boxes, templatesFiltered, 300, 15);
            return boxes;
        }
    },
    methods: {
        durationFormat(ms) {
            return AppHelper.msToHMS(ms);
        },
        openCustomizeModal(item) {
            this.openVideoTemplate = item;
        },
        confirmDelete(id) {
            this.$dialog
                .confirm('Are you sure you want to delete this?')
                .then((dialog) => {
                    this.deleteTemplate(id);
                })
                .catch(function() {
                });
        },
        deleteTemplate(id) {
            let loader = this.$loading.show();
            Vue.axios.post('common/video-template/delete', {where: {id: id}}).then(res => {
                loader.hide();
                this.videoTemplates = this.videoTemplates.filter(template => template.id !== id);
                return res.data;
            });
        },
        applyFilter() {
            this.boxes = AppHelper.cloneDeep(this.emptyBoxes);
            let templatesFiltered = this.videoTemplates.filter(template => template.media_type === this.mediaType);
            if (this.selectedCategories.length) {
                templatesFiltered = templatesFiltered.filter(template => this.selectedCategories.indexOf(template.category) > -1);
            }
            if (this.selectedAspects.length) {
                templatesFiltered = templatesFiltered.filter(template => this.selectedAspects.indexOf(template.aspect) > -1);
            }
            AppHelper.fillItemsInBoxes(this.boxes, templatesFiltered, 300, 15);
        },
        createWith(variation) {
            let href = '/edit-template?width=' + variation.width + '&height=' + variation.height;
            if ('design_type' in variation) {
                href += '&design_type=' + variation.design_type;
            }
            location.href = href;
        }
    },
    components: {
        TemplatePreview,
        CustomizeVideoModal: PreviewVideoTemplateModal,
        VariationSelector
    },
    store
});
