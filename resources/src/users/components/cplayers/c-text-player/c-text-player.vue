<template>
    <div class="component-text-player" v-if="visible" @click="$emit('click')">
        <AnimationMaker v-if="animation" :animation="animation" @renderKeyframe="animationMade"></AnimationMaker>
        <FreeTransform
            :key="'image-player-' + element.id"
            :x="element.x"
            :y="element.y"
            :scale-x="element.scaleX"
            :scale-y="element.scaleY"
            :width="element.width"
            :height="element.height"
            :angle="element.angle"
            :offset-x="offsetX"
            :offset-y="offsetY"
            :disable-scale="element.disableScale === true"
            :selectOn="element.selectOn"
            :aspect-ratio="false"
            :scale-from-center="false"
            :animationStyle="animationStyle"
            :state="state"
        >
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="text-element" ref="contentInner">
                    <div class="element__content">
                        <div class="content--text" :style="element.content.style" v-html="element.content.html"></div>
                    </div>
                </div>
            </div>
        </FreeTransform>
    </div>
</template>

<script src="./c-text-player.js"></script>

<style scoped lang="scss" src="./c-text-player.scss"></style>
