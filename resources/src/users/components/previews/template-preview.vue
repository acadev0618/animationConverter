<template>
    <div class="component-template-preview">
        <SlidePreview :slide="firstSlide"></SlidePreview>
    </div>
</template>

<script>
    import SlidePreview from './slide-preview';
    export default {
        name: "template-preview",
        props: {
            template: {
                type: Object,
                required: true,
            }
        },
        data: function () {
            let firstSlide = this.template.slides[0];
            firstSlide.width = this.template.width;
            firstSlide.height = this.template.height;
            return {
                firstSlide: firstSlide,
            }
        },
        components: {
            SlidePreview
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
