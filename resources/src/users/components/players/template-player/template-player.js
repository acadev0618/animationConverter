import SlidePlayer from '../slide-player/slide-player.vue';
import AudioPlayer from '../audio-player/audio-player.vue';

export default {
    name: "template-player",
    props: {
        controlState: {
            type: String,
            default: 'play'
        },
        template: {
            type: Object,
            required: true,
        },
        controlSeek: {
            type: Number,
            default: 0
        },
        controlVolume: {
            type: Number,
            default: 0.5
        },
        responsive: {
            type: Boolean,
            default: false
        }
    }
    ,
    data: function() {
        return {
            state: this.controlState,
            activeSlides: [],
            previewWidth: this.template.width,
            previewHeight: this.template.height,
            scaleHelper: {
                width: this.template.width + 'px',
                height: this.template.height + 'px',
            },
        }
    },
    methods: {
        nextEnter(animation, index) {
            if (index + 1 < this.template.slides.length) {
                this.activeSlides.push({
                    enterAnimation: animation,
                    controlSeek: 'auto',
                    index: index + 1,
                    slide: this.template.slides[index + 1]
                });
            }
        },
        afterLeave(index) {
            setTimeout(() => {
                this.activeSlides.splice(index, 1);
                if (this.activeSlides.length === 0) {
                    this.stop();
                }
            });
        },
        play() {
            this.activeSlides.push({
                slide: this.template.slides[0],
                enterAnimation: false,
                controlSeek: 'auto',
                index: 0,
            });
            this.state = 'play';
            this.$emit('onPlay');
        },
        resume() {
            this.state = 'play';
            this.$emit('onPlay');
        },
        pause() {
            this.state = 'pause';
            this.$emit('onPause');
        },
        gotoAndPause(ms) {
            this.activeSlides = [];
            let timeSeek = 0;
            let enterAnimation = false;
            for (let i = 0; i < this.template.slides.length; i ++) {
                let iSlide = this.template.slides[i];
                let slideSeek = 0;

                if (enterAnimation) {
                    timeSeek += enterAnimation.duration;
                    slideSeek += enterAnimation.duration;
                }
                if (timeSeek > ms) {
                    let enterSeek = ms - (timeSeek - enterAnimation.duration);
                    this.activeSlides.push({
                        slide: iSlide,
                        enterAnimation: enterAnimation,
                        controlSeek: enterSeek,
                        index: i,
                    });
                    break;
                }
                timeSeek += iSlide.duration;
                if (timeSeek > ms) {
                    let controlSeek = ms - (timeSeek - iSlide.duration) + slideSeek;
                    this.activeSlides.push({
                        slide: iSlide,
                        enterAnimation: enterAnimation,
                        controlSeek: controlSeek,
                        index: i,
                    });
                    break;
                }
                slideSeek += iSlide.duration;
                if (iSlide.animation.leave) {
                    timeSeek += iSlide.animation.leave.duration;
                    if (timeSeek > ms) {
                        let leaveSeek = slideSeek + ms - (timeSeek - iSlide.animation.leave.duration);
                        this.activeSlides.push({
                            slide: iSlide,
                            enterAnimation: enterAnimation,
                            controlSeek: leaveSeek,
                            index: i,
                        });
                    }
                    timeSeek -= iSlide.animation.leave.duration;
                }
                if (iSlide.animation.space) {
                    timeSeek += iSlide.animation.space;
                }
                if (timeSeek > ms) {
                    break;
                }
                enterAnimation = iSlide.animation.nextEnter;
            }
            this.pause();
        },
        stop() {
            this.state = 'initial';
            this.$emit('onStop');
        },
        onElementClick(element, slide) {
            this.$emit('element_click', element, slide);
        }
    },
    computed: {
    },
    watch: {
        controlSeek(nv, ov) {
            this.gotoAndPause(nv);
        },
        controlState(nv, ov) {
            if (nv === 'play') {
                if (this.state === 'pause') {
                    this.resume();
                } else {
                    this.play();
                }
            } else if (nv === 'pause') {
                this.pause();
            }
        }
    },
    mounted() {
        if (this.responsive) {
            this.previewWidth = Math.round( this.$el.getBoundingClientRect().width );
            this.previewHeight = Math.round( this.template.height * this.previewWidth / this.template.width );
            this.scaleHelper.transformOrigin = 'top left';
            this.scaleHelper.transform = 'scale(' + this.previewWidth / this.template.width + ')';
        }
        if (this.controlState === 'play') {
            this.play();
        } else if (this.controlState === 'pause') {
            this.gotoAndPause(this.controlSeek);
        }
    },
    beforeDestroy() {
        this.$store.commit('template/set_state', 'initial');
    },
    components: {
        SlidePlayer,
        AudioPlayer
    }
}
