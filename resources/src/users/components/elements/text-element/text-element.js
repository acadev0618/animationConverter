import FreeTransform from "./../../FreeTransform";
import { VueEditor, Quill } from "vue2-editor";
import Toolbar from './../../toolbar/toolbar';
import AnimationMaker from './../../animation-maker';
import TimerService from "../../../services/timer-service";

let Parchment = Quill.import('parchment');
let lineHeightConfig = {
    scope: Parchment.Scope.Block,
};
let fontSizeConfig = {
    scope: Parchment.Scope.Block,
};
let LineHeightStyle = new Parchment.Attributor.Style('lineHeight', 'line-height', lineHeightConfig);
let FontSizeStyle = new Parchment.Attributor.Style('fontSize', 'font-size', fontSizeConfig);
let LetterSpacingStyle = new Parchment.Attributor.Style('letterSpacing', 'letter-spacing', {scope: Parchment.Scope.INLINE});
let TextAlignStyle = new Parchment.Attributor.Style('textAlign', 'text-align', {scope: Parchment.Scope.Block});
let TextTransformStyle = new Parchment.Attributor.Style('textTransform', 'text-transform', {scope: Parchment.Scope.INLINE});
let FontFamilyStyle = new Parchment.Attributor.Style('fontFamily', 'font-family', {scope: Parchment.Scope.INLINE});
let ColorStyle = new Parchment.Attributor.Style('color', 'color', {scope: Parchment.Scope.INLINE});
let OpacityStyle = new Parchment.Attributor.Style('opacity', 'opacity', {scope: Parchment.Scope.Block});
let FilterStyle = new Parchment.Attributor.Style('filter', 'filter', {scope: Parchment.Scope.Block});
let TextShadowStyle = new Parchment.Attributor.Style('textShadow', 'text-shadow', {scope: Parchment.Scope.Block});
Parchment.register(LineHeightStyle);
Parchment.register(FontSizeStyle);
Parchment.register(LetterSpacingStyle);
Parchment.register(TextAlignStyle);
Parchment.register(TextTransformStyle);
Parchment.register(FontFamilyStyle);
Parchment.register(ColorStyle);
Parchment.register(OpacityStyle);
Parchment.register(FilterStyle);
Parchment.register(TextShadowStyle);

export default {
    name: "text-element",
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
    data: function() {
        return {
            changed: false,
            isEditing: false,
            editor: null,
            editorSelection: null,
            animationStyle: {},
            animation: false,
            state: this.$store.state.current_slide.state,
            visible: true,
            contentHtml: this.element.content.html,
            timer: new TimerService(this.element.duration, this.element.delay)
        }
    },
    computed: {
        slide_store() {
            return this.$store.state.current_slide;
        },
        selected() {
            return this.element.selected;
        },
        slideState() {
            return this.$store.state.current_slide.state;
        },
        contentHTML() {
            return this.element.content.html;
        }
    },
    watch: {
        selected (newValue, oldValue) {
            if (!newValue) {
                this.isEditing = false;
                this.editor.disable();
                if (this.changed) {
                    this.changed = false;
                    this.onChangeStop();
                }
            }
        },
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
        contentHTML(nv, ov) {
            if (nv !== this.editor.container.firstChild.innerHTML) {
                this.renderEditor();
            }
        }
    },
    components: {
        FreeTransform,
        Toolbar,
        AnimationMaker
    },
    mounted: function() {
        this.editor = new Quill(this.$refs.editor);
        this.editor.disable();
        this.editor.on('selection-change', (range, oldRange) => {
            if (!range) {
            } else {
                this.editorSelection = {...range};
            }
        });
        this.editor.on('text-change', () => {
            const contents = this.editor.getContents();
            this.$store.commit('current_slide/update_content', {id: this.element.id, sets: {html: this.editor.container.firstChild.innerHTML, contents: contents}});
            this.changed = true;
            this.changeHeight();
        });
        const contents = this.editor.getContents();
        this.$store.commit('current_slide/update_content', {id: this.element.id, sets: {contents: contents}});
        this.changeHeight();
        if (this.state === 'play') {
            this.play();
        }
    },
    methods: {
        setSelected() {
            if (this.element.selected) {
                this.isEditing = true;
                this.editor.enable();
            }
            this.$store.commit('current_slide/set_selected', this.element.id);
        },
        update(payload) {
            if (payload.scaleY && payload.scaleX) {
                let dom = this.$refs['contentInner'];
                let scaleY = dom.clientHeight / this.element.height;
                let y = this.element.y + (scaleY - this.element.scaleY) * this.element.height;
                payload.scaleY = scaleY;
                payload.y = y;
            }
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
        changeHeight() {
            let dom = this.$refs['contentInner'];
            let scaleY = dom.clientHeight / this.element.height;
            let y = this.element.y + (scaleY - this.element.scaleY) * this.element.height;
            this.$store.commit('current_slide/update', {id: this.element.id, sets: {scaleY: scaleY, y: y}});
        },
        editorMouseDown(e) {
            if (this.isEditing) {
                e.stopPropagation();
            }
        },
        editorFormat(payload) {
            let keys = {
                fontWeight: 'bold',
                fontStyle: 'italic',
                textDecoration: 'underline',
            };
            let valueKeys = {
                bold: true,
                light: false,
                normal: false,
                italic: true,
                underline: true,
                none: false,
            };
            let formats = {};
            for (let k in payload) {
                let key = k;
                let val = payload[k];
                if (k in keys) {
                    key = keys[k];
                }
                if (val in valueKeys) {
                    val = valueKeys[val];
                }
                formats[key] = val;
            }
            return formats;
        },
        styleChange(payload) {
            if (this.editorSelection) {
                this.editor.setSelection(this.editorSelection.index, this.editorSelection.length);
            }
            let formats = this.editorFormat(payload);
            for (let k in formats) {
                this.editor.format(k, formats[k]);
            }
            this.changeHeight();
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
        play() {
            this.visible = false;
            this.contentHtml = this.element.content.html;
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
            setTimeout(() => {
                this.editor = new Quill(this.$refs.editor);
                this.editor.disable();
                this.editor.on('selection-change', (range, oldRange) => {
                    if (!range) {
                    } else {
                        this.editorSelection = {...range};
                    }
                });
                this.editor.on('text-change', () => {
                    const contents = this.editor.getContents();
                    this.$store.commit('current_slide/update_content', {id: this.element.id, sets: {html: this.editor.container.firstChild.innerHTML, contents: contents}});
                    this.changed = true;
                    this.changeHeight();
                });
                this.changeHeight();
            }, 100);
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
        renderEditor() {
            let contents = this.element.content.contents;
            if (contents) {
                this.editor.setContents(contents);
                this.changeHeight();
            }
        }
    }
}
