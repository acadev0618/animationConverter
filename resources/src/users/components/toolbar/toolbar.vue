<template>
    <div class="component-toolbar" :style="computedStyle">
        <div class="tool--list">
            <div class="list__item flex-center" v-if="isInArray('text', useTools)" :class="{selected: selectedTool === 'text'}" @click="setSelectedTool('text')">
                <div class="item--inner">
                    <svg viewBox="0 0 24 24"><defs><path id="text-i" d="M4 4v3h7v12h3V7h7V4z"></path></defs><g fill-rule="evenodd"><mask id="text-b" fill="#fff"><use xlink:href="#text-i"></use></mask><g mask="url(#text-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('lottie-text', useTools)" :class="{selected: selectedTool === 'lottie-text'}" @click="setSelectedTool('lottie-text')">
                <div class="item--inner">
                    <svg viewBox="0 0 24 24"><defs><path id="text-i" d="M4 4v3h7v12h3V7h7V4z"></path></defs><g fill-rule="evenodd"><mask id="text-b" fill="#fff"><use xlink:href="#text-i"></use></mask><g mask="url(#text-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('lottie-asset', useTools)" :class="{selected: selectedTool === 'lottie-asset'}" @click="setSelectedTool('lottie-asset')">
                <div class="item--inner">
                    <svg enable-background="new 0 0 488.471 488.471" viewBox="0 0 488.471 488.471" xmlns="http://www.w3.org/2000/svg"><path d="m244.235 0c-134.669 0-244.235 109.566-244.235 244.235s109.566 244.235 244.235 244.235 244.235-109.566 244.235-244.235-109.565-244.235-244.235-244.235zm-183.176 244.235c0-101.009 82.167-183.176 183.176-183.176s183.176 82.167 183.176 183.176c0 18.481-2.808 36.306-7.921 53.138l-114.196-114.197-190.525 190.526c-33.168-33.168-53.71-78.962-53.71-129.467z"/><path d="m200.293 150.795c17.884 17.884 17.884 46.879 0 64.763s-46.879 17.884-64.763 0-17.884-46.879 0-64.763 46.879-17.884 64.763 0"/></svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('color', useTools)" :class="{selected: selectedTool === 'color'}" @click="setSelectedTool('color')">
                <div class="item--inner">
                    <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="color-a" d="M17.505 12C16.704 12 16 11.302 16 10.501c0-.801.704-1.499 1.505-1.499.795 0 1.499.698 1.499 1.499 0 .801-.704 1.499-1.499 1.499m-3.004-3.999c-.8 0-1.499-.699-1.499-1.499 0-.802.699-1.499 1.499-1.499.801 0 1.499.697 1.499 1.499 0 .8-.698 1.499-1.499 1.499m-5.001 0c-.8 0-1.499-.699-1.499-1.499 0-.802.699-1.499 1.499-1.499.802 0 1.499.697 1.499 1.499 0 .8-.697 1.499-1.499 1.499M6.502 12c-.801 0-1.499-.698-1.499-1.499 0-.801.698-1.499 1.499-1.499.8 0 1.499.698 1.499 1.499 0 .801-.699 1.499-1.499 1.499M12 3c-5 0-9 3.999-9 9 0 5.001 4 9 9 9 .802 0 1.499-.698 1.499-1.499 0-.4-.097-.698-.4-1.001-.195-.298-.395-.095-.395-.495 0-.802.698-1.005 1.499-1.005H16c2.804 0 5-2.697 5-5.501C21 7.1 17.001 3 12 3"></path></defs><g fill-rule="evenodd"><mask id="color-b" fill="#fff"><use xlink:href="#color-a"></use></mask><g mask="url(#color-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('setting', useTools)" :class="{selected: selectedTool === 'setting'}" @click="setSelectedTool('setting')">
                <div class="item--inner">
                    <svg viewBox="0 0 18 18"><path d="M18,7.51l-2.29-.43a7.63,7.63,0,0,0-.82-1.51L16,3.66h0L14.31,2h0L12.39,3.11a9.15,9.15,0,0,0-1.74-.72L10,0.05V0H7.51L7.08,2.29a7.63,7.63,0,0,0-1.51.82L3.66,2h0L2,3.69H2L3.11,5.61A7.28,7.28,0,0,0,2.4,7.08l-2.34.43H0v2.93H0l2.28,0.43a7.68,7.68,0,0,0,.83,1.52L2,14.31H2L3.86,16H3.76l1.86-1.12a7,7,0,0,0,1.48.73L7.52,18v0h2.93l0.43-2.28a7.68,7.68,0,0,0,1.52-.83L14.31,16h0L16,14.14v0.1l-1.12-1.86a7,7,0,0,0,.74-1.53L18,10.43h0V7.51h0ZM9,13a4,4,0,1,1,4-4A4,4,0,0,1,9,13Z"></path><circle cx="9" cy="9" r="2"></circle></svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('layer', useTools)" :class="{selected: selectedTool === 'layer'}" @click="setSelectedTool('layer')">
                <div class="item--inner">
                    <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="layers-a" d="M11.929 3l9.928 4.964-9.928 4.965L2 7.964 11.929 3zm7.928 7.964l2 1-9.928 4.965L2 11.964l2-1 7.929 3.965 7.928-3.965zm0 4l2 1-9.928 4.965L2 15.964l2-1 7.929 3.965 7.928-3.965z"></path></defs><g fill-rule="evenodd"><mask id="layers-b" fill="#fff"><use xlink:href="#layers-a"></use></mask><g mask="url(#layers-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('transition', useTools)" :class="{selected: selectedTool === 'transition'}" @click="setSelectedTool('transition')">
                <div class="item--inner">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 503.596 503.596" style="enable-background:new 0 0 503.596 503.596;" xml:space="preserve">
                            <g>
                                <g>
                                    <path d="M503.592,84.774c0-10.968-8.892-19.86-19.852-19.86H19.86C8.892,64.914,0,73.806,0,84.774v334.048
                                        c0,10.968,8.892,19.86,19.86,19.86h463.884c10.96,0,19.852-8.892,19.852-19.86V84.774H503.592z M259.668,96.394
                                        c0-2.172,1.756-3.936,3.936-3.936h31.476c2.172,0,3.928,1.764,3.928,3.936v31.476c0,2.18-1.756,3.928-3.928,3.928h-31.476
                                        c-2.18,0-3.936-1.752-3.936-3.928V96.394z M204.588,96.394c0-2.172,1.764-3.936,3.936-3.936h31.472
                                        c2.172,0,3.932,1.764,3.932,3.936v31.476c0,2.18-1.76,3.928-3.932,3.928h-31.472c-2.172,0-3.936-1.752-3.936-3.928V96.394z
                                         M78.688,407.206c0,2.172-1.756,3.928-3.936,3.928H43.284c-2.172,0-3.936-1.756-3.936-3.928V375.73
                                        c0-2.172,1.764-3.936,3.936-3.936h31.468c2.18,0,3.936,1.764,3.936,3.936V407.206z M78.688,127.87c0,2.18-1.756,3.928-3.936,3.928
                                        H43.284c-2.172,0-3.936-1.752-3.936-3.928V96.394c0-2.172,1.764-3.936,3.936-3.936h31.468c2.18,0,3.936,1.764,3.936,3.936V127.87z
                                         M133.772,407.206c0,2.172-1.764,3.928-3.936,3.928H98.36c-2.172,0-3.928-1.756-3.928-3.928V375.73
                                        c0-2.172,1.756-3.936,3.928-3.936h31.476c2.172,0,3.936,1.764,3.936,3.936V407.206z M133.772,127.87
                                        c0,2.18-1.764,3.928-3.936,3.928H98.36c-2.172,0-3.928-1.752-3.928-3.928V96.394c0-2.172,1.756-3.936,3.928-3.936h31.476
                                        c2.172,0,3.936,1.764,3.936,3.936V127.87z M188.852,407.206c0,2.172-1.764,3.928-3.936,3.928h-31.472
                                        c-2.176,0-3.932-1.756-3.932-3.928V375.73c0-2.172,1.756-3.936,3.932-3.936h31.472c2.172,0,3.936,1.764,3.936,3.936V407.206z
                                         M188.852,127.87c0,2.18-1.764,3.928-3.936,3.928h-31.472c-2.176,0-3.932-1.752-3.932-3.928V96.394
                                        c0-2.172,1.756-3.936,3.932-3.936h31.472c2.172,0,3.936,1.764,3.936,3.936V127.87z M196.716,316.338v-135.96
                                        c0-11.624,5.964-19.116,15.08-19.116c4.064,0,8.4,1.516,12.796,4.516l95.164,64.652c6.852,4.664,10.632,11.032,10.632,17.936
                                        c0,6.892-3.764,13.256-10.616,17.916l-95.14,64.672c-4.404,2.992-8.776,4.508-12.84,4.508
                                        C202.68,335.462,196.716,327.962,196.716,316.338z M243.928,407.206c0,2.172-1.76,3.928-3.932,3.928h-31.472
                                        c-2.172,0-3.936-1.756-3.936-3.928V375.73c0-2.172,1.764-3.936,3.936-3.936h31.472c2.172,0,3.932,1.764,3.932,3.936V407.206z
                                         M299.008,407.206c0,2.172-1.756,3.928-3.928,3.928h-31.476c-2.18,0-3.936-1.756-3.936-3.928V375.73
                                        c0-2.172,1.756-3.936,3.936-3.936h31.476c2.172,0,3.928,1.764,3.928,3.936V407.206z M354.084,407.206
                                        c0,2.172-1.752,3.928-3.928,3.928H318.68c-2.172,0-3.928-1.756-3.928-3.928V375.73c0-2.172,1.756-3.936,3.928-3.936h31.476
                                        c2.18,0,3.928,1.764,3.928,3.936V407.206z M354.084,127.87c0,2.18-1.752,3.928-3.928,3.928H318.68
                                        c-2.172,0-3.928-1.752-3.928-3.928V96.394c0-2.172,1.756-3.936,3.928-3.936h31.476c2.18,0,3.928,1.764,3.928,3.936V127.87z
                                         M405.236,411.134h-31.48c-2.164,0-3.928-1.756-3.928-3.928V375.73c0-2.172,1.764-3.936,3.928-3.936h31.476
                                        c2.18,0,3.936,1.764,3.936,3.936v31.476h0.004C409.172,409.378,407.416,411.134,405.236,411.134z M405.236,131.798h-31.48
                                        c-2.164,0-3.928-1.752-3.928-3.928V96.394c0-2.172,1.764-3.936,3.928-3.936h31.476c2.18,0,3.936,1.764,3.936,3.936v31.476h0.004
                                        C409.172,130.05,407.416,131.798,405.236,131.798z M464.248,407.206c0,2.172-1.756,3.928-3.936,3.928h-31.468
                                        c-2.172,0-3.936-1.756-3.936-3.928V375.73c0-2.172,1.764-3.936,3.936-3.936h31.468c2.18,0,3.936,1.764,3.936,3.936V407.206z
                                         M464.248,127.87c0,2.18-1.756,3.928-3.936,3.928h-31.468c-2.172,0-3.936-1.752-3.936-3.928V96.394
                                        c0-2.172,1.764-3.936,3.936-3.936h31.468c2.18,0,3.936,1.764,3.936,3.936V127.87z"/>
                                </g>
                            </g>
                            </svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('duplicate', useTools)" @click="duplicate">
                <div class="item--inner">
                    <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="dup-a" d="M7.992 3C6.892 3 6 3.888 6 5v2h-.999A2.003 2.003 0 0 0 3 9.006v9.988C3 20.102 3.897 21 5.006 21h9.989c1.108 0 2.006-.9 2.006-2.001V18h2C20.104 18 21 17.107 21 16.008V4.992C21 3.892 20.107 3 19.008 3H7.992zM8 5h11v11h-2V7h-9V5zM11 11v2h2v2h-2v2H9v-2H7v-2h2v-2h2zM5 9h10v10H5V9z"></path></defs><g fill-rule="evenodd"><mask id="dup-b" fill="#fff"><use xlink:href="#dup-a"></use></mask><g mask="url(#dup-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                </div>
            </div>
            <div class="list__item flex-center" v-if="isInArray('delete', useTools)" @click="$emit('delete')">
                <div class="item--inner">
                    <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="del-a" d="M10 3v1H6v2h1v13.008A2 2 0 0 0 9.001 21h6.998C17.104 21 18 20.1 18 19.008V6h1V4h-4V3h-5zM9 8.001h7V7H9v1.001zM15 19h1v-9h-1v9zm-2.999 0h1v-9h-1v9zM9 19h1v-9H9v9z"></path></defs><g fill-rule="evenodd"><mask id="del-b" fill="#fff"><use xlink:href="#del-a"></use></mask><g mask="url(#del-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                </div>
            </div>
        </div>
        <div class="tool--container">
            <TextToolbar v-if="selectedTool==='text'" @styleChange="styleChange"></TextToolbar>
            <LottieTextToolbar v-if="selectedTool==='lottie-text'" @lottieChange="$emit('lottieChange')" :element="element" @onChangeStop="$emit('onChangeStop')"></LottieTextToolbar>
            <LottieAssetToolbar v-if="selectedTool==='lottie-asset'" @lottieChange="$emit('lottieChange')" :element="element" @onChangeStop="$emit('onChangeStop')"></LottieAssetToolbar>
            <ColorToolbar v-if="selectedTool==='color'" :element="element" @styleChange="styleChange" @onChangeStop="$emit('onChangeStop')"></ColorToolbar>
            <LayerToolbar v-if="selectedTool==='layer'" :element="element" @styleChange="styleChange" @onChangeStop="$emit('onChangeStop')"></LayerToolbar>
            <TransitionToolbar v-if="selectedTool === 'transition'" :element="element" @playAnimation="$emit('playAnimation', $event)" @onChangeStop="$emit('onChangeStop')"></TransitionToolbar>
            <SettingToolbar v-if="selectedTool === 'setting'" :element="element" @onChangeStop="$emit('onChangeStop')" @crop="$emit('crop')"></SettingToolbar>
        </div>
    </div>
