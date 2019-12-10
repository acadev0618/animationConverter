<template>
    <div class="component-shape-preview" v-if="visible">
        <div class="element--transform-wrap" :style="computedStyles">
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="shape-element">
                    <div class="element__content">
                        <img class="content--shape" draggable="false"  :src="element.content.src" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {styler, scale, translate, rotate} from 'free-transform'
    export default {
        name: "shape-preview",
        components: {
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
        .shape-element{
            width: 100%;
            height: 100%;
            .element__content{
                width: 100%;
                height: 100%;
                .content--shape{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
