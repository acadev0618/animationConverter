<template>
    <div class="component-lottie-player" v-if="visible" @click="$emit('click')">
        <FreeTransform
            :key="element.id"
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
            :selected="element.selected"
            :selectOn="element.selectOn"
            @update="update($event)"
            :aspect-ratio="false"
            :scale-from-center="false"
            :animationStyle="animationStyle"
            :state="state"
            :canTransform="false"
        >
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="lottie-player">
                    <div class="element__content">
                        <lottie :options="defaultOptions" :height="element.height" :width="element.width" v-on:animCreated="handleAnimation"/>
                    </div>
                </div>
            </div>
        </FreeTransform>
    </div>
</template>

<script src="./lottie-player.js"></script>

<style scoped lang="scss" src="./lottie-player.scss"></style>
