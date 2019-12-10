import FreeTransform from "./../../FreeTransform";
import Toolbar from './../../toolbar/toolbar';
import AnimationMaker from './../../animation-maker';
import TimerService from './../../../services/timer-service';

export default {
    name: "shape-element",
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
        parentZoom: {
            type: Number,
            default: 100,
        }
    },
    computed: {
        slide_store() {
            return this.$store.state.current_slide;
        },
        slideState() {
            return this.$store.state.current_slide.state;
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
    },
    data: function() {
        return {
            animation: false,
            animationStyle: {},
            state: this.$store.state.current_slide.state,
            visible: true,
            timer: new TimerService(this.element.duration, this.element.delay)
        }
    },
    components: {
        FreeTransform,
        Toolbar,
        AnimationMaker
    },
    methods: {
        setSelected() {
            this.$store.commit('current_slide/set_selected', this.element.id);
        },
        update(payload) {
            this.$store.commit('current_slide/update', {id: this.element.id, sets: payload});
        },
        getElementStyles(element) {
            const styles = element.styles ? element.styles : {};
            return {
                width: `${element.width}px`,
                height: `${element.height}px`,
                ...styles
            }
        },
        deleteElement() {
            this.$store.dispatch('current_slide/delete_element', this.element.id);
        },
        playAnimation(animation) {
            this.animation = animation;
        },
        animationMade(keyframe) {
            this.animationStyle = {
                animationName: keyframe,
                animationDuration: this.animation.duration + 'ms',
                animationTimingFunction: this.animation.ease,
                animationPlayState: this.state === 'pause' ? 'paused' : 'running'
            };
        },
        styleChange(payload) {
        },
        play() {
            this.visible = false;
            this.timer.emptyCallback();
            this.prepare();
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
        stop() {
            this.animation = false;
            this.state = this.slideState;
            this.timer.stop();
            this.visible = true;
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
        onChangeStop() {
            this.$store.commit('template/insert_history');
        },
    },
    mounted() {
        if (this.state === 'play') {
            this.play();
        }
    },
}
