<template>
    <svg class="component-image-player" v-if="visible">

<!--        <AnimationMaker v-if="animation" :animation="animation" @renderKeyframe="animationMade"></AnimationMaker>-->
        <SvgTransform
            :key="'image-player-' + element.id"
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
            :selectOn="element.selectOn"
            :aspect-ratio="false"
            :scale-from-center="false"
            :animationStyle="animationStyle"
            :state="state"
        >
<!--            <div class="element"-->
<!--                 :style="getElementStyles(element)">-->
<!--                <div class="image-element">-->
<!--                    <div class="element__content">-->


<!--                        <div class="content&#45;&#45;image" :fill="element.fill_mode" :style="{backgroundImage: 'url('+ element.content.src +')'}" v-if="element.fill_mode !== 'crop'"></div>-->
            <!--                            <image  :xlink:href="elementImageUrl" x="0" y="0"  height="100%" width="100%"/>-->


<!--                        <svg>-->
<!--                               <circle cx="100" cy="150" r="40" stroke="black" stroke-width="3" fill="blue" />-->
<!--                        </svg>-->

<!--                        <svg x="200" y="100"  width="200" height="200">-->
<!--                             xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">-->
                     <g>
<!--                            <image :xlink:href="elementImageUrl"  x="200" y="200" height="200px" width="200px">-->
                                <image :xlink:href="elementImageUrl"
                                :x="element.x"
                               :y="element.y"
                              :width="element.width"
                              :height="element.height"

                                    >
                         :style="getElementStyles(element)"
<!--                                                           -->

<!--                               :style="getElementStyles(element)"-->
                         <!--:y="element.y"-->
                         <!--:width="element.width"-->
                         <!--:height="element.height"                               -->

<!--                                   { "background-size": 20px 30px}-->

<!--                                    :style="getElementStyles(element)"-->
                                    <!--                                     <circle style="stroke: #000000; fill:#00ff00;" />-->

<!--                                   <animateTransform attributeName="transform"-->
<!--                                              attributeType="XML"-->
<!--                                              type="rotate"-->
<!--                                              from="0 260 270"-->
<!--                                              to="360 260 270"-->
<!--                                              dur="4s"-->
<!--                                              repeatCount="indefinite"/>-->
                            </image>

                            <svg>

                            </svg>


                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 width="1024px" height="768px" enable-background="new 0 0 100 100" xml:space="preserve">
                              <g transform="translate(100, 100)">
                                 <rect fill="#FE9FFF" width="100px" height="100px">
                                     <animateTransform attributeName="transform" type="rotate"
                                               from="0 50 50" to="360 50 50" dur="20s" repeatDur="indefinite"/>
                                 </rect>
                              </g>
                            </svg>


               </g>

<!--                        </svg>-->



<!--                        <div class="preview-crop" v-if="element.fill_mode === 'crop'">-->

<!--                            <crop-image-preview :src="element.content.src"-->
<!--                                                :image-size="{width: element.content.width, height: element.content.height}"-->
<!--                                                :crop-data="element.crop_data"-->
<!--                                                :width="element.width * element.scaleX"-->
<!--                                                :height="element.height * element.scaleY"-->
<!--                            ></crop-image-preview>-->


<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
        </SvgTransform>

       </svg>


</template>

<script src="./image-svg-player.js"></script>

<style scoped lang="scss" src="./image-svg-player.scss"></style>
