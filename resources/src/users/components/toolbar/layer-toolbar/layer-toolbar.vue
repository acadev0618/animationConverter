<template>
    <div class="component-layer-toolbar">
        <header class="toolbar__header">
            <div class="toolbar__name">LAYER</div>
        </header>
        <div class="toolbar__body">
            <section class="layer-align">
                <div class="section__name">Align</div>
                <div class="section__body">
                    <div class="align--list">
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="list__item" @click="alignLeft">
                                <svg viewBox="0 0 24 24"><g fill-rule="evenodd" transform="translate(4 4)"><path d="M0,16 L2,16 L2,0 L0,0 L0,16 Z M4,10.5089948 C4,10.7801695 4.22900057,11 4.50034732,11 L15.4996527,11 C15.7759869,11 16,10.7721195 16,10.5089948 L16,5.49100518 C16,5.21983051 15.7709994,5 15.4996527,5 L4.50034732,5 C4.22401312,5 4,5.22788048 4,5.49100518 L4,10.5089948 Z"></path></g></svg>
                            </div>
                            <div class="list__item" @click="alignHCenter">
                                <svg viewBox="0 0 24 24"><g fill-rule="evenodd"><path d="M11,7 L11,4 L13,4 L13,7 L11,7 Z M11,20 L11,17 L13,17 L13,20 L11,20 Z M4,14.5089948 L4,9.49100518 C4,9.22788048 4.22224281,9 4.4963932,9 L19.5036068,9 C19.773819,9 20,9.21983051 20,9.49100518 L20,14.5089948 C20,14.7721195 19.7777572,15 19.5036068,15 L4.4963932,15 C4.22618103,15 4,14.7801695 4,14.5089948 Z"></path></g></svg>
                            </div>
                            <div class="list__item" @click="alignRight">
                                <svg viewBox="0 0 24 24"><g fill-rule="evenodd"><path d="M18,20 L20,20 L20,4 L18,4 L18,20 Z M4,14.5089948 C4,14.7801695 4.22900057,15 4.50034732,15 L15.4996527,15 C15.7759869,15 16,14.7721195 16,14.5089948 L16,9.49100518 C16,9.21983051 15.7709994,9 15.4996527,9 L4.50034732,9 C4.22401312,9 4,9.22788048 4,9.49100518 L4,14.5089948 Z"></path></g></svg>
                            </div>
                            <div class="list__item" @click="alignTop">
                                <svg viewBox="0 0 24 24"><g fill-rule="evenodd"><path d="M4,6 L20,6 L20,4 L4,4 L4,6 Z M9,19.4996527 C9,19.7759869 9.22788048,20 9.49100518,20 L14.5089948,20 C14.7801695,20 15,19.7709994 15,19.4996527 L15,8.50034732 C15,8.22401312 14.7721195,8 14.5089948,8 L9.49100518,8 C9.21983051,8 9,8.22900057 9,8.50034732 L9,19.4996527 Z"></path></g></svg>
                            </div>
                            <div class="list__item" @click="alignVCenter">
                                <svg viewBox="0 0 24 24"><g fill-rule="evenodd"><path d="M17,13 L17,11 L20,11 L20,13 L17,13 Z M4,13 L4,11 L7,11 L7,13 L4,13 Z M9,19.5036068 L9,4.4963932 C9,4.22618103 9.21983051,4 9.49100518,4 L14.5089948,4 C14.7721195,4 15,4.22224281 15,4.4963932 L15,19.5036068 C15,19.773819 14.7801695,20 14.5089948,20 L9.49100518,20 C9.22788048,20 9,19.7777572 9,19.5036068 Z"></path></g></svg>
                            </div>
                            <div class="list__item" @click="alignBottom">
                                <svg viewBox="0 0 24 24"><g fill-rule="evenodd"><path d="M4,20 L20,20 L20,18 L4,18 L4,20 Z M9,15.4996527 C9,15.7759869 9.22788048,16 9.49100518,16 L14.5089948,16 C14.7801695,16 15,15.7709994 15,15.4996527 L15,4.50034732 C15,4.22401312 14.7721195,4 14.5089948,4 L9.49100518,4 C9.21983051,4 9,4.22900057 9,4.50034732 L9,15.4996527 Z"></path></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="layer-order">
                <div class="section__name">Layer order</div>
                <div class="section__body">
                    <div class="order--list">
                        <div class="d-flex align-items-center">
                            <div class="list__item" :class="{disabled: !isOrderDownAvailable()}" @click="isOrderDownAvailable() && orderDown()">
                                <svg viewBox="0 0 18 18"><polygon points="2.75 5 9 13.04 15.25 5 2.75 5"></polygon></svg>
                            </div>
                            <div class="list__item" :class="{disabled: !isOrderUpAvailable()}" @click="isOrderUpAvailable() && orderUp()">
                                <svg class="moveUp-svg" viewBox="0 0 18 18"><polygon points="15.25 13 9 4.96 2.75 13 15.25 13"></polygon></svg>
                            </div>
                            <div class="list__item" :class="{disabled: !isOrderDownAvailable()}" @click="isOrderDownAvailable() && orderBottom()">
                                <svg viewBox="0 0 18 18"><rect y="16" width="18" height="2"></rect><polygon points="2.75 5 9 13.04 15.25 5 2.75 5"></polygon></svg>
                            </div>
                            <div class="list__item" :class="{disabled: !isOrderUpAvailable()}" @click="isOrderUpAvailable() && orderTop()">
                                <svg class="moveToFront-svg" viewBox="0 0 18 18"><rect width="18" height="2"></rect><polygon points="15.25 13 9 4.96 2.75 13 15.25 13"></polygon></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="show-on">
                <PrettyCheck class="p-svg p-curve" color="primary" v-model="showOnAllSlide">
                    <!-- svg path -->
                    <svg slot="extra" class="svg svg-icon" viewBox="0 0 20 20">
                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
                              style="stroke: white;fill:white"></path>
                    </svg>
                    Show on all slides
                </PrettyCheck>
            </section>
        </div>
    </div>
</template>

<script src="./layer-toolbar.js"></script>

<style scoped lang="scss" src="./layer-toolbar.scss"></style>
