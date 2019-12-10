import SvgTransform from "./../../SvgTransform";
import AnimationMaker from './../../animation-maker';
import TimerService from './../../../services/timer-service';
import CropImagePreview from './../../previews/crop-image-preview';

export default {
    name: "image-svg-player",
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
                this.gotoAndPause(nv);
            }
        }
    },
    data: function() {
        return {
            animation: false,
            animationStyle: {},
            state: this.controlState,
            visible: false,
            timer: new TimerService(this.element.duration, this.element.delay),
            elementImageUrl: 'Hello  why',
        }
    },
    components: {
        SvgTransform,
        AnimationMaker,
        CropImagePreview
    },
    methods: {
        makeImageUrl() {
            let image_url=this.element.content.src;
            // image_url= image_url.substring(4, image_url.length - 1);
            this.elementImageUrl=image_url;

            console.log('elemet data:  ',this.element);
        },
        getElementStyles(element) {

            console.log('getElementStyles',element.styles);

            const styles = element.styles ? element.styles : {};
            return {
                width: `${element.width}px`,
                height: `${element.height}px`,
                ...styles
            }
        },
        playAnimation(animation) {
            this.animation = animation;
        },
        animationMade(keyframe) {
            let animationDelay = this.animation.delay ? this.animation.delay : 0;
            this.animationStyle = {
                animationName: keyframe,
                animationDuration: this.animation.duration + 'ms',
                animationTimingFunction: this.animation.ease,
                animationDelay: animationDelay + 'ms',
                animationPlayState: this.state === 'play' ? 'running' : 'paused'
            };
        },
        styleChange(payload) {
        },
        play() {
            this.state = 'play';
            this.timer.play();
            if (this.animation) {
                this.animationStyle.animationPlayState = 'running';
            }
        },
        pause() {
            this.state = 'pause';
            this.timer.pause();
            if (this.animation) {
                this.animationStyle.animationPlayState = 'paused';
            }
        },
        resume() {
            this.state = 'play';
            this.timer.resume();
        },
        toInitial() {
            this.animation = false;
            this.state = this.controlState;
            this.visible = true;
            this.timer.stop();
        },
        prepare() {
            if (this.element.animation.in) {
                this.timer.applyAt(0, () => {
                    this.visible = true;
                    this.playAnimation(this.element.animation.in);
                });
            } else {
                if (this.element.delay === 0) {
                    this.visible = true;
                } else {
                    this.timer.applyAt(0, () => {
                        this.visible = true;
                    });
                }
            }
            if (this.element.animation.out) {
                this.timer.applyAt(this.element.duration - this.element.animation.out.duration, () => {
                    this.playAnimation(this.element.animation.out);
                });
            }
            this.timer.afterEnd(() => {
                // this.visible = false;
            });
        },
        gotoAndPause(ms) {
            this.timer.gotoAndPause(ms);
            this.state = 'pause';
            let timeSeek = 0;
            timeSeek += this.element.delay;
            if (timeSeek > ms) {
                if (this.element.delay === 0 && !this.element.animation.in) {
                    this.visible = true;
                } else {
                    this.visible = false;
                }
                this.animation = false;
                return ;
            }
            if (this.element.animation.in) {
                timeSeek += this.element.animation.in.duration;
                if (timeSeek > ms) {
                    let inAnimation = {...this.element.animation.in};
                    inAnimation.delay = -(ms - this.element.delay);
                    this.playAnimation(inAnimation);
                    this.visible = true;
                    return ;
                }
                timeSeek -= this.element.animation.in.duration;
            }
            timeSeek += (this.element.duration - (this.element.animation.out ? this.element.animation.out.duration : 0));
            if (timeSeek > ms) {
                this.visible = true;
                this.animation = false;
                return;
            }
            if (this.element.animation.out) {
                timeSeek += this.element.animation.out.duration;
                if (timeSeek > ms) {
                    this.visible = true;
                    let outAnimation = {...this.element.animation.out};
                    outAnimation.delay = this.element.duration - this.element.animation.out.duration - ms;
                    this.playAnimation(outAnimation);
                    return;
                }
            }
            if (this.element.animation.out) {
                this.visible = false;
            }
        }
    },
    mounted() {
        this.prepare();
        this.makeImageUrl();

        console.log( 'elementstyle  :  ' ,this.getElementStyles(this));
        if (this.controlState === 'play') {
            if (this.controlActive) {
                this.play();
            }
        } else if (this.controlSeek !== 'auto' && this.controlState === 'pause') {
            this.gotoAndPause(this.controlSeek);
        }
    },
}
