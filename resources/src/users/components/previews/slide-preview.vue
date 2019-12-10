<template>
    <div class="component-slide-preview" :style="{height: previewHeight + 'px'}">
        <div class="work-space" :style="slide.css" ref="workspace">
            <div class="scale-helper" :style="scaleHelper">
                <VideoPreview v-if="slide.backgroundVideo"
                             :element="slide.backgroundVideo"
                ></VideoPreview>
                <template v-for="element in slide.elements">
                    <ImagePreview v-if="element.type === 'image' && element.visible" :element="element" :offsetX="offsetX" :offsetY="offsetY" />
                    <TextPreview v-if="element.type === 'text' && element.visible" :element="element" :offsetX="offsetX" :offsetY="offsetY" />
                    <ShapePreview v-if="element.type === 'shape' && element.visible" :element="element" :offsetX="offsetX" :offsetY="offsetY" />
                    <LottiePreview v-if="element.type === 'lottie' && element.visible" :element="element" :offsetX="offsetX" :offsetY="offsetY" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import ImagePreview from './Image-preview';
    import TextPreview from './text-preview';
    import ShapePreview from './shape-preview';
    import VideoPreview from './video-preview';
    import LottiePreview from './lottie-preview';
    export default {
        name: "slide-preview",
        props: {
            slide: {
                type: Object,
                required: true,
            }
        },
        components: {
            ImagePreview,
            TextPreview,
            ShapePreview,
            VideoPreview,
            LottiePreview
        },
        data: function () {
            return {
                offsetX: 0,
                offsetY: 0,
                previewWidth: false,
            }
        },
        mounted: function () {
            this.offsetX = this.$refs.workspace.getBoundingClientRect().left;
            this.offsetY = this.$refs.workspace.getBoundingClientRect().top;
            this.previewWidth = Math.round(this.$refs.workspace.getBoundingClientRect().width);
        },
        computed: {
            duration() {
                return this.slide.duration;
            },
            previewHeight() {
                if (this.previewWidth) {
                    const slideWidth = this.slide.width ? this.slide.width : this.$store.state.template.width;
                    const slideHeight = this.slide.height ? this.slide.height : this.$store.state.template.height;
                    return slideHeight * this.previewWidth / slideWidth;
                }
            },
            scaleHelper() {
                if (this.previewWidth) {
                    const slideWidth = this.slide.width ? this.slide.width : this.$store.state.template.width;
                    const slideHeight = this.slide.height ? this.slide.height : this.$store.state.template.height;

                    return {
                        width: slideWidth + 'px',
                        height: slideHeight + 'px',
                        transformOrigin: 'top left',
                        transform: 'scale('+ this.previewWidth / slideWidth +')'
                    };
                }
            }
        },
        watch: {
            duration(nv, ov) {
                this.previewWidth = Math.round(this.$refs.workspace.getBoundingClientRect().width);
            }
        }
    }
</script>

<style scoped lang="scss">
    .component-slide-preview {
        width: 100%;
        .work-space{
            width: 100%;
            height: 100%;
            overflow: hidden;
            .scale-helper{

            }
        }
    }
</style>
