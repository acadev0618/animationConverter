<template>
    <div class="component-video-element" v-if="visible">
        <div class="element--content" :style="element.styles" @click="onClick">
            <video ref="video">
                <source :src="element.content.src" ref="videoSrc" />
            </video>
        </div>
        <Toolbar v-if="element.selected" :element="element" @delete="deleteElement" @styleChange="styleChange" @onChangeStop="onChangeStop" :parent-zoom="parentZoom"></Toolbar>
    </div>
</template>

<script src="./video-element.js"></script>

<style scoped lang="scss" src="./video-element.scss"></style>
