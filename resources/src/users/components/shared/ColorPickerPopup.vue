<template>
    <Chrome v-if="colorPickerOpened" class="popup-chrome" ref="colorPicker" v-model="pickerColor" v-on:input="colorChange" v-on:change="$emit('onChangeStop')"></Chrome>
</template>

<script>
    import { Chrome } from 'vue-color'
    export default {
        props: {
            value: {
                type: String,
                default: '#353535',
            }
        },
        name: "ColorPickerPopup",
        components: {
            Chrome,
        },
        data: function() {
            return {
                colorPickerOpened: false,
                pickerColor: this.value,
            }
        },
        methods: {
            colorChange() {
                this.$emit('input', this.pickerColor.hex8);
            },
            open: function () {
                this.colorPickerOpened = true;
                setTimeout(() => {
                    document.addEventListener('click', this.documentClick);
                });
            },
            hide: function () {
                document.removeEventListener('click', this.documentClick);
                this.colorPickerOpened = false;
            },
            documentClick(e) {
                e.preventDefault();
                e.stopPropagation();
                var el = this.$refs.colorPicker ? this.$refs.colorPicker.$el : false,
                    target = e.target;
                if(!el || (el !== target && !el.contains(target))) {
                    this.hide()
                }
                return false;
            },
        }
    }
</script>

<style lang="scss">
    .popup-chrome {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 100;
    }
</style>
<style scoped>
</style>
