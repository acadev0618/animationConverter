<template>
    <div class="component-image-player" v-if="visible" @click="$emit('click')">
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
                <div class="image-element">
                    <div class="element__content">
                        <div class="content--image" :fill="element.fill_mode" :style="{backgroundImage: 'url('+ element.content.src +')'}" v-if="element.fill_mode !== 'crop'"></div>
                        <div class="preview-crop" v-if="element.fill_mode === 'crop'">
                            <crop-image-preview :src="element.content.src"
                                                :image-size="{width: element.content.width, height: element.content.height}"
                                                :crop-data="element.crop_data"
                                                :width="element.width * element.scaleX"
                                                :height="element.height * element.scaleY"
                            ></crop-image-preview>
                        </div>
                    </div>
                </div>
            </div>
        </FreeTransform>
    </div>
</template>

<script src="./c-image-player.js"></script>

<style scoped lang="scss" src="./c-image-player.scss"></style>
