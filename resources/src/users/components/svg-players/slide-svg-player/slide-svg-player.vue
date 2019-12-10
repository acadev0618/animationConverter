<template>
<!--    <div class="component-slide-player" :class="{animated: animated}" v-if="this.visible">-->
<!--        <AnimationMaker v-if="animation" :animation="animation" @renderKeyframe="animationMade"></AnimationMaker>-->
<!--        <div class="animation&#45;&#45;wrap" :style="animationStyle">-->

<!--    <svg xmlns="http://www.w3.org/2000/svg" version="1.1"-->
<!--         width="100%" height="100%"-->
<!--         viewBox="0 0 1024 768"-->
<!--         preserveAspectRatio="xMidYMid meet">-->


            <div class="work-space"  ref="workspace">





                <svg  background-size="contain" class="work-space"

                      version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">

                    <image  :xlink:href="backImageUrl" x="0" y="0"  height="100%" width="100%"/>
<!--                    <text x="30" y="145" fill="red"  style="font-size:170%;">url: {{backImageUrl}}</text>-->

<!--                </svg>-->

<!--            <svg >-->
<!--                <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />-->
<!--                <h1> i am image </h1>-->
<!--            </svg>-->


<!--                <VideoPlayer v-if="slide.backgroundVideo"-->
<!--                             :element="slide.backgroundVideo"-->
<!--                             :controlState="state"-->
<!--                             :controlActive="activeSlide"-->
<!--                             :controlSeek="timer.timeSeek()"-->
<!--                             :control-volume="controlVolume"-->
<!--                ></VideoPlayer>-->
               <g>
                <template v-for="element in slide.elements">



<!--                    v-if="element.type === 'image' && element.visible"-->
                    <ImagePlayer
                     v-if="element.type === 'image' && element.visible"
                        :element="element"
                        :offsetX="offsetX"
                        :offsetY="offsetY"
                        :controlState="state"
                        :controlActive="activeSlide"
                        :controlSeek="timer.timeSeek()"
                        @click="elementClick(element)"
                    ></ImagePlayer>
<!--                    <TextPlayer-->
<!--                        v-if="element.type === 'text' && element.visible"-->
<!--                        :element="element"-->
<!--                        :offsetX="offsetX"-->
<!--                        :offsetY="offsetY"-->
<!--                        :controlState="state"-->
<!--                        :controlActive="activeSlide"-->
<!--                        :controlSeek="timer.timeSeek()"-->
<!--                        @click="elementClick(element)"-->
<!--                    ></TextPlayer>-->
<!--                    <ShapePlayer-->
<!--                        v-if="element.type === 'shape' && element.visible"-->
<!--                        :element="element"-->
<!--                        :offsetX="offsetX"-->
<!--                        :offsetY="offsetY"-->
<!--                        :controlState="state"-->
<!--                        :controlActive="activeSlide"-->
<!--                        :controlSeek="timer.timeSeek()"-->
<!--                        @click="elementClick(element)"-->
<!--                    ></ShapePlayer>-->
<!--                    <LottiePlayer-->
<!--                        v-if="element.type === 'lottie' && element.visible"-->
<!--                        :element="element"-->
<!--                        :offsetX="offsetX"-->
<!--                        :offsetY="offsetY"-->
<!--                        :controlState="state"-->
<!--                        :controlActive="activeSlide"-->
<!--                        :controlSeek="timer.timeSeek()"-->
<!--                        @click="elementClick(element)"-->
<!--                    ></LottiePlayer>-->



                </template>
              </g>
           </svg>

<!--         </div>-->
<!--       </div>-->
    </div>
</template>


<script src="./slide-svg-player.js"></script>

<style scoped lang="scss" src="./slide-svg-player.scss"></style>
