<template>
    <div class="component-image-element" v-if="visible" @click="$emit('click')">
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
                <div class="image-element">
                    <div class="element__content">
                        <div class="content--image" :style="{backgroundImage: 'url('+ element.content.src +')'}"></div>
                    </div>
                </div>
            </div>
        </FreeTransform>
        <Toolbar v-if="element.selected" :element="element" @delete="deleteElement" @styleChange="styleChange" @onChangeStop="onChangeStop" @playAnimation="playAnimation" :parentZoom="parentZoom"></Toolbar>
    </div>
</template>

<script src="./image-element.js"></script>

<style scoped lang="scss" src="./image-element.scss"></style>
