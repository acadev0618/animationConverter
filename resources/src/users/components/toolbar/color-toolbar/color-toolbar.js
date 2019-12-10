import { Chrome } from 'vue-color'
import PrettyCheck from 'pretty-checkbox-vue/check';
import ColorPickerPopup from './../../shared/ColorPickerPopup';

export default {
    name: "color-toolbar",
    data: function () {

        let blur = 0;
        if (this.element.styles.filter) {
            let matches = this.element.styles.filter.match(/blur\((.+)px\)/);
            if (matches && matches.length > 1) {
                blur = matches[1];
            }
        }
        let elementShadow = false;
        if (this.element.style_data && this.element.style_data.shadow) {
            elementShadow = this.element.style_data.shadow;
        }
        return {
            pickerColor: '#d8c5c5',
            color: '#d8c5c5',
            colorPickerOpened: false,
            opacity: 'opacity' in this.element.styles ? this.element.styles.opacity * 100 : 100,
            blur: blur,
            isDropShadow: elementShadow ? 1 : 0,
            isDropShadowEdit: false,
            shadowColorPickerOpened: false,
            shadowPickerColor: '#d8c5c5',
            shadowColor: elementShadow ? elementShadow.color : '#000000',
            verticalShadow: elementShadow ? elementShadow.xOffset : 2,
            horizontalShadow: elementShadow ? elementShadow.yOffset : 2,
            shadowBlur: elementShadow ? elementShadow.blur : 3,
        }
    },
    props: {
        element: {
            type: Object,
        }
    },
    watch: {
        isDropShadow: function (nV, oV) {
            this.onShadowChange();
        }
    },
    methods: {
        showColorSolidPicker: function () {
            this.colorPickerOpened = true;
            setTimeout(() => {
                document.addEventListener('click', this.documentClick);
            });
        },
        hideColorSolidPicker: function () {
            document.removeEventListener('click', this.documentClick);
            this.colorPickerOpened = false;
        },
        documentClick(e) {
            e.preventDefault();
            var el = this.$refs.colorPicker ? this.$refs.colorPicker.$el : false,
                target = e.target;
            if(!el || (el !== target && !el.contains(target))) {
                this.hideColorSolidPicker()
            }
            return false;
        },
        onShadowChange() {
            let shadow = 'none';
            if (this.isDropShadow) {
                shadow = this.shadowColor + ' ' + this.horizontalShadow + 'px '+ this.verticalShadow +'px '+ this.shadowBlur +'px';
                this.$store.commit('current_slide/element_merge', {
                    id: this.element.id,
                    sets: {
                        style_data: {
                            shadow: {
                                color: this.shadowColor,
                                xOffset: this.horizontalShadow,
                                yOffset: this.verticalShadow,
                                blur: this.shadowBlur
                            }
                        }
                    }
                });
            } else {
                this.$store.commit('current_slide/element_merge', {
                    id: this.element.id,
                    sets: {
                        style_data: {
                            shadow: false
                        }
                    }
                });
            }
            if (this.element.type === 'text') {
                this.styleChange({textShadow: shadow});
            } else if (['shape', 'lottie'].indexOf(this.element.type) > -1) {
                if (this.isDropShadow) {
                    this.styleChange({filter: 'drop-shadow(' + shadow + ')'});
                } else {
                    this.styleChange({filter: 'none'});
                }
            } else {
                this.styleChange({boxShadow: shadow});
            }
        },
        styleChange(payload) {
            this.$store.commit('current_slide/update_style', {id: this.element.id, sets: payload});
            this.$emit('styleChange', payload);
        }
    },
    components: {
        Chrome,
        PrettyCheck,
        ColorPickerPopup
    }
}
