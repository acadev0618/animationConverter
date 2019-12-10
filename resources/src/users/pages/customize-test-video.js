import Vue from 'vue';
import VideoElementContainer from './../components/video-element-container';
import CanvasTestEditor from './../components/canvasTestEditor';
import VideoTestEditor from './../components/videoTestEditor';
import SaveTemplate from './../components/save-template/save-template.vue';
import RangeSlider from 'vue-range-slider';
import axios from 'axios';
import VueAxios from "vue-axios";
import store from './../store/index';
import AppHelper from './../../app-helper';
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

Vue.use(VueAxios, axios);
Vue.component('range-slider', RangeSlider);
Vue.component('VuePerfectScrollbar', VuePerfectScrollbar);
import _ from 'lodash';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.component('loading', Loading);
Vue.use(Loading);



new Vue({
    el: '#customize-video',
    name: 'page-customize-video',
    data: function () {
        if (videoTemplate) {
            console.log(videoTemplate,'exist video before ');
            videoTemplate.data_json = JSON.parse(videoTemplate.data_json);
            videoTemplate.design_type = JSON.parse(videoTemplate.design_type);
            console.log(videoTemplate,'exist video after ');
        } else {
            console.log("  no video ");
            this.$store.commit('template/add_slide', this.$store.state.current_slide);
            let template = _.cloneDeep(this.$store.state.template);
            const width = parseInt(AppHelper.getParameterFromURL('width'));
            const height = parseInt(AppHelper.getParameterFromURL('height'));
            const design_type = AppHelper.getParameterFromURL('design_type');
            template.width = width;
            template.height = height;
            videoTemplate = {
                temp_name: '',
                width: template.width,
                height: template.height,
                data_json: template,
                design_type: [],
            };
            if (design_type) {
                videoTemplate.design_type = [design_type];
            }
        }

        return {
            videoTemplate: videoTemplate,
            saveTemplate: false,
            createFrom: CREATE_FROM,
            templateEditable: TEMPLATE_EDITABLE,
            zoomItems: [
                {
                    label: '25%',
                    value: 25,
                },
                {
                    label: '50%',
                    value: 50,
                },
                {
                    label: '75%',
                    value: 75,
                },
                {
                    label: '100%',
                    value: 100,
                },
                {
                    label: '125%',
                    value: 125,
                },
                {
                    label: '150%',
                    value: 150,
                },
                {
                    label: 'Fit To Stage',
                    value: 'fit',
                },
            ],
        };
    },
    computed: {
        templateDuration() {
            return Math.round(this.$store.getters['template/duration']() * 10 / 1000) / 10;
        },
        current_slide() {
            return this.$store.state.current_slide;
        },
        canHistoryBack() {
            return this.$store.state.template.history.seek > 0;
        },
        canHistoryForward() {
            return this.$store.state.template.history.seek < this.$store.state.template.history.items.length - 1;
        },
        zoom: {
            get() {
                return this.$store.state.editor.zoom;
            },
            set(v) {
                this.$store.commit('editor/set_zoom', v);
            }
        }
    },
    watch: {
    },
    components: {
        VideoElementContainer,
        VideoTestEditor,
        // CanvasTestEditor,
        SaveTemplate
    },
    methods: {
        saveAsVideo() {
            let template = this.$store.getters['template/get_template']();
            this.videoTemplate.data_json = template;
            this.saveTemplate = _.cloneDeep( this.videoTemplate );
            this.saveTemplate.media_type = 'video';
            if (this.videoTemplate.media_type === 'image') {
                delete this.saveTemplate.id;
            }
        },
        saveAsImage() {
            let template = this.$store.getters['template/get_template']();
            this.videoTemplate.data_json = template;
            this.saveTemplate = _.cloneDeep( this.videoTemplate );
            this.saveTemplate.media_type = 'image';
            this.saveTemplate.data_json.slides = this.saveTemplate.data_json.slides.filter(slide => slide.id === this.current_slide.id);
            if (this.videoTemplate.media_type === 'video') {
                delete this.saveTemplate.id;
            }
        },
        save() {
            if (this.videoTemplate.media_type === 'image') {
                this.saveAsImage();
            } else {
                this.saveAsVideo();
            }
        },
        afterSave(payload) {
            this.saveTemplate = false;
            this.createFrom = false;
            delete payload.data_json;
            delete payload.media_type;
            Object.assign(this.videoTemplate, payload);
        },
        historyBack() {
            this.$store.dispatch('template/history_back');
        },
        historyForward() {
            this.$store.dispatch('template/history_forward');
        },
        setZoom(v) {
            if (v === 'fit') {
                const workingSize = this.$refs.videoTestEditor.workingSize();
                const templateWidth = this.$store.state.template.width;
                const templateHeight = this.$store.state.template.height + 40;
                const scale = Math.min(workingSize.width / templateWidth, workingSize.height / templateHeight);
                this.zoom = Math.round(scale * 100);
            } else {
                this.zoom = v;
            }
        }
    },
    mounted() {
        this.$store.dispatch('template/set_with', videoTemplate.data_json);

        this.$store.commit('demo/set_with', videoTemplate.data_json);


        console.log(videoTemplate.data_json,'json');

    },
    store
});