</template>

<script>
    import TextToolbar from './text-toolbar/text-toolbar.vue'
    import ColorToolbar from './color-toolbar/color-toolbar.vue'
    import LayerToolbar from './layer-toolbar/layer-toolbar.vue'
    import TransitionToolbar from './transition-toolbar/transition-toolbar.vue'
    import LottieTextToolbar from './lottie-text-toolbar/lottie-text-toolbar.vue'
    import LottieAssetToolbar from './lottie-asset-toolbar/lottie-asset-toolbar.vue'
    import SettingToolbar from './setting-toolbar/setting-toolbar.vue';

    import Vue from 'vue';
    import VueSelect from 'vue-select'
    VueSelect.props.components.default = () => ({
        OpenIndicator: {
            render: createElement => createElement('span', ''),
        },
    });
    Vue.component('v-select', VueSelect);

    export default {
        name: "toolbar",
        props: {
            element: {
                type: Object,
                required: true
            },
            parentZoom: {
                type: Number,
                default: 100,
            }
        },
        data: function() {
            let allUseTools = {
                text: ['text', 'color', 'layer', 'transition', 'duplicate', 'delete'],
                image: ['color', 'setting', 'layer', 'transition', 'duplicate', 'delete'],
                shape: ['color', 'layer', 'transition', 'duplicate', 'delete'],
                lottie: ['color', 'lottie-text', 'lottie-asset', 'delete'],
                video: ['color', 'delete'],
            };
            return {
                selectedTool: false,
                useTools: this.element.useTools ? this.element.useTools : allUseTools[this.element.type],
            }
        },
        components: {
            TextToolbar,
            ColorToolbar,
            LayerToolbar,
            TransitionToolbar,
            LottieTextToolbar,
            LottieAssetToolbar,
            SettingToolbar
        },
        computed: {
            computedStyle() {
                let top = (this.element.y + (1 - this.element.scaleY) * this.element.height) + 'px';
                let left = (this.element.x + this.element.width + 15) + 'px';
                let scale = 'scale('+ 100 / this.parentZoom +')';
                return {
                    top: top,
                    left: left,
                    transformOrigin: 'top left',
                    transform: scale,
                }
            }
        },
        methods: {
            setSelectedTool(tool) {
                this.selectedTool = tool;
            },
            styleChange(payload) {
                this.$emit('styleChange', payload);
            },
            duplicate() {
                let element = {...this.element};
                delete element.id;
                element.selected = false;
                element.x += 10;
                element.y += 10;
                this.$store.commit('current_slide/add_new', element);
            },
            isInArray(item, arr) {
                return arr.indexOf(item) !== -1;
            }
        }
    }
