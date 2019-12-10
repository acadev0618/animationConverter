<template>
    <div class="component-template-player" :style="{height: previewHeight + 'px'}">
        <div class="scale-helper" :style="scaleHelper">
            <div class="work-space">
                <SlidePlayer v-for="(activeSlide, index) in activeSlides"
                             :slide="activeSlide.slide"
                             :enterAnimation="activeSlide.enterAnimation"
                             @nextEnter="nextEnter($event, activeSlide.index)"
                             @afterLeave="afterLeave(index)"
                             :key="'slide_player_' + activeSlide.slide.id"
                             :controlState="state"
                             :controlSeek="activeSlide.controlSeek"
                             :controlVolume="controlVolume"
                             v-on:element_click="onElementClick($event, activeSlide.slide)"
                ></SlidePlayer>
                <AudioPlayer v-if="template.sound" :element="template.sound" style="display: none;" :controlState="state" :controlVolume="controlVolume"></AudioPlayer>
            </div>
        </div>
    </div>
</template>

<script src="./template-player.js"></script>

<style scoped lang="scss" src="./template-player.scss"></style>
