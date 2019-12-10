<template>
    <div class="component-variation-selector app-modal" ref="modal-ref" @click="checkClose">
        <div class="modal__dialog" :style="{width: '900px'}">
            <div class="modal__content" ref="modalContent">
                <div class="modal__header">
                    <h5 class="modal__title mr-auto">SELECT VARIATION</h5>
                    <button type="button" class="close" @click="$event.stopPropagation(); onHidden();">
                        <span>×</span>
                    </button>
                </div>
                <div class="modal__body">
                    <div class="variation__list">
                        <div class="list__item custom-create">
                            <div class="item__card">
                                <div class="card__content">
                                    <div class="d-flex align-items-center justify-content-between mb-2">
                                        <input class="size__item mr-1" type="text" placeholder="Width" maxlength="6" v-model="custom.width" style="width: 48px; height: 28px;">
                                        <span class="x mr-1">x</span>
                                        <input class="size__item" type="text" placeholder="Height" maxlength="6" v-model="custom.height" style="width: 48px; height: 28px;">
                                    </div>
                                    <button class="btn btn-block btn-create" :disabled="!(custom.width * custom.height)" @click="createCustom">Create</button>
                                </div>
                            </div>
                            <div class="item__text">
                                <div class="item__design">Custom</div>
                            </div>
                        </div>
                        <div v-for="item in items" class="list__item">
                            <div class="item__card" @click="selectVariation(item)">
                                <div class="card__content" :style="{width: item.width * 100 / 2000 + '%', height: item.height * 100 / 2000 + '%'}">
                                    <img :src="item.thumb" style="width: 100%; height: 100%; object-fit: fill;"/>
                                </div>
                            </div>
                            <div class="item__text">
                                <div class="item__design">{{item.design}}</div>
                                <div class="item__size">{{item.width}} x {{item.height}} px</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./variation-selector.js"></script>

<style scoped lang="scss" src="./variation-selector.scss"></style>
