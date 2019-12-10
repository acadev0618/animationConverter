<template>
    <div class="component-lottie-element" v-if="visible" @click="$emit('click')">
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
            @onSelect="setSelected()"
            @update="update($event)"
            :aspect-ratio="false"
            :scale-from-center="false"
            :animationStyle="animationStyle"
            :state="state"
            :parentZoom="parentZoom"
            :canTransform="canTransform"
            @onChangeStop="onChangeStop"
        >
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="lottie-element">
                    <div class="element__content" @click="clickLottie">
                        <lottie v-for="lottie in lotties" :options="lottie.defaultOptions" v-on:animCreated="handleAnimation($event, lottie.key)" :key="lottie.key"/>
                    </div>
                </div>
            </div>
        </FreeTransform>
        <Toolbar v-if="element.selected" :element="element" @delete="deleteElement" @playAnimation="playAnimation" @lottieChange="onLottieChange" @onChangeStop="onChangeStop" :parent-zoom="parentZoom"></Toolbar>
    </div>
</template>

<script src="./lottie-element.js"></script>

<style scoped lang="scss" src="./lottie-element.scss"></style>
