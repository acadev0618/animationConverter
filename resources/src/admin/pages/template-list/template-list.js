import {mapMutations} from 'vuex';
import {ClientTable} from 'vue-tables-2';
import Confirm from '../../components/Confirm';
import AppHelper from './../../../app-helper';
import Lottie from 'vue-lottie';
import _ from "lodash";

Vue.use(ClientTable);
export default {
    name: "template-list",
    components: {
        'confirm': Confirm,
        Lottie
    },
    data: function() {
        let options = this.$store.state.table_options;
        let tab = this.$route.params.tab || 'video_template';
        options.headings = {
            temp_name: 'Template Name',
            thumb_url: 'Thumb Name',
            duration: 'Duration',
            aspect: 'Aspect',
            design_type: 'Design Type',
            category: 'Category',
            preview: 'Preview',
            action: 'Action'
        };
        options.sortable = ['temp_name', 'aspect'];
        options.filterable = ['temp_name', 'aspect'];

        return {
            deleteId: '',
            types: ['error', 'warn', 'info', 'success'],
            title: 'Template',
            msg: '',
            type: 'error',
            tab: tab,
            videoTemplate: {
                loaded: false,
                items: [],
                columns: ['temp_name', 'duration', 'aspect', 'design_type', 'category', 'action'],
                options: options,
            },
            imageTemplate: {
                loaded: false,
                items: [],
                columns: ['temp_name', 'aspect', 'design_type', 'category', 'action'],
                options: options,
            },
            textEffect: {
                loaded: false,
                items: [],
                columns: ['preview', 'action'],
                options: options
            },
        }
    },
    beforeDestroy() {
        window.vEvent.stop('ok-delete-template', this.confirmDel);
    },
    created() {
        this.setMiniToaster(miniToastr);
    },
    mounted() {
        window.vEvent.listen('ok-delete-template', this.confirmDel);
        if (this.tab === 'text_effect') {
            this.getTextEffect();
        } else {
            this.getVideoTemplate();
        }

    },
    methods: {
        ...mapMutations([
            'setMiniToaster',
            'deleteMessage'
        ]),
        getVideoTemplate() {
            this.tab = 'video_template';
            if (!this.videoTemplate.loaded) {
                let loader = this.$loading.show();
                Vue.axios.post('/common/video-template/get-many', {where: {is_model: 1}}).then(res => {
                    this.videoTemplate.items = res.data.filter(item => item.media_type === 'video');
                    this.videoTemplate.loaded = true;

                    this.imageTemplate.items = res.data.filter(item => item.media_type === 'image');
                    this.imageTemplate.loaded = true;
                    loader.hide();
                });
            }
        },
        getImageTemplate() {
            this.tab = 'image_template';
            if (!this.videoTemplate.loaded) {
                let loader = this.$loading.show();
                Vue.axios.post('/common/video-template/get-many', {where: {is_model: 1}}).then(res => {
                    this.videoTemplate.items = res.data.filter(item => item.media_type === 'video');
                    this.videoTemplate.loaded = true;

                    this.imageTemplate.items = res.data.filter(item => item.media_type === 'image');
                    this.imageTemplate.loaded = true;
                    loader.hide();
                });
            }
        },
        getTextEffect() {
            this.tab = 'text_effect';
            if (!this.textEffect.loaded) {
                let loader = this.$loading.show();
                Vue.axios.post('/common/bodymovin/get-many', {where: {type: 'text_effect'}}).then(res => {

                    this.textEffect.items = res.data;
                    this.textEffect.loaded = true;
                    loader.hide();
                });
            }
        },
        deleteTemplateConfirm(id) {
            this.$dialog
                .confirm('Are you sure you want to delete this?')
                .then((dialog) => {
                    this.deleteTemplate(id);
                })
                .catch(function() {
                });
        },
        deleteTemplate(id) {
            Vue.axios.post('/common/video-template/delete', {where: {id: id}}).then(res => {
                this.videoTemplate.items = this.videoTemplate.items.filter(item => item.id !== id);
            });
        },
        deleteTextEffectConfirm(id) {
            this.$dialog
                .confirm('Are you sure you want to delete this?')
                .then((dialog) => {
                    this.deleteTextEffect(id);
                })
                .catch(function() {
                });
        },
        deleteTextEffect(id) {
            Vue.axios.post('/common/bodymovin/delete', {where: {id: id}}).then(res => {
                this.textEffect.items = this.textEffect.items.filter(item => item.id !== id);
            });
        },
        durationFormat(ms) {
            return AppHelper.msToHMS(ms);
        },
        lottieOption(json) {
            return {
                animationData: JSON.parse(json),
                autoplay: true,
                loop: true,
            }
        }
    }
}
