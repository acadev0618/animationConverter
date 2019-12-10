import ImagePlayer from './../image-player/image-player.vue';
import TextPlayer from './../text-player/text-player.vue';
import ShapePlayer from './../shape-player/shape-player.vue';
import TimerService from './../../../services/timer-service';
import AnimationMaker from './../../animation-maker';
import VideoPlayer from '././../video-player/video-player.vue';
import LottiePlayer from '././../lottie-player/lottie-player.vue';

export default {
    name: "slide-player",
    props: {
        slide: {
            type: Object,
            required: true
        },
        enterAnimation: {
            type: [Object, Boolean],
            default: false
        },
        controlState: {
            type: String,
            default: 'initial'
        },
        controlSeek: {
            type: [Number, String],
            default: 'auto'
        },
        controlVolume: {
            type: Number,
            default: 1,
        },
    },
    data: function() {
        let enterDelay = this.enterAnimation ? this.enterAnimation.duration : 0;
        return {
            offsetX: 0,
            offsetY: 0,
            state: this.controlState,
            timer: new TimerService(this.slide.duration, enterDelay),
            animation: false,
            animationStyle: {},
            activeSlide: false,
            animated: false,
            visible: true,
        }
    },
    watch: {
        controlState(nv, ov) {
            if (nv === 'play') {
                if (ov !== 'pause') {
                    this.play();
                } else {
                    this.resume();
                }
            } else if (nv === 'initial') {
                this.stop();
            } else if (nv === 'pause'){
                this.pause();
            }
        },
        controlSeek(nv, ov) {
            if (nv !== 'auto') {
                this.gotoAndPause(nv);
            }
        }
    },
    mounted: function () {
        this.offsetX = this.$refs.workspace.getBoundingClientRect().left;
        this.offsetY = this.$refs.workspace.getBoundingClientRect().top;
        this.prepare();
        if (this.controlState === 'play') {
            this.play();
        } else {
            this.gotoAndPause(this.controlSeek);
        }
    },
    methods: {
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
            this.animated = true;
            this.timer.applyAfter(this.animation.duration + animationDelay, () => {
                this.animated = false;
                this.animation = false;
                this.animationStyle = {};
            });
        },
        prepare() {
            this.visible = true;
            if (this.enterAnimation) {
                this.timer.atBegin(() => {
                    this.playAnimation(this.enterAnimation);
                });
                this.timer.applyAt(0, () => { this.activeSlide = true });
            } else {
                this.activeSlide = true;
            }
            if (this.slide.animation.leave) {
                this.timer.applyAt(this.slide.duration, () => {
                    this.playAnimation(this.slide.animation.leave);
                });
                this.timer.applyAt(this.slide.duration + this.slide.animation.leave.duration, () => {
                    this.$emit('afterLeave');
                    this.visible = false;
                });
            } else {
                this.timer.applyAt(this.slide.duration, () => {
                    this.visible = false;
                    this.$emit('afterLeave');
                });
            }
            if (this.slide.animation.nextEnter) {
                this.timer.applyAt(this.slide.duration + this.slide.animation.space, () => {
                    this.$emit('nextEnter', this.slide.animation.nextEnter);
                });
            } else {
                this.timer.applyAt(this.slide.duration, () => {
                    this.$emit('nextEnter', false);
                });
            }
        },
        play() {
            this.state = 'play';
            this.timer.play();
            if (this.animation) {
                this.animationStyle.animationPlayState = 'running';
            }
        },
        resume() {
            this.state = 'play';
            this.timer.resume();
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
        stop() {
            this.state = 'initial';
            this.timer.stop();
            this.animation= false;
            this.animationStyle = {};
            this.activeSlide = false;
            this.animated = false;
            this.visible = true;
        },
        gotoAndPause(ms) {
            this.visible = true;
            this.state = 'pause';
            this.timer.gotoAndPause(ms);
            let timeSeek = 0;
            if (this.enterAnimation) {
                timeSeek += this.enterAnimation.duration;
            }
            if (timeSeek >= ms) {
                let enterAnimation = {...this.enterAnimation};
                enterAnimation.delay = -ms;
                this.playAnimation(enterAnimation);
                return ;
            }
            timeSeek += this.slide.duration;
            if (timeSeek >= ms) {
                this.activeSlide = true;
                this.animation = false;
                this.animationStyle = {};
                return ;
            }
            let leaveAnimation = this.slide.animation.leave;
            if (leaveAnimation) {
                leaveAnimation = {...leaveAnimation};
                leaveAnimation.delay = -(ms - timeSeek);
                this.playAnimation(leaveAnimation);
                return;
            }
        },
        elementClick(element) {
            this.$emit('element_click', element);
        }
    },
    components: {
        ImagePlayer,
        TextPlayer,
        ShapePlayer,
        VideoPlayer,
        LottiePlayer,
        AnimationMaker
    }
}
