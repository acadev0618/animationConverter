<template>
    <div class="component-color-toolbar">
        <header class="toolbar__header">
            <div class="header__name">COLOR</div>
        </header>
        <div class="toolbar__body">
            <section class="color" v-if="element.type === 'text'">
                <div class="d-flex align-items-center">
                    <div class="color__preview mr-2" @click="showColorSolidPicker">
                        <div class="preview--inner" :style="{backgroundColor: color}"></div>
                    </div>
                    <div class="color__value mr-2">
                        <input type="text" v-model="color"/>
                    </div>
                    <div class="color__copy">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M14,3 L5,3 C3.9,3 3,3.9 3,5 L3,16 L5,16 L5,5 L14,5 L14,3 Z M19.1333333,7 L8.86666667,7 C7.84,7 7,7.7 7,8.55555556 L7,19.4444444 C7,20.3 7.84,21 8.86666667,21 L19.1333333,21 C20.16,21 21,20.3 21,19.4444444 L21,8.55555556 C21,7.7 20.16,7 19.1333333,7 Z M19,19 L9,19 L9,9 L19,9 L19,19 Z"></path></g></svg>
                    </div>
                </div>
                <Chrome v-if="colorPickerOpened" class="popup-chrome" ref="colorPicker" v-model="pickerColor" v-on:input="color = pickerColor.hex; styleChange({color: color})"></Chrome>
            </section>
            <section class="opacity">
                <header class="section__header">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="section__name">Opacity</div>
                        <div class="section__value">{{opacity}}%</div>
                    </div>
                </header>
                <div class="section__body">
                    <range-slider class="toolbar-slider" min="0" max="100" v-model="opacity" v-on:input="styleChange({opacity: opacity / 100})" v-on:change="$emit('onChangeStop')"></range-slider>
                </div>
            </section>
            <section class="blur">
                <header class="section__header">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="section__name">Blur</div>
                        <div class="section__value">{{blur}}</div>
                    </div>
                </header>
                <div class="section__body">
                    <range-slider class="toolbar-slider" min="0" max="100" v-model="blur" v-on:input="styleChange({filter: 'blur('+ blur +'px)'})" v-on:change="$emit('onChangeStop')"></range-slider>
                </div>
            </section>
            <section class="drop-shadow">
                <div class="section__header">
                    <div class="d-flex align-items-center justify-content-between">
                        <PrettyCheck class="p-svg p-curve" color="primary" v-model="isDropShadow" v-on:change="$emit('onChangeStop')">
                            <!-- svg path -->
                            <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                                <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                                      style="stroke: white;fill:white"></path>
                            </svg>
                            Drop shadow
                        </PrettyCheck>
                        <div class="toggle-edit" v-if="isDropShadow">
                            <a target="_self" rel v-if="!isDropShadowEdit" @click="isDropShadowEdit=true">Edit</a>
                            <div v-if="isDropShadowEdit" class="d-flex align-items-center">
                                <div class="drop-shadow__color mr-1" @click="$refs.shadowColorPicker.open()">
                                    <div class="preview--inner" :style="{backgroundColor: shadowColor}"></div>
                                    <ColorPickerPopup v-model="shadowColor" onChangeStop="$emit('onChangeStop')" ref="shadowColorPicker" v-on:input="onShadowChange"></ColorPickerPopup>
                                </div>
                                <a target="_self" rel @click="isDropShadowEdit=false">Close</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section__body" v-if="isDropShadow && isDropShadowEdit">
                    <div class="shadow__detail-row">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="detail__name">Vertical Shadow</div>
                            <input type="number" class="detail__value" v-model="verticalShadow" v-on:input="onShadowChange"/>
                        </div>
                        <div class="detail__slider">
                            <range-slider class="toolbar-slider" min="-100" max="100" v-model="verticalShadow" v-on:input="onShadowChange" v-on:change="$emit('onChangeStop')"></range-slider>
                        </div>
                    </div>
                    <div class="shadow__detail-row">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="detail__name">Horizontal Shadow</div>
                            <input type="number" class="detail__value" v-model="horizontalShadow" v-on:input="onShadowChange"/>
                        </div>
                        <div class="detail__slider">
                            <range-slider class="toolbar-slider" min="-100" max="100" v-model="horizontalShadow" v-on:input="onShadowChange" v-on:change="$emit('onChangeStop')"></range-slider>
                        </div>
                    </div>
                    <div class="shadow__detail-row">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="detail__name">Blur</div>
                            <input type="number" class="detail__value" v-model="shadowBlur" v-on:input="onShadowChange"/>
                        </div>
                        <div class="detail__slider">
                            <range-slider class="toolbar-slider" min="0" max="100" v-model="shadowBlur" v-on:input="onShadowChange" v-on:change="$emit('onChangeStop')"></range-slider>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script src="./color-toolbar.js"></script>

<style scoped lang="scss" src="./color-toolbar.scss"></style>
<style lang="scss">
    .popup-chrome {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 100;
    }
</style>
