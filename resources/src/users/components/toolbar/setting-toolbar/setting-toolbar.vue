<template>
    <div class="component-setting-toolbar">
        <header class="toolbar__header">
            <div class="header__name">SETTING</div>
        </header>
        <div class="toolbar__body">
            <section class="change-image">
                <button class="change-image-btn btn btn-block">
                    <svg width="18px" height="18px" viewBox="0 0 18 18"><g stroke="none" fill="none"><g transform="translate(-653.000000, -398.000000)" fill="#FFFFFF"><g transform="translate(650.000000, 395.000000)"><path d="M21,19 L21,5 C21,3.9 20.1,3 19,3 L5,3 C3.9,3 3,3.9 3,5 L3,19 C3,20.1 3.9,21 5,21 L19, 21 C20.1,21 21,20.1 21,19 Z M8.5,13.5 L11,16.51 L14.5,12 L19,18 L5,18 L8.5,13.5 Z M15, 10 C13.8954305,10 13,9.1045695 13,8 C13,6.8954305 13.8954305,6 15,6 C16.1045695,6 17, 6.8954305 17,8 C17,9.1045695 16.1045695,10 15,10 Z"></path></g></g></g></svg>
                    <span>Change image</span>
                </button>
            </section>
            <section class="crop-image">
                <button class="crop-image-btn btn btn-block" @click="$emit('crop')">
                    <svg width="18px" height="18px" viewBox="0 0 18 18"><g stroke="none" fill="none"><g transform="translate(-677.000000, -438.000000)"><g transform="translate(610.000000, 431.000000)"><g transform="translate(64.000000, 2.000000)"><g transform="translate(0.000000, 2.000000)"><polygon points="0 0 24 0 24 24 0 24"></polygon><path d="M16,14 L18,14 L18,8 C18,6.9 17.1,6 16,6 L10,6 L10,8 L16,8 L16,14 Z M8,16 L8,3 L6, 3 L6,6 L3,6 L3,8 L6,8 L6,16 C6,17.1 6.9,18 8,18 L16,18 L16,21 L18,21 L18,18 L21, 18 L21,16 L8,16 Z" fill="#2E3246"></path></g></g></g></g></g></svg>
                    <span>Crop</span>
                </button>
            </section>
            <section class="fill-mode">
                <v-select :searchable="false" :clearable="false" :options="fillModeOptions" class="toolbar--select" v-model="fillMode" :reduce="option => option.value" v-on:input="onFillModeInput"></v-select>
            </section>
        </div>
    </div>
</template>

<script src="./setting-toolbar.js"></script>

<style scoped lang="scss" src="./setting-toolbar.scss"></style>
