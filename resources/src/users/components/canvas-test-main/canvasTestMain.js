import ImageElement from '../elements/image-element/image-element.vue';
import TextElement from '../elements/text-element/text-element.vue';
import LottieElement from '../elements/lottie-element/lottie-element.vue';
import ShapeElement from '../elements/shape-element/shape-element.vue';
import VideoElement from '../elements/video-element/video-element.vue';
import CTemplatePlayer from './../cplayers/c-template-player/c-template-player.vue';
import AudioPlayer from './../players/audio-player/audio-player.vue';
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Vue from 'vue';
Vue.component('vue-cropper', VueCropper);

export default {
    name: "canvas-test-main",
    data: function () {
        return {



             playerAll: false,

            templateControlSeek: 0,
            volume: this.$store.state.template.sound ? this.$store.state.template.sound.volume * 100 : 50,
            controlVolume: this.$store.state.template.sound ? this.$store.state.template.sound.volume : 0.5,
            offsetX: 0,
            offsetY: 0,
        }
    },
    methods: {

        playSlide() {
            // console.log(this.template_store);


            if (this.playerAll) {
                return false;
            }
            if (this.slide_store.state === 'pause') {
                this.$store.dispatch('current_slide/resume_slide');
            } else {
                this.$store.dispatch('current_slide/play_slide');
            }
        },
        pauseSlide() {
            if (this.playerAll) {
                return false;
            }
            this.$store.dispatch('current_slide/pause_slide');
        },
        onTemplatePlay() {
            this.$store.commit('template/set_state', 'play');
        },
        onTemplatePause() {
            this.$store.commit('template/set_state', 'pause');
        },
        onTemplateStop() {
            this.$store.commit('template/set_state', 'initial');
            this.playerAll = false;
        },
        volumeInput() {
            this.controlVolume = this.volume / 100;
        },
        canBackward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            return index > 0;
        },
        canForward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            return index < this.template_store.slides.length - 1;
        },
        slideBackward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            this.setCurrentSlide(this.template_store.slides[index - 1]);
        },
        slideForward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            this.setCurrentSlide(this.template_store.slides[index + 1]);
        },
        setCurrentSlide(slide) {
            if (this.state === 'play') {
                return false;
            }
            if (slide.id !== this.slide_store.id) {
                this.$store.dispatch('template/disconnect_with_current');
                this.$store.commit('current_slide/set_with', slide);
                this.$store.dispatch('template/connect_with_current');
            }
        },
        onTemplateElementClick(element, slide) {
            this.onTemplateStop();
            this.setCurrentSlide(slide);
            this.$store.dispatch('current_slide/stop_slide');
            this.$store.commit('current_slide/set_selected', element.id);
        },
        onEditorElementClick(element) {
            this.$store.dispatch('current_slide/stop_slide');
            this.$store.commit('current_slide/set_selected', element.id);
        },


        playTemplate() {
            this.playerAll = true;
            this.$store.commit('template/set_state', 'play');
        },



        pauseTemplate() {
            this.$store.commit('template/set_state', 'pause');
        },
        resumeTemplate() {
            this.$store.commit('template/set_state', 'play');
        }
    },
    created(){
    },
    mounted() {
        this.offsetX = this.$refs.workspace.getBoundingClientRect().left;
        this.offsetY = this.$refs.workspace.getBoundingClientRect().top;
        // let that = this;
        // document.onreadystatechange = function (e) {
        //     that.playTemplate();
        //     // console.log(e);
        // }
    },
    computed: {
        slide_store: function () {
            return this.$store.state.current_slide;
        },
        template_store: function () {
            return this.$store.state.template;
        },
        template_seek() {
            return this.template_store.timeSeek;
        },
        editorZoom() {
            return this.$store.state.editor.zoom;
        },
        marginTopByZoom() {
            let offset = this.$store.state.editor.zoom - 100;
            if (offset > 0) {
                return this.template_store.height * offset / 100 / 2;
            } else {
                return this.template_store.height * offset / 100 / 2;
            }
        }
    },
    watch: {
        template_seek(nv, ov) {
            if (this.$store.state.template.state === 'pause') {
                this.playerAll = true;
                this.templateControlSeek = nv;
                this.$store.dispatch('current_slide/stop_slide');
            }
        }
    },
    components: {
        ImageElement,
        TextElement,
        LottieElement,
        ShapeElement,
        VideoElement,
        CTemplatePlayer,
        AudioPlayer
    }
}
