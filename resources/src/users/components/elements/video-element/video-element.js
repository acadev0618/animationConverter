import Toolbar from './../../toolbar/toolbar';

export default {
    name: "video-element",
    props: {
        element: {
            type: Object,
            required: true
        },
        controlVolume: {
            type: Number,
            default: 1,
        },
        parentZoom: {
            type: Number,
            default: 100,
        }
    },
    data: function() {
        return {
            visible: true,
            state: this.$store.state.current_slide.state,
        }
    },
    computed: {
        slide_store() {
            return this.$store.state.current_slide;
        },
        slideState() {
            return this.$store.state.current_slide.state;
        },
        src() {
            return this.element.content.src;
        },
    },
    watch: {
        slideState(nv, ov) {
            if (nv === 'play') {
                if (ov === 'pause') {
                    this.resume();
                } else {
                    this.play();
                }
            } else if (nv === 'edit') {
                this.stop();
            } else if (nv === 'pause') {
                this.pause();
            }
        },
        src(nv, ov) {
            // this.$refs.videoSrc.src = nv;
            this.$refs.video.load();
            if (this.state === 'play') {
                this.$refs.video.play();
            }
        },
        controlVolume(nv) {
            this.$refs.video.volume = nv;
        }
    },
    methods: {
        play() {
            this.state = 'play';
            this.$refs.video.play();
        },
        pause() {
            this.state = 'pause';
            this.$refs.video.pause();
        },
        resume() {
            this.state = 'play';
            this.$refs.video.play();
        },
        stop() {
            this.state = 'edit';
            this.$refs.video.currentTime = 0;
            this.$refs.video.pause();
        },
        deleteElement() {
            this.$store.commit('current_slide/set_background_video', false);
        },
        styleChange(payload) {
            this.$store.commit('current_slide/update_backgroundVideo_style', payload);
        },
        onClick() {
            if (this.state === 'edit') {
                this.$store.commit('current_slide/set_selected', 'background_video');
            }
        },
        onChangeStop() {
            this.$store.commit('template/insert_history');
        },
    },
    mounted() {
        this.$refs.video.load();
        if (this.state === 'play') {
            this.play();
        }
    },
    components: {
        Toolbar
    }
}
