<template>
    <div class="input-group flat-color-picker" ref="colorpicker">
        <chrome-picker :value="colors" @input="updateFromPicker"/>
    </div>
</template>

<script>
    import {Chrome} from 'vue-color'
    
    export default {
        name: "flat-color-picker",
        components: {
            'chrome-picker': Chrome,
        },
        props: ['color'],
        data() {
            return {
                colors: {
                    hex: '#000000',
                },
                colorValue: ''
            }
        },
        mounted() {
            this.setColor(this.color || '#000000');
        },
        methods: {
            setColor(color) {
                this.updateColors(color);
                this.colorValue = color;
            },
            updateColors(color) {
                if (color.slice(0, 1) === '#') {
                    this.colors = {
                        hex: color
                    };
                } else if (color.slice(0, 4) === 'rgba') {
                    let rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(','),
                        hex = '#' + ((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1);
                    this.colors = {
                        hex: hex,
                        a: rgba[3],
                    }
                }
            },
            updateFromPicker(color) {
                this.colors = color;
                if (color.rgba.a === 1) {
                    this.colorValue = color.hex;
                }
                else {
                    this.colorValue = 'rgba(' + color.rgba.r + ', ' + color.rgba.g + ', ' + color.rgba.b + ', ' + color.rgba.a + ')';
                }
            }
        },
        watch: {
            colorValue(val) {
                if (val) {
                    this.updateColors(val);
                    this.$emit('input', val);
                }
            }
        }
    }
</script>

<style lang="scss">
    .flat-color-picker {
        .vc-chrome {
            margin-top: 3px;
            margin-left: 12px;
            z-index: 9;
            background: transparent !important;
            box-shadow: 0 0 2px rgba(0,0,0,.3), 0 1px 0 rgba(0,0,0,.3) !important;
            .vc-chrome-body {
                background: transparent !important;
            }
        }
        
        .color-picker-container {
            padding: 0;
            margin: 0;
        }
    }
</style>
