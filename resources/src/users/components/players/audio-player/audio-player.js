export default {
    name: "audio-player",
    props: {
        element: {
            type: Object,
            required: true
        },
        autoPlay: {
            type: Boolean,
            default: false
        },
        controlState: {
            type: String,
            default: 'initial',
        },
        controlSeek: {
            type: Number,
            default: 0,
        },
        controlVolume: {
            type: Number,
            default: 1,
        }
    },
    data: function () {
        return {
            progress: 0,
            duration: 100,
            state: this.controlState,
        }
    },
    computed: {
        src() {
            return this.element.content.src;
        }
    },
    watch: {
        src(nv, ov) {
            this.$refs.audioSrc.src = nv;
            this.$refs.audio.load();
            if (this.state === 'play') {
                this.$refs.audio.play();
            }
        },
        controlSeek(nv, ov) {
            this.$refs.audio.currentTime = nv / 1000;
        },
        controlState(nv) {
            switch (nv) {
                case 'play':
                    this.play();
                    break;
                case 'pause':
                    this.pause();
                    break;
                default:
                    this.stop();
                    break;
            }
        },
        controlVolume(nv) {
            this.$refs.audio.volume = nv;
        }
    },
    methods: {
        timeUpdate(e) {
            if (this.$refs.audio) {
                this.progress = Math.floor(this.$refs.audio.currentTime * 1000);
            }
        },
        loadedData(e) {
            this.duration = Math.floor(this.$refs.audio.duration * 1000);
        },
        progressInput() {
            this.$refs.audio.currentTime = this.progress / 1000;
        },
        play() {
            this.$refs.audio.play();
        },
        pause() {
            this.$refs.audio.pause();
        },
        stop() {
            this.$refs.audio.currentTime = 0;
            this.pause();
        }
    },
    mounted() {
        this.$refs.audio.load();
        this.$refs.audio.volume = this.controlVolume;
        if (this.controlState === 'play') {
            this.play();
        }
    }
}
