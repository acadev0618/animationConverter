<template>
    <div class="video-editor-layers">
        <div class="group-layers-wrap mb-2">
            <div class="row justify-content-between align-items-center m-0">
                <div class="col-auto p-0">
                    <button class="btn group-btn active">Group</button>
                </div>
                <div class="col-auto p-0">
                    <button class="btn group-btn">Ungroup</button>
                </div>
                <div class="col-auto p-0">
                    <div class="layers-txt-wrap">
                        <i class="fa fa-layer-group"></i>&nbsp;&nbsp;LAYERS
                    </div>
                </div>
            </div>
        </div>
        <div class="slide-nav-wrap mb-2">
            <div class="row m-0 align-items-center justify-content-between">
                <div class="col-auto p-0">
                    <div class="slide-txt">
                        {{slide_store.name}}
                    </div>
                </div>
                <div class="col-auto p-0">
                    <div class="nav-actions d-flex">
                        <button class="slide-nav-action mr-2" :disabled="!canBackward" @click="slideBackward">
                            <i class="fa fa-arrow-left"></i>
                        </button>
                        <button class="slide-nav-action" :disabled="!canForward" @click="slideForward">
                            <i class="fa fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="layer-list">
            <draggable v-bind="dragOptions" v-model="elements">
                <div v-for="element in elements" class="layer-item" :class="{selected: element.selected, disabled: !element.visible}" @click="setSelected(element)">
                    <div class="row align-items-center m-0">
                        <div class="col-auto pl-0 pr-2">
                            <div class="drag-icon">
                                <svg width="12px" height="12px" viewBox="0 0 12 12" id="grab-icon"><g stroke-width="1" fill-rule="evenodd" id="grab-icon"><path id="grab-icon" d="M0,1 L12,1 L12,3 L0,3 L0,1 Z M0,5 L12,5 L12,7 L0,7 L0,5 Z M0,9 L12,9 L12,11 L0,11 L0,9 Z"></path></g></svg>
                            </div>
                        </div>
                        <div class="col-auto pl-0 pr-2">
                            <div class="layer-type-icon">
                                <svg v-if="element.type === 'text'" width="12px" height="12px" viewBox="0 0 24 24"><defs></defs><g id="Symbols" stroke="none" stroke-width="1"><g id="Toolbar-Text-ON"><path d="M0,2 L0,4 L8,4 L8,22 L10,22 L10,4 L18,4 L18,2 L0,2 Z M24,11 L20,11 L18,11 L14,11 L14,13 L18,13 L18,22 L20,22 L20,13 L24,13 L24,11 Z" id="Combined-Shape"></path></g></g></svg>
                                <svg v-if="element.type === 'image'" width="12px" height="12px" viewBox="0 0 24 24"><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Toolbar-Image-ON"><path d="M6,6 L1.99508929,6 C0.892622799,6 0,6.8932319 0,7.99508929 L0,22.0049107 C0,23.1073772 0.893231902,24 1.99508929,24 L16.0049107,24 C17.1073772,24 18,23.1067681 18,22.0049107 L18,12.9975446 L18,18 L16,18 L16,22 L2,22 L2,8 L6,8 L6,6 Z" id="Combined-Shape"></path><path d="M6,1.99508929 C6,0.893231902 6.8926228,0 7.99508929,0 L22.0049107,0 C23.1067681,0 24,0.892622799 24,1.99508929 L24,16.0049107 C24,17.1067681 23.1073772,18 22.0049107,18 L7.99508929,18 C6.8932319,18 6,17.1073772 6,16.0049107 L6,1.99508929 Z M8,2 L22,2 L22,16 L8,16 L8,2 Z" id="Combined-Shape"></path><polygon id="Fill-3" points="12 10 14 13 17 9 21 14 9 14"></polygon><circle id="Oval" cx="17.5" cy="5.5" r="1.5"></circle></g></g></svg>
                                <svg v-if="element.type === 'shape'" width="12px" height="12px" viewBox="0 0 24 24"><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill-rule="evenodd"><g id="Toolbar-Shape-ON"><path d="M16.5223768,0.130528918 C12.2079155,-0.609939263 7.98640918,1.86135467 6.52,5.98597747 L1.99164257,5.98597747 C0.891688752,5.98597747 0,6.87860027 0,7.98106676 L0,21.9908882 C0,23.0927456 0.892622799,23.9859775 1.99508929,23.9859775 L16.0049107,23.9859775 C17.1067681,23.9859775 18,23.0930703 18,21.9943349 L18,17.4659775 C21.5940912,16.1952751 23.9977627,12.7980859 24,8.98597747 C23.9927713,4.60844199 20.836838,0.870997098 16.5223768,0.130528918 Z M16,21.9859775 L2,21.9859775 L2,7.98597747 L6.06,7.98597747 C5.77552005,10.5304409 6.58821885,13.0756332 8.29464378,14.9843859 C10.0010687,16.8931387 12.4396833,17.9847622 15,17.9859775 C15.3341835,17.9843951 15.6680248,17.9643646 16,17.9259775 L16,21.9859775 L16,21.9859775 Z M15,15.9859775 C11.1340068,15.9859775 8,12.8519707 8,8.98597747 C8,5.11998422 11.1340068,1.98597747 15,1.98597747 C18.8659932,1.98597747 22,5.11998422 22,8.98597747 C22,10.8424929 21.2625021,12.6229703 19.9497475,13.9357249 C18.6369928,15.2484796 16.8565154,15.9859775 15,15.9859775 Z" id="Shape"></path></g></g></svg>
                            </div>
                        </div>
                        <div class="col pl-0 pr-2 min-width-0">
                            <div class="item-text">{{element.label}}</div>
                        </div>
                        <div class="col-auto p-0">
                            <div v-if="element.visible === true" class="visible-action" @click="element.visible = false">
                                <svg width="24px" height="24px" viewBox="0 0 24 24"><g fill-rule="nonzero"><path d="M12,7 C7,7 4,10.6666667 4,12.3333333 C4,14 7,17.6666667 12,17.6666667 C17,17.6666667 20,14 20,12.3333333 C20,10.6666667 17,7 12,7 Z M12,15.8888889 C10.0373333,15.8888889 8.44444444,14.296 8.44444444,12.3333333 C8.44444444,10.3706667 10.0373333,8.77777778 12,8.77777778 C13.9626667,8.77777778 15.5555556,10.3706667 15.5555556,12.3333333 C15.5555556,14.296 13.9626667,15.8888889 12,15.8888889 Z M12,10.5555556 C11.0162963,10.5555556 10.2222222,11.3496296 10.2222222,12.3333333 C10.2222222,13.317037 11.0162963,14.1111111 12,14.1111111 C12.9837037,14.1111111 13.7777778,13.317037 13.7777778,12.3333333 C13.7777778,11.3496296 12.9837037,10.5555556 12,10.5555556 Z"></path></g></svg>
                            </div>
                            <div v-if="element.visible === false" class="visible-action" @click="element.visible = true">
                                <svg width="24px" height="24px" viewBox="0 0 24 24"><g fill-rule="nonzero"><path d="M5.63603897,5.63603897 L5.63603897,5.63603897 C5.24551468,6.02656326 5.24551468,6.65972824 5.63603897,7.05025253 L16.9497475,18.363961 C17.3402718,18.7544853 17.9734367,18.7544853 18.363961,18.363961 L18.363961,18.363961 C18.7544853,17.9734367 18.7544853,17.3402718 18.363961,16.9497475 L7.05025253,5.63603897 C6.65972824,5.24551468 6.02656326,5.24551468 5.63603897,5.63603897 Z M12,7 C7,7 4,10.6666667 4,12.3333333 C4,14 7,17.6666667 12,17.6666667 C17,17.6666667 20,14 20,12.3333333 C20,10.6666667 17,7 12,7 Z M12,15.8888889 C10.0373333,15.8888889 8.44444444,14.296 8.44444444,12.3333333 C8.44444444,10.3706667 10.0373333,8.77777778 12,8.77777778 C13.9626667,8.77777778 15.5555556,10.3706667 15.5555556,12.3333333 C15.5555556,14.296 13.9626667,15.8888889 12,15.8888889 Z M12,10.5555556 C11.0162963,10.5555556 10.2222222,11.3496296 10.2222222,12.3333333 C10.2222222,13.317037 11.0162963,14.1111111 12,14.1111111 C12.9837037,14.1111111 13.7777778,13.317037 13.7777778,12.3333333 C13.7777778,11.3496296 12.9837037,10.5555556 12,10.5555556 Z"></path></g></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script src="./video-editor-layers.js"></script>

<style scoped lang="scss" src="./video-editor-layers.scss"></style>
