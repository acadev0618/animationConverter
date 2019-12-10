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
            :canTransform="!cropping"
            @onChangeStop="onChangeStop"
        >
            <div class="element"
                 :style="getElementStyles(element)">
                <div class="image-element">
                    <div class="element__content">
                        <div class="content--image" :fill="element.fill_mode" :style="{backgroundImage: 'url('+ element.content.src +')'}" v-if="element.fill_mode !== 'crop' && !cropping"></div>
                        <div class="preview-crop" v-if="element.fill_mode === 'crop' && !cropping">
                            <crop-image-preview :src="element.content.src"
                                                :image-size="{width: element.content.width, height: element.content.height}"
                                                :crop-data="element.crop_data"
                                                :width="element.width * element.scaleX"
                                                :height="element.height * element.scaleY"
                            ></crop-image-preview>
                        </div>
                        <div class="cropper--wrapper" v-if="cropping" :style="cropperWrapperStyle">
                            <div class="cropper__tools">
                                <button class="btn btn-check mr-2" @click="cropImage">
                                    <svg  width="24" height="24" viewBox="0 0 24 24"><defs><path id="aapply" d="M18.453 6l-9.49 9.495-3.422-3.422L4 13.62l4.963 4.964L20 7.545z"></path></defs><g fill="none" fill-rule="evenodd"><mask id="bapply" fill="#fff"><use xlink:href="#aapply"></use></mask><g fill="#fff" mask="url(#bapply)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                                    <span>Crop</span>
                                </button>
                                <button class="btn btn-cancel" @click="cropping = false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>
                                    <span>Cancel</span>
                                </button>
                            </div>
                            <vue-cropper
                                ref="cropper"
                                :src="element.content.src"
                                alt="Source Image"
                                :view-mode="3"
                                :data="cropperData"
                                :minContainerHeight="parseInt(cropperWrapperStyle.height)"
                            >
                            </vue-cropper>
                        </div>
                    </div>
                </div>
            </div>
        </FreeTransform>
        <Toolbar v-if="element.selected && !cropping" :element="element" @delete="deleteElement" @styleChange="styleChange" @onChangeStop="onChangeStop" @playAnimation="playAnimation" :parentZoom="parentZoom" @crop="cropping=true"></Toolbar>
    </div>
</template>

<script src="./image-element.js"></script>

<style scoped lang="scss" src="./image-element.scss"></style>
