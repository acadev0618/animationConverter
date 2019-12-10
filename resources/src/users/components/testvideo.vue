<template>
    <!--    <canvas id="mycanvas" >-->
    <!-- -->
    <!--    </canvas>-->
    <div class="videoTestEditor">
    <div class="player__pane" v-if="playerAll" :style="{transform: 'scale('+ editorZoom / 100 +')', marginTop: marginTopByZoom + 'px'}">


<!--        <canvas id="mycanvas1" hidden></canvas>-->
<!--        <canvas id="mycanvas2" hidden></canvas>-->


<!--        <svg width="800" height="800" >-->
<!--            <g v-if="backimgs">-->
<!--                <image v-for="item in  backimgs" :xlink:href="item" x="0" y="0"  height="800px" width="800px"/>-->
<!--                <h1>ghgh</h1>-->
<!--            </g>-->
<!--        </svg>-->


<!--        <svg width="800" height="800" >-->
<!--            <g v-if="ubuildings">-->
<!--                <rect v-for="item in ubuildings" :x="item.px" :y="item.py" :width="item.w" :height="item.h" :style="{fill: item.bgColor}" />-->
<!--            </g>-->
<!--        </svg>-->

<!--            <TemplatePlayer-->
<!--                    :template="template_store"-->
<!--                    :controlSeek="templateControlSeek"-->
<!--                    :controlState="template_store.state"-->
<!--                    :controlVolume="controlVolume"-->
<!--                    v-on:onPlay="onTemplatePlay"-->
<!--                    v-on:onPause="onTemplatePause"-->
<!--                    v-on:onStop="onTemplateStop"-->
<!--                    v-on:element_click="onTemplateElementClick"-->
<!--            ></TemplatePlayer>-->

        <TemplatePlayer
                :template="template_store"
                :controlVolume="controlVolume"
        ></TemplatePlayer>

        <div class="layout-footer">
            <video-editor-timeline></video-editor-timeline>
        </div>

<!--        <TemplatePlayer    :template="template_store" ></TemplatePlayer>-->
    </div>
        </div>

</template>

<script>

    import TemplatePlayer from './svg-players/template-svg-player/template-svg-player.vue';

    import VideoEditorLayers from './video-editor-layers/video-editor-layers.vue';
    import VideoEditorTimeline from './video-editor-timeline/video-editor-timeline.vue';
    import 'vue-range-slider/dist/vue-range-slider.css';


    export default {
        name: "testvideo",
        data: function () {
            return {
                playerAll: true,
                volume: this.$store.state.template.sound ? this.$store.state.template.sound.volume * 100 : 50,
                controlVolume: this.$store.state.template.sound ? this.$store.state.template.sound.volume : 0.5,
                offsetX: 0,
                offsetY: 0,


                buildings: vbuildings,
                // ubuildings:[],
                template: videoTemplate,
                // backimgs: []

            }
        },
        // created:

        //     function() {  //make  backimages
        //
        //         let JSONObject = this.$store.state.demo.jsonData;
        //        consloe.log(JSONObject);
        //
        //         let ary = JSONObject.slides;
        //
        //         for (let kk in ary) {
        //             let element = ary[kk];
        //             let back = element.css.backgroundImage;
        //             back= back.substring(4, back.length - 1);
        //             this.backimgs[kk]=back;
        //             this.backimgs.push(back);
        //             this.backimgs[kk].src = back;
        //         }
        //
        //     consloe.log(this.backimgs);
        // },
        methods: {
            assign: function () {
                this.$store.commit('demo/add_slide', this.buildings);
                this.$store.commit('demo/set_with', JSON.parse(videoTemplate.data_json));
                console.log(videoTemplate.data_json);
            },
            initCanvas: function () {

                this.buildings = this.$store.state.demo.sbuildings;

                let canvas=document.getElementById('mycanvas2');
                canvas.style.zIndex=2;
                // canvas.style.position();
                var ctx = document.getElementById("mycanvas2").getContext("2d");
                // ctx.fillStyle = "orange";
                // ctx.fillRect(0, 0, 800, 800);

                const abuildings = this.$store.state.demo.sbuildings;

                for (var i = 0; i < abuildings.length; i++) {
                    var line = abuildings[i];
                    ctx.fillStyle = line.bgColor;
                    ctx.fillRect(line.px, line.py, line.w, line.h);
                }
            },
            renderJson: function () {
                //////

                let loadcount = 0;
                let preloaded = false;

                let JSONObject = this.$store.state.demo.jsonData;

                // console.log("jsondata in renderJson");
                // console.log(JSONObject);

                let sources = [];
                var img = [];
                let ary = JSONObject.slides;

                // console.log('i am ik'+ary);
                var canvas;
                canvas=document.getElementById('mycanvas1');
                canvas.style.zIndex=1;
                var ctx = document.getElementById('mycanvas1').getContext("2d");
                for (let kk in ary) {
                    let element = ary[kk];
                    let back = element.css.backgroundImage;
                      back= back.substring(4, back.length - 1);
                    img.push(back);
                    img[kk] = new Image();
                    img[kk].onload = function () {
                        ctx.drawImage(img[kk], kk*120, kk*30, 250, 220);
                        loadcount++;
                    }
                    img[kk].src = back;
                }
            },

            makeImage: function() {  //make  backimages

                let JSONObject = this.$store.state.demo.jsonData;


                var img = [];
                let ary = JSONObject.slides;


                for (let kk in ary) {

                    let element = ary[kk];

                    console.log("slide array");
                    console.log(element);

                    let back = element.css.backgroundImage;
                    back= back.substring(4, back.length - 1);

                    img.push(back);

                }
                 this.backimgs=img;
                // console.log(this.backimgs);
            },


        },


        computed: {
            template_store: function () {
                // return this.$store.state.template;
                return this.$store.state.demo;
            },


            editorZoom() {
                return this.$store.state.editor.zoom;
            },
            marginTopByZoom() {
                let offset = this.$store.state.editor.zoom - 100;
                if (offset > 0) {
                    return this.template_store.height * offset / 100 / 2;
                } else {
                    return this.template_store.height * offset / 100 / 2;
                }
            }
        },
        mounted() {
            // this.initCanvas();
            // this.renderJson();
            // this.makeImage();

            // this.ubuildings=this.buildings;


        },
        created() {
            this.assign();
        },
        components: {
            TemplatePlayer,
            VideoEditorTimeline


        }

    }
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