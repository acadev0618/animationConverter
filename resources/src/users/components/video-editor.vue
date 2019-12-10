<template>
    <div class="video-editor">
        <div class="layout-body">


            <div class="layout-main" ref="editorMain">
                <video-editor-main></video-editor-main>
            </div>



            <div class="layout-layers">
                <video-editor-layers></video-editor-layers>
            </div>
        </div>
        <div class="layout-footer">
            <video-editor-timeline></video-editor-timeline>
        </div>
    </div>
</template>

<script>
    import VideoEditorMain from './video-editor-main/video-editor-main.vue';
    // import videoTestMain from './videoTestMain/videoTestMain.vue';
    import VideoEditorLayers from './video-editor-layers/video-editor-layers.vue';
    import VideoEditorTimeline from './video-editor-timeline/video-editor-timeline.vue';
    import 'vue-range-slider/dist/vue-range-slider.css';
    export default {
        name: "video-editor",
        components: {VideoEditorTimeline, VideoEditorLayers, VideoEditorMain},
        methods: {
            workingSize() {
                return {
                    width: this.$refs.editorMain.offsetWidth,
                    height: this.$refs.editorMain.offsetHeight,
                };
            }
        },
        computed: {
            templateSize() {
                return {width: this.$store.state.template.width, height: this.$store.state.template.height};
            }
        },
        watch: {
            templateSize(nv, ov) {
                const workingSize = this.workingSize();
                const templateWidth = this.$store.state.template.width;
                const templateHeight = this.$store.state.template.height + 60;
                const scale = Math.min(workingSize.width / templateWidth, workingSize.height / templateHeight);
                const zoom = Math.round(scale * 100);
                this.$store.commit('editor/set_zoom', zoom);
            }
        },
        mounted() {
            setTimeout(() => {
                const workingSize = this.workingSize();
                const templateWidth = this.$store.state.template.width;
                const templateHeight = this.$store.state.template.height + 60;
                const scale = Math.min(workingSize.width / templateWidth, workingSize.height / templateHeight);
                const zoom = Math.round(scale * 100);
                this.$store.commit('editor/set_zoom', zoom);
            }, 100);
        }
    };
</script>


<style scoped lang="scss">
    .video-editor{
        display: flex;
        flex-direction: column;
        height: 100%;
        .layout-body {
            min-height: 0px;
            flex-basis: 100px;
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            .layout-main{
                min-width: 0px;
                flex-basis: 100px;
                flex-grow: 1;
                overflow: auto;
                background-color: #edf0f2;
            }
            .layout-layers{
                flex-basis: 170px;
                flex-grow: 0;
            }
        }
        .layout-footer {
            flex-basis: auto;
            flex-grow: 0;
        }
    }
</style>
