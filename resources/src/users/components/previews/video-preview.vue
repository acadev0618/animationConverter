<template>
    <div class="component-video-preview" v-if="visible">
        <div class="element--content" :style="element.styles">
            <img :src="element.content.thumb_url" />
        </div>
    </div>
</template>

<script>
    import {styler, scale, translate, rotate} from 'free-transform'
    export default {
        name: "Image-preview",
        components: {
        },
        props: {
            element: {
                type: Object,
            },
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
    .component-video-preview{
        .element--content{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
