<template>
    <div class="component-shape-element" v-if="visible" @click="$emit('click')">
        <AnimationMaker v-if="animation" :animation="animation" @renderKeyframe="animationMade"></AnimationMaker>
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
            @onChangeStop="onChangeStop"
        >
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="shape-element">
                    <div class="element__content">
                        <img class="content--image" draggable="false"  :src="element.content.src" />
                    </div>
                </div>
            </div>
        </FreeTransform>
        <Toolbar v-if="element.selected" :element="element" @delete="deleteElement" @styleChange="styleChange" @playAnimation="playAnimation" @onChangeStop="onChangeStop" :parent-zoom="parentZoom"></Toolbar>
    </div>
</template>

<script src="./shape-element.js"></script>

<style scoped src="./shape-element.scss" lang="scss"></style>
