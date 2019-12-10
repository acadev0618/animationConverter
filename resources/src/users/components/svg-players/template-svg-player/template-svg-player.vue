<template>
    <div class="component-template-player" :style="{height: previewHeight + 'px'}">
        <div class="scale-helper" :style="scaleHelper">
            <div class="work-space">
<!--                <SlideSvgPlayer v-for="(activeSlide, index) in activeSlides"-->
<!--                             :slide="activeSlide.slide"-->
<!--                             :enterAnimation="activeSlide.enterAnimation"-->
<!--                             @nextEnter="nextEnter($event, activeSlide.index)"-->
<!--                             @afterLeave="afterLeave(index)"-->
<!--                             :key="'slide_player_' + activeSlide.slide.id"-->
<!--                             :controlState="state"-->
<!--                             :controlSeek="activeSlide.controlSeek"-->
<!--                             :controlVolume="controlVolume"-->
<!--                             v-on:element_click="onElementClick($event, activeSlide.slide)"-->
<!--                ></SlideSvgPlayer>-->


                <SlideSvgPlayer v-for="(activeSlide, index) in activeSlides"
                                :slide="activeSlide.slide"
                                :enterAnimation="activeSlide.enterAnimation"
                                @nextEnter="nextEnter($event, activeSlide.index)"
                                @afterLeave="afterLeave(index)"
                                :key="'slide_player_' + activeSlide.slide.id"
                                 :controlSeek="activeSlide.controlSeek"
                                :controlState="state"
                                :controlVolume="controlVolume"
                                v-on:element_click="onElementClick($event, activeSlide.slide)"
                ></SlideSvgPlayer>


                <AudioPlayer v-if="template.sound" :element="template.sound" style="display: none;" :controlState="state" :controlVolume="controlVolume"></AudioPlayer>








                <!--                <AudioPlayer v-if="template.sound" :element="template.sound" style="display: none;" :controlState="state" :controlVolume="controlVolume"></AudioPlayer>-->

<!--                <svg width="800" height="800" >-->
<!--                    <g v-if="backimgs">-->
<!--                        <image v-for="item in  backimgs" :xlink:href="item" x="0" y="0"  height="800px" width="800px"/>-->
<!--                        <h1>ghgh</h1>-->
<!--                    </g>-->
<!--                </svg>-->


<!--                <svg width="800" height="800" >-->
<!--                    <g v-if="ubuildings">-->
<!--                        <rect v-for="item in ubuildings" :x="item.px" :y="item.py" :width="item.w" :height="item.h" :style="{fill: item.bgColor}" />-->
<!--                    </g>-->
<!--                </svg>-->

            </div>
        </div>
    </div>
</template>


<script src="./template-svg-player.js"></script>

<style scoped lang="scss" src="./template-svg-player.scss"></style>




