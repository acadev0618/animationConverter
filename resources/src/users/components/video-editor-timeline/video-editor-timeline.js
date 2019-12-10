import SlidePreview from './../previews/slide-preview';
import AddNewSlide from './../add-new-slide/add-new-slide.vue';
import AddSlideTransition from './../add-slide-transition/add-slide-transition.vue';
import draggable from 'vuedraggable'
import {TweenLite} from "gsap/TweenLite";
import AppHelper from './../../../app-helper';
import AppResizable from "./../shared/AppResizable";

export default {
    name: "video-editor-timeline",
    props: {
        timeSeek: {
            type: Number,
            default: 0
        },
    },
    data: function () {
        let timePoints = [];
        for (let i = 1; i <= 50; i ++) {
            if (i % 5 === 0) {
                timePoints.push({
                    value: i,
                    class: 'time-point point-label',
                    hasLabel: true,
                });
            } else {
                timePoints.push({
                    value: i,
                    class: 'time-point',
                    hasLabel: true,
                });
            }
        }
        return {
            timePoints: timePoints,
            slidePreviewStyle: {
                width: '150px',
                maxWidth: '100%'
            },
            pxPerSec: 40,
            openAddNewSlide: false,
            openSlideTransition: false,
            timelineVars: {
                timeSeek: 0,
            },
            tl: false,
            state: 'initial',
            editHoverIndex: false,
        }
    },
    watch: {
        slideState(nv, ov) {
            if (nv === 'play') {
                this.state = 'play';
                this.tl.play();
            } else if (nv === 'pause') {
                this.state = 'pause';
                this.tl.pause();
            } else {
                this.state = 'pause';
                const slideSeek = this.getSlideSeek(this.current_slide_store);
                this.tl.seek(slideSeek / 1000);
                this.tl.pause();
            }
        },
        templateState(nv, ov) {
            if (nv === 'play') {
                this.state = 'play';
                if (ov === 'initial') {
                    this.tl.seek(0);
                }
                this.tl.play();
            } else if (nv === 'pause') {
                this.state = 'pause';
                this.tl.pause();
            } else {
                this.state = 'pause';
                this.tl.pause();

                const slideSeek = this.getSlideSeek(this.current_slide_store);
                this.tl.seek(slideSeek / 1000);
            }
        },
        templateSeek(nv, ov) {
            this.tl.seek(nv / 1000);
        },
        current_slide(nv, ov) {
            const slideSeek = this.getSlideSeek(this.current_slide_store);
            this.tl.seek(slideSeek / 1000);
        }
    },
    mounted() {
        TweenLite.defaultEase = Linear.easeNone;
        this.tl = TweenLite.to(this.timelineVars, 50, {timeSeek: 50000, paused: true, immediateRender: true});
        this.$store.dispatch('element_template/load_bodymovin');
    },
    computed: {
        template_store() {
            return this.$store.state.template;
        },
        current_slide_store() {
            return this.$store.state.current_slide;
        },
        dragOptions() {
            return {
                animation: 200,
                direction: 'horizontal',
            };
        },
        slideState() {
            return this.$store.state.current_slide.state;
        },
        templateState() {
            return this.$store.state.template.state;
        },
        templateSeek() {
            return this.$store.state.template.timeSeek;
        },
        current_slide() {
            return this.$store.state.current_slide.id;
        }
    },
    methods: {
        setCurrentSlide(slide) {
            if (this.state === 'play') {
                return false;
            }
            if (slide.id !== this.$store.state.current_slide.id) {
                this.$store.dispatch('template/disconnect_with_current');
                this.$store.commit('current_slide/set_with', slide);
                this.$store.dispatch('template/connect_with_current');
            }
            if (this.templateState === 'pause') {
                let slideSeek = this.getSlideSeek(slide);
                this.$store.commit('template/set_timeSeek', slideSeek);
            }
        },
        deleteSlide(slide) {
            this.$store.dispatch('template/delete_slide', slide.id);
            this.editHoverIndex = false;
        },
        duplicateSlide(slide) {
            this.$store.dispatch('template/duplicate_slide', slide);
            this.editHoverIndex = false;
        },
        setSlideTransition(transition) {
            this.openSlideTransition.animation = transition;
            this.openSlideTransition = false;
        },
        onTimeSeekInput(v) {
            this.$store.commit('template/set_state', 'pause');
            this.$store.commit('template/set_timeSeek', v);
        },
        slideDurationFormat(slide) {
            let ms = slide.duration;
            if (slide.animation.space) {
                ms += slide.animation.space;
            }
            return AppHelper.msToHMS(ms);
        },
        slideWidth(slide) {
            let nextEnter = false;
            for (let i = 0; i < this.template_store.slides.length; i ++) {
                let iSlide = this.template_store.slides[i];
                if (iSlide.id === slide.id) {
                    break;
                }
                nextEnter = iSlide.animation.nextEnter;
            }
            let ms = slide.duration;
            if (slide.animation.space) {
                ms += slide.animation.space;
            }
            if (nextEnter) {
                ms += nextEnter.duration;
            }
            return (ms / 1000 * this.pxPerSec - 20);
        },
        getSlideSeek(slide) {
            let slideSeek = 0;
            let nextEnter = false;
            for (let i = 0; i < this.template_store.slides.length; i ++) {
                if (nextEnter) {
                    slideSeek += nextEnter.duration;
                }
                let iSlide = this.template_store.slides[i];
                if (iSlide.id === slide.id) {
                    break;
                }
                slideSeek += iSlide.duration;
                if (iSlide.animation.space) {
                    slideSeek += iSlide.animation.space;
                }
                nextEnter = iSlide.animation.nextEnter;
            }
            return slideSeek;
        },
        resizeSlide($event, slide) {
            let w = $event.width;
            let ms = (w + 20) * 1000 / this.pxPerSec;

            let nextEnter = false;
            for (let i = 0; i < this.template_store.slides.length; i ++) {
                let iSlide = this.template_store.slides[i];
                if (iSlide.id === slide.id) {
                    break;
                }
                nextEnter = iSlide.animation.nextEnter;
            }
            if (slide.animation.space) {
                ms -= slide.animation.space;
            }
            if (nextEnter) {
                ms -= nextEnter.duration;
            }
            this.$store.commit('template/set_slideDuration', {id: slide.id, duration: ms});
        },
        playSlide(slide) {
            if (this.state === 'play') {
                return false;
            }
            if (this.slideState === 'pause') {
                this.$store.dispatch('current_slide/resume_slide');
            } else {
                this.setCurrentSlide(slide);
                this.$store.dispatch('current_slide/play_slide');
            }
        },
        pauseSlide() {
            this.$store.dispatch('current_slide/pause_slide');
        }
    },
    components: {
        SlidePreview,
        AddNewSlide,
        draggable,
        AddSlideTransition,
        AppResizable
    }
}
