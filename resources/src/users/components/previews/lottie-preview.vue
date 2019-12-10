<template>
    <div class="component-lottie-preview" v-if="visible">
        <div class="element--transform-wrap" :style="computedStyles">
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="lottie-element">
                    <div class="element__content">
                        <lottie v-for="lottie in lotties" :options="lottie.defaultOptions" :height="element.height" :width="element.width" v-on:animCreated="handleAnimation($event, lottie.key)" :key="lottie.key"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {styler, scale, translate, rotate} from 'free-transform'
    import Lottie from 'vue-lottie';
    import _ from 'lodash';

    export default {
        name: "lottie-preview",
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
                visible: true,
                anim: null,
                lotties: [
                    {
                        key: 'lottie_preview_push_' + new Date().getTime(),
                        defaultOptions: {
                            animationData: _.cloneDeep(this.element.content.json),
                            autoplay: false,
                        },
                    },
                ],
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
            handleAnimation: function (anim, key) {
                this.anim = anim;
                let dur = this.anim.getDuration();
                this.anim.goToAndStop(dur * 1000 - 500);
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
            onLottieChange() {
                this.lotties.push(
                    {
                        key: 'lottie_preview_push_' + new Date().getTime(),
                        defaultOptions: {
                            animationData: _.cloneDeep(this.element.content.json),
                            autoplay: false,
                        },
                    }
                );
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
            changeNumber() {
                return this.element.lottieChangeNumber;
            }
        },
        watch: {
            changeNumber(nv, ov) {
                this.onLottieChange();
            },
        },
        components: {
            Lottie
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .component-lottie-preview{
        .element--transform-wrap{
            overflow: hidden;
        }
    }
</style>
