<template>
    <div class="component-video-player" v-if="visible" @click="$emit('click')">
        <div class="element--content" :style="element.styles">
            <video ref="video">
                <source :src="element.content.src" ref="videoSrc" />
            </video>
        </div>
    </div>
</template>

<script src="./video-player.js"></script>

<style scoped lang="scss" src="./video-player.scss"></style>
