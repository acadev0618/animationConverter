<template>
    <div class="component-text-preview" v-if="visible">
        <div class="element--transform-wrap" :style="computedStyles">
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="text-element" ref="contentInner">
                    <div class="element__content">
                        <div class="content--text" :style="element.content.style" v-html="element.content.html"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {styler, scale, translate, rotate} from 'free-transform'
    export default {
        name: "text-preview",
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
        .text-element{
            width: 100%;
            height: 100%;
            .element__content{
                width: 100%;
                height: 100%;
                .content--text{
                    width: 100%;
                    height: 100%;
                    background-size: auto;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            }
        }
    }
</style>
