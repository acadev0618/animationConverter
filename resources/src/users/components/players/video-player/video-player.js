export default {
    name: "video-player",
    props: {
        element: {
            type: Object,
            required: true
        },
        controlVolume: {
            type: Number,
            default: 1,
        },
        controlState: {
            type: String,
            required: true
        },
        controlActive: {
            type: Boolean,
            default: true
        },
        controlSeek: {
            type: [Number, String],
            default: 'auto',
        }
    },
    data: function() {
        return {
            state: this.controlState,
            visible: true,
        }
    },
    computed: {
        src() {
            return this.element.content.src;
        },
    },
    watch: {
        controlState(nv, ov) {
            if (!this.controlActive) {
                return ;
            }
            if (nv === 'play') {
                if (ov === 'pause') {
                    this.resume();
                } else {
                    this.play();
                }
            } else if (nv === 'pause') {
                this.pause();
            }
        },
        controlActive(nv, ov) {
            if (nv === true) {
                if (this.controlState === 'play') {
                    this.play();
                }
            }
        },
        controlSeek(nv, ov) {
            if (nv !== 'auto' && this.controlState === 'pause') {
                this.gotoAndPause(nv);
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
            this.state = 'initial';
            this.$refs.video.currentTime = 0;
            this.$refs.video.pause();
        },
        gotoAndPause(ms) {
            this.$refs.video.currentTime = ms / 1000;
            this.pause();
        }
    },
    mounted() {
        this.$refs.video.volume = this.controlVolume;
        if (this.state === 'play') {
            this.play();
        }
    },
    components: {
    }
}
