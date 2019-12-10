<template>
    <div class="component-text-toolbar">
        <header class="toolbar__header">
            <div class="header__name">TEXT</div>
        </header>
        <div class="toolbar__body">
            <section class="typeface">
                <div class="section__name">
                    Typeface
                </div>
                <div class="section__body">
                    <div class="font__select">
                        <v-select :searchable="false" :clearable="false" :options="fontOptions" class="toolbar--select" v-model="font" v-on:input="styleChange({fontFamily: font.value})">
                            <template slot="option" slot-scope="option">
                                <span :style="option.style"></span>
                            </template>
                        </v-select>
                    </div>
                    <div class="font__weight-style">
                        <v-select :searchable="false" :clearable="false" :options="fontWeightStyle" class="toolbar--select" v-model="fWeightStyle" v-on:input="styleChange(fWeightStyle.style)">
                            <template slot="option" slot-scope="option">
                                <span :style="option.style">{{option.label}}</span>
                            </template>
                        </v-select>
                    </div>
                </div>
            </section>
            <section class="align">
                <div class="align--list">
                    <div class="list__item" :class="{selected: textAlign === 'left'}" @click="textAlign='left'; styleChange({textAlign: textAlign})">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M15,15 L3,15 L3,17 L15,17 L15,15 Z M15,7 L3,7 L3,9 L15,9 L15,7 Z M3,13 L21,13 L21,11 L3,11 L3,13 Z M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z"></path></g></svg>
                    </div>
                    <div class="list__item" :class="{selected: textAlign === 'center'}" @click="textAlign='center'; styleChange({textAlign: textAlign})">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M7,15 L7,17 L17,17 L17,15 L7,15 Z M3,21 L21,21 L21,19 L3,19 L3,21 Z M3,13 L21,13 L21,11 L3,11 L3,13 Z M7,7 L7,9 L17,9 L17,7 L7,7 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z"></path></g></svg>
                    </div>
                    <div class="list__item" :class="{selected: textAlign === 'right'}" @click="textAlign='right'; styleChange({textAlign: textAlign})">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M3,21 L21,21 L21,19 L3,19 L3,21 Z M9,17 L21,17 L21,15 L9,15 L9,17 Z M3,13 L21,13 L21,11 L3,11 L3,13 Z M9,9 L21,9 L21,7 L9,7 L9,9 Z M3,3 L3,5 L21,5 L21,3 L3,3 Z"></path></g></svg>
                    </div>
                    <div class="list__item" :class="{selected: textTransform === 'uppercase'}" @click="textTransform='uppercase'; styleChange({textTransform: textTransform})">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill-rule="evenodd"><polygon points="5 4 5 6 11 6 11 20 13 20 13 6 19 6 19 4"></polygon></g></svg>
                    </div>
                    <div class="list__item" :class="{selected: textTransform === 'lowercase'}" @click="textTransform='lowercase'; styleChange({textTransform: textTransform})">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M11,7 L11,4 L13,4 L13,7 L16,7 L16,9 L13,9 L13,17 C12.9948261,17.504802 13.4430304,17.9627931 14,18 L16,18 L16,20 L14,20 C12.319212,19.9460447 10.9950837,18.5930034 11,17 L11,9 L9,9 L9,7 L11,7 Z"></path></g></svg>
                    </div>
                    <div class="list__item" :class="{selected: underline}" @click="underline = !underline; styleChange({textDecoration: underline})">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M5,21 L19,21 L19,19 L5,19 L5,21 Z M16,3 L16,10.9924559 C16,13.2039831 14.2052968,15 12,15 C9.78850042,15 8,13.2105736 8,10.9924559 L8,3 L6,3 L6,10.9924559 C6,14.3149115 8.68369912,17 12,17 C15.3101941,17 18,14.3082251 18,10.9924559 L18,3 L16,3 Z"></path></g></svg>
                    </div>
                </div>
            </section>
            <section class="font-size">
                <div class="section__name">Size</div>
                <div class="d-flex align-items-center">
                    <div class="slider-col flex-grow-1 pr-2">
                        <range-slider class="toolbar-slider" min="0" max="50" v-model="fontSize" v-on:input="styleChange({fontSize: fontSize + 'px'})"></range-slider>
                    </div>
                    <div class="value-col">
                        <input type="number" v-model="fontSize" v-on:input="styleChange({fontSize: fontSize + 'px'})"/>
                    </div>
                </div>
            </section>
            <section class="line-height">
                <header class="section__header">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <div class="section__name">Line Height</div>
                        </div>
                        <div class="section__value">{{lineHeight / 10}}</div>
                    </div>
                </header>
                <div class="section__body">
                    <range-slider class="toolbar-slider" min="5" max="50" step="1" v-model="lineHeight" v-on:input="styleChange({lineHeight: lineHeight / 10})"></range-slider>
                </div>
            </section>
            <section class="letter-spacing">
                <header class="section__header">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1">
                            <div class="section__name">Letter Spacing</div>
                        </div>
                        <div class="section__value">{{letterSpacing}}</div>
                    </div>
                </header>
                <div class="section__body">
                    <range-slider class="toolbar-slider" min="-10" max="10" step="1" v-model="letterSpacing" v-on:input="styleChange({letterSpacing: letterSpacing + 'px'})"></range-slider>
                </div>
            </section>
        </div>
    </div>
</template>

<script src="./text-toolbar.js"></script>

<style scoped lang="scss" src="./text-toolbar.scss"></style>
