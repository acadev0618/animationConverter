<template>
    <div class="component-lottie-asset-toolbar">
        <header class="toolbar__header">
            <div class="header__name">ASSET</div>
        </header>
        <div class="toolbar__body">
            <div class="asset--list">
                <div v-for="asset in assets" class="list__item">
                    <section class="path-input">
                        <div class="section__name">URL</div>
                        <div>
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="flex-grow-1 mr-2">
                                    <input type="text" v-model="asset.path" />
                                </div>
                                <div class="check-icon" @click="assetChange(asset)">
                                    <svg enable-background="new 0 0 515.556 515.556" height="14" viewBox="0 0 515.556 515.556" xmlns="http://www.w3.org/2000/svg"><path d="m0 274.226 176.549 176.886 339.007-338.672-48.67-47.997-290.337 290-128.553-128.552z"/></svg>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="select-from">
                        <div class="section-from__helper" @click="selectFromSidebar(asset)">
                            Select From Left Sidebar
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./lottie-asset-toolbar.js"></script>

<style scoped lang="scss" src="./lottie-asset-toolbar.scss"></style>
