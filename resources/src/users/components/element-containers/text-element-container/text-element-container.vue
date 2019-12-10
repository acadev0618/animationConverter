<template>
    <div class="text__element--container">
        <h2 class="element--name">Add Text</h2>
        <ul class="nav nav-tabs" id="text__nav" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#pane__custom-text" role="tab">Custom Text</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#pane__static-text" role="tab">Static Text</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#pane__animated-text" role="tab">Animated Text</a>
            </li>
        </ul>
        <div class="tab-content pt-2" id="text__tab-content">
            <div class="tab-pane fade show active" id="pane__custom-text" role="tabpanel">
                <div class="pane__helper">
                    Click text to add to page
                </div>
                <div class="pane__body">
                    <div v-for="item in customText" :style="item.style" @click="addCustom(item)">
                        <div>{{item.text}}</div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pane__static-text" role="tabpanel">
                <div class="pane__helper">Click text to add to page</div>
                <div class="pane__body">
                    <div class="static-text--list">
                        <div v-for="item in staticText" class="static-text__item" @click="addStatic(item)">
                            <div class="item--inner">
                                <img alt="presentation" :src="item.previewImage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="pane__animated-text" role="tabpanel">
                <div class="pane__helper">Click text to add to page</div>
                <div class="pane__body">
                    <div class="animated-text--list">
                        <div class="animated-text__item" v-for="item in animatedText" @click="addBodymovinText(item)">
                            <div class="item--inner" style="height: 100px">
                                <lottie :options="getLottieOption(item.json)"></lottie>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./text-element-container.js"></script>
<style scoped lang="scss" src="./text-element-container.scss"></style>
