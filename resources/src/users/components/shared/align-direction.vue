<template>
    <div class="component-align-direction">
        <div class="scale__align">
            <div class="align__line line--top-left"></div>
            <div class="align__line line--top-right"></div>
            <div class="align__line line--bottom-left"></div>
            <div class="align__line line--bottom-right"></div>
            <div class="align__line line--left-top"></div>
            <div class="align__line line--left-bottom"></div>
            <div class="align__line line--right-top"></div>
            <div class="align__line line--right-bottom"></div>
            <div class="align__dir align--top-left" :class="{active: value === 'top_left'}" @click="changeValue('top_left')"></div>
            <div class="align__dir align--top-center" :class="{active: value === 'top_center'}" @click="changeValue('top_center')"></div>
            <div class="align__dir align--top-right" :class="{active: value === 'top_right'}" @click="changeValue('top_right')"></div>
            <div class="align__dir align--center-left" :class="{active: value === 'center_left'}" @click="changeValue('center_left')"></div>
            <div class="align__dir align--center-center" :class="{active: value === 'center_center'}" @click="changeValue('center_center')"></div>
            <div class="align__dir align--center-right" :class="{active: value === 'center_right'}" @click="changeValue('center_right')"></div>
            <div class="align__dir align--bottom-left" :class="{active: value === 'bottom_left'}" @click="changeValue('bottom_left')"></div>
            <div class="align__dir align--bottom-center" :class="{active: value === 'bottom_center'}" @click="changeValue('bottom_center')"></div>
            <div class="align__dir align--bottom-right" :class="{active: value === 'bottom_right'}" @click="changeValue('bottom_right')"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "align-direction",
        props: {
            value: {
                type: String,
                default: 'center_center'
            }
        },
        methods: {
            changeValue(v) {
                this.$emit('input', v);
            }
        }
    }
</script>

<style scoped lang="scss">
    .component-align-direction{
        .scale__align {
            position: relative;
            width: 36px;
            height: 36px;
            --point-size: 9px;
            .align--top-left {
                top: 0;
                left: 0;
            }
            .align--top-center {
                top: 0;
                left: calc(100% / 2 - var(--point-size) / 2);
            }
            .align--top-right {
                top: 0;
                right: 0px;
            }
            .align--center-left {
                top: calc(100% / 2 - var(--point-size) / 2);
                left: 0px;
            }
            .align--center-center {
                top: calc(100% / 2 - var(--point-size) / 2);
                left: calc(100% / 2 - var(--point-size) / 2);
            }
            .align--center-right {
                top: calc(100% / 2 - var(--point-size) / 2);
                right: 0px;
            }
            .align--bottom-left {
                bottom: 0;
                left: 0px;
            }
            .align--bottom-center {
                bottom: 0;
                left: calc(100% / 2 - var(--point-size) / 2);
            }
            .align--bottom-right {
                bottom: 0;
                right: 0px;
            }
            .line--top-left {
                width: calc((100% - var(--point-size) * 3) / 2);
                height: 2px;
                top: calc((var(--point-size) - 2px) / 2);
                left: var(--point-size);
            }
            .line--top-right {
                width: calc((100% - var(--point-size) * 3) / 2);
                height: 2px;
                top: calc((var(--point-size) - 2px) / 2);
                right: var(--point-size);
            }
            .line--bottom-left {
                width: calc((100% - var(--point-size) * 3) / 2);
                height: 2px;
                bottom: calc((var(--point-size) - 2px) / 2);
                left: var(--point-size);
            }
            .line--bottom-right {
                width: calc((100% - var(--point-size) * 3) / 2);
                height: 2px;
                bottom: calc((var(--point-size) - 2px) / 2);
                right: var(--point-size);
            }
            .line--left-top {
                top: var(--point-size);
                left: calc((var(--point-size) - 2px) / 2);
                width: 2px;
                height: calc((100% - var(--point-size) * 3) / 2);
            }
            .line--left-bottom {
                bottom: var(--point-size);
                left: calc((var(--point-size) - 2px) / 2);
                width: 2px;
                height: calc((100% - var(--point-size) * 3) / 2);
            }
            .line--right-top {
                top: var(--point-size);
                right: calc((var(--point-size) - 2px) / 2);
                width: 2px;
                height: calc((100% - var(--point-size) * 3) / 2);
            }
            .line--right-bottom {
                bottom: var(--point-size);
                right: calc((var(--point-size) - 2px) / 2);
                width: 2px;
                height: calc((100% - var(--point-size) * 3) / 2);
            }
            > .align__line {
                position: absolute;
                background-color: rgba(81, 88, 115, 0.6);
            }
            > .align__dir {
                height: var(--point-size);
                width: var(--point-size);
                position: absolute;
                border: 2px solid rgba(81, 88, 115, 0.6);
                border-radius: 1px;
                cursor: pointer;
                &:hover, &.active{
                    background: rgba(123, 134, 169, 0.8);
                }
            }
        }
    }
</style>
