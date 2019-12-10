<template>
    <div class="component-image-preview" v-if="visible">
        <div class="element--transform-wrap" :style="computedStyles">
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="image-element">
                    <div class="element__content">
                        <div class="content--image" :fill="element.fill_mode" :style="{backgroundImage: 'url('+ element.content.src +')'}" v-if="element.fill_mode !== 'crop'"></div>
                        <div class="preview-crop" v-if="element.fill_mode === 'crop'">
                            <crop-image-preview :src="element.content.src"
                                                :image-size="{width: element.content.width, height: element.content.height}"
                                                :crop-data="element.crop_data"
                                                :width="element.width * element.scaleX"
                                                :height="element.height * element.scaleY"
                            ></crop-image-preview>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {styler, scale, translate, rotate} from 'free-transform'
    import CropImagePreview from './crop-image-preview'
    export default {
        name: "Image-preview",
        components: {
            CropImagePreview
        },
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
            }
        },
        data: function () {
            return {
                visible: true
            }
        },
        methods: {
            getElementStyles(element) {
                const styles = element.styles ? element.styles : {};
                return {
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    ...styles
                }
            },
        },
        computed: {
            computedStyles() {
                const {element, controls} = styler({
                    x: this.element.x,
                    y: this.element.y,
                    scaleX: this.element.scaleX,
                    scaleY: this.element.scaleY,
                    width: this.element.width,
                    height: this.element.height,
                    angle: this.element.angle,
                    disableScale: this.element.disableScale
                });
                return {
                    ...element,
                    width: element.width ? `${element.width}px` : null,
                    height: element.height ? `${element.height}px` : null,
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .element--transform-wrap{
        position: absolute;
        .image-element{
            width: 100%;
            height: 100%;
            .element__content{
                width: 100%;
                height: 100%;
                .content--image{
                    width: 100%;
                    height: 100%;
                    &[fill=scale_crop] {
                        background-size: auto;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    &[fill=no_scale] {
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                    &[fill=exact_fit] {
                        background-size: 100% 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                    }
                }
            }
        }
    }
</style>
