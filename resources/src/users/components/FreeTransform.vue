<template>
    <div :class="{[`${classPrefix}-transform`]: true, [`${classPrefix}-transform--active`]:selected}"
         :style="styles"
         @click="click"
         @dblclick="dblClick"
         @mousedown="mousedown">
        <div :class="`${classPrefix}-transform__content`" :style="computedStyles.elementSizePos">
            <div class="animation--wrap" :style="computedAnimation">
                <div class="rotate--wrap" :style="computedStyles.rotate">
                    <slot></slot>
                </div>
            </div>
        </div>
        <div v-if="selected && state === 'edit' && canTransform"
             :class="`${classPrefix}-transform__controls`"
             :style="computedStyles.controls">
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="`${classPrefix}-transform__rotator`" @mousedown="handleRotation"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tl`]"
                 @mousedown="handleRatioScale('tl',$event)"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--ml`]"
                 @mousedown="handleScale('ml',$event)"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tr`]"
                 @mousedown="handleRatioScale('tr',$event)"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--tm`]"
                 @mousedown="handleScale('tm',$event)"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--bl`]"
                 @mousedown="handleRatioScale('bl',$event)"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--bm`]"
                 @mousedown="handleScale('bm',$event)"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--br`]"
                 @mousedown="handleRatioScale('br',$event)"></div>
            <div :style="{transform: 'scale(' + 100 / parentZoom + ')'}" :class="[`${classPrefix}-transform__scale-point ${classPrefix}-transform__scale-point--mr`]"
                 @mousedown="handleScale('mr',$event)"></div>
        </div>
    </div>
</template>

<script>
    import {styler, scale, translate, rotate} from 'free-transform'

    export default {
        name: 'Transform',
        props: {
            classPrefix: {
                type: String,
                default: "tr",
            },
            width: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            },
            x: {
                type: Number,
                required: true
            },
            y: {
                type: Number,
                required: true
            },
            scaleX: {
                type: Number,
                required: true
            },
            scaleY: {
                type: Number,
                required: true
            },
            scaleLimit: {
                type: Number,
                default: 0.1
            },
            angle: {
                type: Number,
                required: true
            },
            disableScale: {
                type: Boolean,
                default: false,
            },
            offsetX: {
                type: Number,
                required: true,
            },
            offsetY: {
                type: Number,
                required: true
            },
            selected: {
                type: Boolean,
                default: true
            },
            styles: {
                type: Object,
                default: () => ({})
            },
            selectOn: {
                validator: function (value) {
                    return ['dblclick', 'mousedown', 'click', 'none'].indexOf(value) !== -1
                },
                default: 'mousedown'
            },
            aspectRatio: {
                type: Boolean,
                default: true
            },
            scaleFromCenter: {
                type: Boolean,
                default: true
            },
            animationStyle: {
                type: Object,
                default: () => ({})
            },
            state: {
                type: String,
                default: 'edit'
            },
            canTransform: {
                type: Boolean,
                default: true,
            },
            parentZoom: {
                type: Number,
                default: 100,
            }
        },
        data: function () {
            return {
                changed: false,
            }
        },
        computed: {
            computedStyles() {
                const {element, controls} = styler({
                    x: this.x,
                    y: this.y,
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    width: this.width,
                    height: this.height,
                    angle: this.angle,
                    disableScale: this.disableScale
                });
                return {
                    element: {
                        ...element,
                        width: element.width ? `${element.width}px` : null,
                        height: element.height ? `${element.height}px` : null,
                    },
                    elementSizePos: this.elementSizePosition(),
                    rotate: {
                        transform: 'rotate('+ this.angle +'deg)'
                    },
                    controls: {
                        ...controls,
                        width: `${controls.width}px`,
                        height: `${controls.height}px`
                    }
                }
            },
            computedAnimation() {
                let computedAnimationStyle = {...this.animationStyle};
                if (this.state === 'pause') {
                    computedAnimationStyle.animationPlayState = 'paused';
                } else if (this.state === 'play') {
                    computedAnimationStyle.animationPlayState = 'running';
                }
                return computedAnimationStyle;
            },
        },
        methods: {
            elementSizePosition() {
                const {element, controls} = styler({
                    x: this.x,
                    y: this.y,
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    width: this.width,
                    height: this.height,
                    angle: 0,
                    disableScale: this.disableScale
                });
                return {
                    ...element,
                    width: element.width ? `${element.width}px` : null,
                    height: element.height ? `${element.height}px` : null,
                }
            },
            handleScale(scaleType, event) {

                event.stopPropagation();
                event.preventDefault();

                const x = this.x;
                const y = this.y;
                const scaleX = this.scaleX;
                const scaleY = this.scaleY;
                const drag = scale(scaleType, {
                    startX: event.pageX,
                    startY: event.pageY,
                    x: this.x,
                    y: this.y,
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    width: this.width,
                    height: this.height,
                    angle: this.angle,
                    scaleLimit: this.scaleLimit,
                    scaleFromCenter: this.scaleFromCenter && event.altKey,
                    enableScaleFromCenter: this.scaleFromCenter,
                    aspectRatio: this.aspectRatio && event.shiftKey,
                    enableAspectRatio: this.aspectRatio
                }, (payload) => {
                    this.changed = true;
                    const offsetX = payload.x - x;
                    const offsetY = payload.y - y;
                    const offsetScaleX = payload.scaleX - scaleX;
                    const offsetScaleY = payload.scaleY - scaleY;
                    payload.x = x + offsetX * 100 / this.parentZoom;
                    payload.y = y + offsetY * 100 / this.parentZoom;
                    payload.scaleX = scaleX + offsetScaleX * 100 / this.parentZoom;
                    payload.scaleY = scaleY + offsetScaleY * 100 / this.parentZoom;
                    this.$emit("update", payload)
                });

                this.onDrag(drag);
            },
            handleRatioScale(scaleType, event) {

                event.stopPropagation();
                event.preventDefault();
                let scaleX = this.scaleX;
                let scaleY = this.scaleY;
                let left = this.x + this.width - this.width * this.scaleX;
                let top = this.y + this.height - this.height * this.scaleY;
                let x = this.x;
                let y = this.y;
                const drag = scale(scaleType, {
                    startX: event.pageX,
                    startY: event.pageY,
                    x: this.x,
                    y: this.y,
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    width: this.width,
                    height: this.height,
                    angle: this.angle,
                    scaleLimit: this.scaleLimit,
                    scaleFromCenter: this.scaleFromCenter && event.altKey,
                    enableScaleFromCenter: this.scaleFromCenter,
                    aspectRatio: this.aspectRatio && event.shiftKey,
                    enableAspectRatio: this.aspectRatio
                }, (payload) => {
                    if (payload.scaleX / scaleX > payload.scaleY / scaleY) {
                        payload.scaleY = scaleY * payload.scaleX / scaleX;
                        switch (scaleType) {
                            case 'br':
                            case 'bl':
                                payload.y = top + this.height * payload.scaleY - this.height;
                                break;
                            default:
                                break;
                        }
                    } else if (payload.scaleX / scaleX < payload.scaleY / scaleY) {
                        payload.scaleX = scaleX * payload.scaleY / scaleY;
                        switch (scaleType) {
                            case 'tr':
                            case 'br':
                                payload.x = left + this.width * payload.scaleX - this.width;
                                break;
                            default:
                                break;
                        }
                    }
                    this.changed = true;
                    const offsetX = payload.x - x;
                    const offsetY = payload.y - y;
                    const offsetScaleX = payload.scaleX - scaleX;
                    const offsetScaleY = payload.scaleY - scaleY;
                    payload.x = x + offsetX * 100 / this.parentZoom;
                    payload.y = y + offsetY * 100 / this.parentZoom;
                    payload.scaleX = scaleX + offsetScaleX * 100 / this.parentZoom;
                    payload.scaleY = scaleY + offsetScaleY * 100 / this.parentZoom;
                    this.$emit("update", payload)
                });

                this.onDrag(drag);
            },
            handleTranslation(event) {
                event.stopPropagation();
                const x = this.x;
                const y = this.y;
                const drag = translate({
                    x: this.x,
                    y: this.y,
                    startX: event.pageX,
                    startY: event.pageY
                }, (payload) => {
                    const offsetX = payload.x - x;
                    const offsetY = payload.y - y;
                    payload.x = x + offsetX * 100 / this.parentZoom;
                    payload.y = y + offsetY * 100 / this.parentZoom;
                    this.changed = true;
                    this.$emit("update", payload)
                });

                this.onDrag(drag);
            },
            handleRotation(event) {
                event.stopPropagation();

                const drag = rotate({
                    startX: event.pageX,
                    startY: event.pageY,
                    x: this.x,
                    y: this.y,
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    width: this.width,
                    height: this.height,
                    angle: this.angle,
                    offsetX: this.offsetX,
                    offsetY: this.offsetY
                }, (payload) => {
                    this.changed = true;
                    this.$emit("update", payload)
                });

                this.onDrag(drag)
            },

            onDrag(drag) {
                const up = () => {
                    if (this.changed) {
                        this.$emit('onChangeStop');
                        this.changed = false;
                    }
                    document.removeEventListener('mousemove', drag);
                    document.removeEventListener('mouseup', up);
                };

                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', up);
            },

            mousedown(event) {
                if (this.state !== 'edit') {
                    return false;
                }
                this.$emit("mousedown", event);
                if ( (this.selectOn === 'mousedown' || this.selected === true)) {
                    this.$emit('onSelect');
                    if (this.canTransform) {
                        this.handleTranslation(event)
                    }
                }
            },

            click(event) {
                this.$emit('click', event)
                if (this.selectOn === 'click') {
                    this.$emit('onSelect')
                }
            },

            dblClick(event) {
                this.$emit('dblclick', event)
                if (this.selectOn === 'dblclick') {
                    this.$emit('onSelect')
                }
            },
        },
    }
</script>
<style scoped lang="scss">

    * {
        box-sizing: border-box;
    }

    .tr-transform--active {
    }

    .tr-transform__content {
        user-select: none;
    }
    .tr-transform__content .element{
        padding: 0px;
    }

    .tr-transform__rotator {
        top: -45px;
        left: calc(50% - 7px);
    }

    .tr-transform__rotator,
    .tr-transform__scale-point {
        background: #fff;
        width: 10px;
        height: 10px;
        position: absolute;
        border: 1px solid rgba(0, 0, 0, 1);
        cursor: pointer;
    }
    .tr-transform__rotator{
        border-radius: 50%;
        width: 14px;
        height: 14px;
    }
    .tr-transform__rotator:hover,
    .tr-transform__scale-point:hover {
        background: #F1F5F8;
    }

    .tr-transform__rotator:active,
    .tr-transform__scale-point:active {
        background: #DAE1E7;
    }

    .tr-transform__scale-point {

    }

    .tr-transform__scale-point--tl {
        top: -5px;
        left: -5px;
    }

    .tr-transform__scale-point--ml {
        top: calc(50% - 5px);
        left: -5px;
    }

    .tr-transform__scale-point--tr {
        left: calc(100% - 5px);
        top: -5px;
    }

    .tr-transform__scale-point--tm {
        left: calc(50% - 5px);
        top: -5px;
    }

    .tr-transform__scale-point--mr {
        left: calc(100% - 5px);
        top: calc(50% - 5px);
    }

    .tr-transform__scale-point--bl {
        left: -5px;
        top: calc(100% - 5px);
    }

    .tr-transform__scale-point--bm {
        left: calc(50% - 5px);
        top: calc(100% - 5px);
    }

    .tr-transform__scale-point--br {
        left: calc(100% - 5px);
        top: calc(100% - 5px);
    }
    /* start customize */
    .tr-transform__content{
        cursor: move;
        .animation--wrap{
            width: 100%;
            height: 100%;
            animation-fill-mode: forwards;
            .rotate--wrap{
                width: 100%;
                height: 100%;
            }
        }
    }
    .tr-transform__controls{
        z-index: 10;
        pointer-events: none;
        .tr-transform__scale-point{
            pointer-events: auto;
            z-index: 10;
        }
        .tr-transform__rotator{
            pointer-events: auto;
            &:before{
                content: '';
                height: 35px;
                left: calc(50%);
                position: absolute;
                width: 0;
                bottom: -35px;
                background-color: rgba(255, 255, 255, 0.5);
                border-left: 1px dashed rgba(0, 0, 0, 0.8);
            }
        }
        &:before{
            content: '';
            display: block;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            pointer-events: none;
            box-sizing: border-box;
            border: 1px solid white;
            z-index: 5;
        }
        &:after{
            content: '';
            display: block;
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            pointer-events: none;
            box-sizing: border-box;
            border: 1px dashed black;
            z-index: 5;
        }
    }
</style>
