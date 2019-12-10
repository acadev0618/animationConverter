<template>
    <div class="video-element-container">
        <div class="select-category-pan">
            <div class="category-item" v-bind:class="{selected: selectedCategory == 'background'}" v-on:click="selectedCategory = 'background'">
                <div class="layout-inner">
                    <i class="fa fa-2x fa-layer-group"></i>
                    <div class="category-name">Background</div>
                </div>
            </div>
            <div class="category-item" v-bind:class="{selected: selectedCategory == 'text'}" v-on:click="selectedCategory = 'text'">
                <div class="layout-inner">
                    <i class="fa fa-2x fa-font"></i>
                    <div class="category-name">Add Text</div>
                </div>
            </div>
            <div class="category-item" v-bind:class="{selected: selectedCategory == 'image'}" v-on:click="selectedCategory = 'image'">
                <div class="layout-inner">
                    <i class="fa fa-2x fa-image"></i>
                    <div class="category-name">Add Image</div>
                </div>
            </div>
            <div class="category-item" v-bind:class="{selected: selectedCategory == 'element'}" v-on:click="selectedCategory = 'element'">
                <div class="layout-inner">
                    <i class="fa fa-2x fa-draw-polygon"></i>
                    <div class="category-name">Add <br>Element</div>
                </div>
            </div>
            <div class="category-item" v-bind:class="{selected: selectedCategory == 'music'}" v-on:click="selectedCategory = 'music'">
                <div class="layout-inner">
                    <i class="fa fa-2x fa-music"></i>
                    <div class="category-name">Music</div>
                </div>
            </div>
            <div class="category-item" v-bind:class="{selected: selectedCategory == 'my_file'}" v-on:click="selectedCategory = 'my_file'">
                <div class="layout-inner">
                    <i class="fa fa-2x fa-upload"></i>
                    <div class="category-name">My File</div>
                </div>
            </div>
        </div>
        <div class="category-pan">
            <add-element-container v-if="selectedCategory === 'element'"></add-element-container>
            <background-element-container v-if="selectedCategory === 'background'"></background-element-container>
            <image-element-container v-if="selectedCategory === 'image'"></image-element-container>
            <text-element-container v-if="selectedCategory === 'text'"></text-element-container>
            <music-element-container v-if="selectedCategory === 'music'"></music-element-container>
            <my-file-element-container v-if="selectedCategory === 'my_file'"></my-file-element-container>
        </div>
    </div>
</template>

<script>
    import AddElementContainer from './element-containers/add-element-container/add-element-container.vue';
    import BackgroundElementContainer from './element-containers/background-element-container/background-element-container.vue';
    import ImageElementContainer from './element-containers/image-element-container/image-element-container.vue';
    import TextElementContainer from './element-containers/text-element-container/text-element-container.vue';
    import MusicElementContainer from './element-containers/music-element-container/music-element-container.vue';
    import MyFileElementContainer from './element-containers/my-file-element-container/my-file-element-container.vue';
    import vSelect from 'vue-select'
    import Vue from 'vue';
    Vue.component('v-select', vSelect);
    export default {
        name: "video-element-container",
        data: function () {
            // this.$store.dispatch('graphic/load_texture');
            this.$store.dispatch('graphic/load_pattern');
            this.$store.dispatch('image/load_my_image');
            return {
                selectedCategory: 'background'
            }
        },
        computed: {
            controlCategory() {
                return this.$store.state.editor.sidebar.controlCategory;
            }
        },
        watch: {
            controlCategory(nv, ov) {
                if (nv) {
                    this.selectedCategory = nv;
                }
            }
        },
        components: {
            AddElementContainer,
            BackgroundElementContainer,
            ImageElementContainer,
            TextElementContainer,
            MusicElementContainer,
            MyFileElementContainer,
        }
    }
</script>

<style scoped lang="scss">
    .video-element-container{
        height: 100%;
        display: flex;

        --color-grey: #9ea0a2;

        .select-category-pan{
            flex-basis: auto;
            flex-grow: 0;
            background-color: #0e1318;
            .category-item {
                width: 85px;
                height: 85px;
                color: #9d9fa1;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                cursor: pointer;
                &:hover{
                    color: white;
                }
                &.selected {
                    background-color: #1a2533;
                    color: white;
                }
            }
        }
        .category-pan{
            height: 100%;
            overflow: auto;
            flex-grow: 1;
            background-color: #172432;
            color: white;
            padding: 15px 10px;
        }
    }
</style>
<style lang="scss">
    .v-select.app--select.sidebar-select {
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
        font-size: 12px;
        .vs__dropdown-toggle{
            padding: 1px 0px;
            border-radius: 1px;
            border: none;
            .vs__selected-options{
                .vs__selected{
                    margin-top: 0px;
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.8);
                    font-weight: 500;
                }
            }
            .vs__actions{
                .vs__open-indicator{
                    display: block;
                    width: 25px;
                    height: 25px;
                    position: relative;
                    &:before{
                        content: '';
                        display: block;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 5px solid rgba(255, 255, 255, 0.7);
                        height: 0;
                        width: 0;
                        line-height: 28px;
                        margin-left: 8px;
                        margin-top: 10px;
                        position: absolute;
                        vertical-align: middle;
                    }
                }
            }
        }
        .vs__dropdown-menu {
            top: calc(100% + 5px);
            min-width: 0px;
            background-color: #434759;
            li{
                padding: 0px 10px;
                font-size: 12px;
                color: #2e3246;
                height: 28px;
                align-items: center;
                display: flex;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
                span {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 28px;
                    background-repeat: no-repeat;
                    background-size: auto 14px;
                    background-position: 10px center;
                }
                &:hover{
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
        }
        &.vs--open{
            .vs__dropdown-toggle{
                .vs__selected{
                    position: relative;
                }
            }
        }
        &:hover{
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
    .app-scrollbar{
        &::-webkit-scrollbar-thumb{
            background-color: rgba(255, 255, 255, 0.4);
            //-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
        }
    }
</style>
