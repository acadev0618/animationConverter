<template>
    <div class="component-slide-player" :class="{animated: animated}" v-if="this.visible">
        <AnimationMaker v-if="animation" :animation="animation" @renderKeyframe="animationMade"></AnimationMaker>
        <div class="animation--wrap" :style="animationStyle">
            <div class="work-space" :style="slide.css" ref="workspace">
                <VideoPlayer v-if="slide.backgroundVideo"
                             :element="slide.backgroundVideo"
                             :controlState="state"
                             :controlActive="activeSlide"
                             :controlSeek="timer.timeSeek()"
                             :control-volume="controlVolume"
                ></VideoPlayer>
                <template v-for="element in slide.elements">
                    <ImagePlayer
                        v-if="element.type === 'image' && element.visible"
                        :element="element"
                        :offsetX="offsetX"
                        :offsetY="offsetY"
                        :controlState="state"
                        :controlActive="activeSlide"
                        :controlSeek="timer.timeSeek()"
                        @click="elementClick(element)"
                    ></ImagePlayer>
                    <TextPlayer
                        v-if="element.type === 'text' && element.visible"
                        :element="element"
                        :offsetX="offsetX"
                        :offsetY="offsetY"
                        :controlState="state"
                        :controlActive="activeSlide"
                        :controlSeek="timer.timeSeek()"
                        @click="elementClick(element)"
                    ></TextPlayer>
                    <ShapePlayer
                        v-if="element.type === 'shape' && element.visible"
                        :element="element"
                        :offsetX="offsetX"
                        :offsetY="offsetY"
                        :controlState="state"
                        :controlActive="activeSlide"
                        :controlSeek="timer.timeSeek()"
                        @click="elementClick(element)"
                    ></ShapePlayer>
                    <LottiePlayer
                        v-if="element.type === 'lottie' && element.visible"
                        :element="element"
                        :offsetX="offsetX"
                        :offsetY="offsetY"
                        :controlState="state"
                        :controlActive="activeSlide"
                        :controlSeek="timer.timeSeek()"
                        @click="elementClick(element)"
                    ></LottiePlayer>
                </template>
            </div>
        </div>
    </div>
</template>

<script src="./c-slide-player.js"></script>

<style scoped lang="scss" src="./c-slide-player.scss"></style>
