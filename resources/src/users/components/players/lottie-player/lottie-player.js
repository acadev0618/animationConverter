import FreeTransform from "./../../FreeTransform";
import AnimationMaker from './../../animation-maker';
import Lottie from 'vue-lottie';
import _ from 'lodash';

export default {
    name: "lottie-player",
    props: {
        element: {
            type: Object,
        },
        offsetX: {
            type: Number,
            required: true,
        },
        offsetY: {
            type: Number,
            required: true,
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
        },
        controlLoop: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
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
                let seek = nv > 0 ? nv : 0;
                this.gotoAndPause(seek);
            }
        }
    },
    data: function() {
        return {
            animation: false,
            animationStyle: {},
            state: 'edit',
            visible: true,
            defaultOptions: {
                animationData: _.cloneDeep(this.element.content.json),
                autoplay: false,
                loop: this.controlLoop,
            },
            anim: null,
        }

    },
    components: {
        Lottie,
        FreeTransform,
        AnimationMaker
    },
    methods: {
        handleAnimation(anim) {
            this.anim = anim;
        },
        getElementStyles(element) {
            const styles = element.styles ? element.styles : {};
            return {
                width: `${element.width}px`,
                height: `${element.height}px`,
                ...styles
            }
        },
        play() {
            this.state = 'play';
            this.anim.goToAndPlay(0);
        },
        pause() {
            this.state = 'pause';
            this.anim.pause();
        },
        resume() {
            this.state = 'play';
            this.anim.play();
        },
        stop() {
            this.state = 'initial';
        },
        gotoAndPause(ms) {
            this.state = 'pause';
            const lottieDuration = this.anim.getDuration() * 1000;

            this.anim.goToAndStop(ms > lottieDuration ? lottieDuration : ms);
        }
    },
    mounted() {
        if (this.controlState === 'play') {
            if (this.controlActive) {
                this.play();
            }
        } else if (this.controlSeek !== 'auto' && this.controlState === 'pause') {
            let seek = this.controlSeek > 0 ? this.controlSeek : 0;
            this.gotoAndPause(seek);
        }
    },
}
