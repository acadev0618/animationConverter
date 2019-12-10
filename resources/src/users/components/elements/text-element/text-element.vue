<template>
    <div class="component-text-element" v-if="visible" @click="$emit('click')">
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
            :parentZoom="parentZoom"
            :state="state"
            @onChangeStop="onChangeStop"
        >
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="text-element" ref="contentInner">
                    <div class="element__content">
                        <div class="content--text" :style="element.content.style" ref="editor" v-on:mousedown="editorMouseDown($event)" v-html="contentHtml"></div>
                    </div>
                </div>
            </div>
        </FreeTransform>
        <Toolbar v-if="isEditing" :element="element" @delete="deleteElement" @styleChange="styleChange" @playAnimation="playAnimation" @onChangeStop="onChangeStop" :parent-zoom="parentZoom"></Toolbar>
    </div>
</template>

<script src="./text-element.js"></script>
<style src="quill/dist/quill.snow.css"></style>
<style lang="scss">
    .ql-container{
        .ql-editor{
            padding: 0px;
            span{
                white-space: normal;
            }
        }
        &.ql-disabled{
            .ql-editor{
                *{
                    cursor: inherit;
                }
            }
        }
    }
</style>
<style scoped lang="scss" src="./text-element.scss"></style>
