<template>
    <div class="component-crop-image-preview">
        <div class="img-preview" :style="previewStyle">
            <img :src="src" alt="" :style="imageStyle"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "crop-image-preview",
        props: {
            src: {
                type: String
            },
            cropData: {
                type: Object
            },
            imageSize: {
                type: Object
            },
            width: {
                type: [String, Number],
                default: 'auto'
            },
            height: {
                type: [String, Number],
                default: 'auto'
            },
        },
        computed: {
        },
        watch: {
            width(nv, ov) {
                this.prepare();
            },
            height(nv, ov) {
                this.prepare();
            }
        },
        data: function() {
            return {
                imageStyle: {},
                previewStyle: {}
            }
        },
        mounted() {
            this.prepare();
        },
        methods: {
            prepare() {
                let rate = 1;
                if (this.width === 'auto') {
                    rate = this.$el.offsetWidth / this.cropData.width;
                } else {
                    rate = this.width / this.cropData.width;
                }
                this.previewStyle = {
                    width: this.cropData.width * rate + 'px',
                    height: this.cropData.height * rate + 'px'
                };
                this.imageStyle = {
                    width: this.imageSize.width * rate + 'px',
                    height: this.imageSize.height * rate + 'px',
                    left: -this.cropData.x * rate + 'px',
                    top: -this.cropData.y * rate + 'px',
                    position: 'absolute',
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .component-crop-image-preview{
        .img-preview{
            position: relative;
            overflow: hidden;
            img{
                pointer-events: none;
            }
        }
    }
</style>
