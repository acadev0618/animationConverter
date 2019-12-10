<template>
    <div class="component-lottie-text-toolbar">
        <header class="toolbar__header">
            <div class="header__name">TEXT</div>
        </header>
        <div class="toolbar__body">
            <div class="text-layer--list">
                <div v-for="item in textLayers" class="list__item">
                    <section class="text">
                        <textarea type="text" v-model="item.text" v-on:input="layerChange(item)" v-on:change="$emit('onChangeStop')"></textarea>
                    </section>
                    <section class="font-size">
                        <header class="section__header">
                            <div class="d-flex align-items-center">
                                <div class="slider-col flex-grow-1 pr-2">
                                    <div class="section__name">Size</div>
                                </div>
                                <div class="value-col">
                                    <input type="number" v-model="item.fontSize" v-on:input="layerChange(item)"  v-on:change="$emit('onChangeStop')"/>
                                </div>
                            </div>
                        </header>
                        <div class="d-flex align-items-center">
                            <range-slider class="toolbar-slider" min="0" max="150" v-model="item.fontSize" v-on:input="layerChange(item)" v-on:change="$emit('onChangeStop')"></range-slider>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./lottie-text-toolbar.js"></script>

<style scoped lang="scss" src="./lottie-text-toolbar.scss"></style>
