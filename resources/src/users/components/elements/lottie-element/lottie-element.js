import FreeTransform from "./../../FreeTransform";
import Toolbar from './../../toolbar/toolbar';
import AnimationMaker from './../../animation-maker';
import Lottie from 'vue-lottie';
import _ from 'lodash';

export default {
    name: "lottie-element",
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
        editorControlValue() {
            return this.$store.state.editor.controlValue;
        },
        changeNumber() {
            return this.element.lottieChangeNumber;
        }
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
        editorControlValue(nv, ov) {
            if (nv && nv.backgroundImage && this.firstAsset && !this.$store.state.editor.controlProperty) {
                let matches = nv.backgroundImage.match(/url\((.+)\)/);
                if (matches && matches.length > 1) {
                    this.firstAsset.p = matches[1];
                    this.onLottieChange();
                } else {
                }
            }
        },
        changeNumber(nv, ov) {
            this.changeLottie();
        },
    },
    data: function() {
        return {
            animation: false,
            animationStyle: {},
            state: this.$store.state.current_slide.state,
            visible: true,
            lotties: [
                {
                    key: 'lottie_push_' + new Date().getTime(),
                    defaultOptions: {
                        animationData: _.cloneDeep(this.element.content.json),
                        autoplay: false,
                        loop: false,
                        renderer: 'svg'
                    },
                },
            ],
            anim: null,
            firstAsset: (this.element.content.json.assets && this.element.content.json.assets.length) ? this.element.content.json.assets[0] : false,
            canTransform: this.$store.state.template.width !== this.element.width
        }
    },
    components: {
        Lottie,
        FreeTransform,
        Toolbar,
        AnimationMaker
    },
    methods: {
        handleAnimation: function (anim, key) {
            this.anim = anim;
            if (this.state === 'play') {
                this.play();
            } else {
                let dur = this.anim.getDuration();
                this.anim.goToAndStop(dur * 1000 - 500);
            }
            this.anim.addEventListener('DOMLoaded', () => {
                let index = 0;
                this.lotties.forEach((lottie, i) => {
                    if (lottie.key === key) {
                        index = i;
                    }
                });
                if (index) {
                    this.lotties.splice(0, index);
                }
            });
        },
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
        },
        animationMade(keyframe) {
        },
        styleChange(payload) {
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
            this.state = 'edit';
            let dur = this.anim.getDuration();
            this.anim.goToAndStop(dur * 1000 - 500);
        },
        onLottieChange() {
            this.$store.commit('current_slide/element_change_plus', this.element.id);
            this.$store.commit('current_slide/lottie_change_plus', this.element.id);
        },
        clickLottie(e) {
        },
        changeLottie() {
            this.lotties.push(
                {
                    key: 'lottie_push_' + new Date().getTime(),
                    defaultOptions: {
                        animationData: _.cloneDeep(this.element.content.json),
                        autoplay: false,
                        loop: false,
                        renderer: 'svg'
                    },
                }
            );
        },
        onChangeStop() {
            this.$store.commit('template/insert_history');
        },
    },
    mounted() {
        if (this.element.type === 'lottie' && this.element.width === this.$store.state.template.width) {
            if (this.element.content.json.assets.length === 1) {
                this.$store.commit('editor/set_sidebar', {
                    controlCategory: 'background',
                    controlTab: 'image'
                });
            }
        }
    },
    beforeDestroy() {
        if (this.firstAsset) {
            this.$store.commit('editor/set_sidebar', {
                controlCategory: false,
                controlTab: false
            });
        }
    }
}