</script>

<style scoped lang="scss">
    .component-toolbar {
        width: 40px;
        height: auto;
        position: absolute;
        background-color: white;
        box-shadow: 0 0 30px 0 rgba(81, 88, 115, 0.2);
        z-index: 20;
        .tool--list{
            .list__item{
                height: 40px;
                cursor: pointer;
                .item--inner{
                    width: 24px;
                    height: 24px;
                    svg{
                        width: 100%;
                        height: 100%;
                        fill: rgba(46, 50, 70, 0.8);
                    }
                }
                &:hover{
                    background-color: #dfe0e6;
                }
                &.selected{
                    background-color: #526ede;
                    .item--inner{
                        svg{
                            fill: white;
                        }
                    }
                }
            }
        }
        .tool--container{
            position: absolute;
            top: 0px;
            left: calc(100% + 10px);
            width: 200px;
        }
    }
</style>

<style lang="scss">
    .v-select.toolbar--select {
        background-color: rgba(223, 224, 230, 0.6);
        color: #2e3246;
        font-size: 12px;
        .vs__dropdown-toggle{
            padding: 1px 0px;
            border-radius: 1px;
            border: none;
            .vs__selected-options{
                .vs__selected{
                    margin-top: 0px;
                    font-size: 12px;
                    color: #2e3246;
                }
            }
            .vs__actions{
                .vs__open-indicator{
                    display: block;
                    width: 25px;
                    height: 25px;
                    position: relative;
                    &:before{
                        content: '';
                        display: block;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 5px solid #2e3246;
                        height: 0;
                        width: 0;
                        line-height: 28px;
                        margin-left: 8px;
                        margin-top: 10px;
                        position: absolute;
                        vertical-align: middle;
                    }
                }
            }
        }
        .vs__dropdown-menu {
            top: calc(100% + 5px);
            min-width: 0px;
            background-color: white;
            li{
                padding: 0px 10px;
                font-size: 12px;
                color: #2e3246;
                height: 28px;
                align-items: center;
                display: flex;
                span {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 28px;
                    background-repeat: no-repeat;
                    background-size: auto 14px;
                    background-position: 10px center;
                }
                &:hover{
                    background-color: rgba(223, 224, 230, 0.6);
                }
            }
        }
        &.vs--open{
            .vs__dropdown-toggle{
                .vs__selected{
                    position: relative;
                }
            }
        }
    }
    .toolbar-slider{
        display: block;
        width: 100%;
        padding: 0px;
        .range-slider-knob{
            width: 16px;
            height: 16px;
        }
    }
</style>
<style lang="scss" src="pretty-checkbox/src/pretty-checkbox.scss"></style>
