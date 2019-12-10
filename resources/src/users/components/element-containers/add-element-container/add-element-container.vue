<template>
    <div class="add-element-container">
        <h2 class="element--name">Add Element</h2>
        <ul class="nav nav-tabs" id="element__nav" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#element__graphics" role="tab">Graphics</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#element__shapes" role="tab">Shapes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#element__lines" role="tab">Line</a>
            </li>
        </ul>
        <div class="tab-content" id="element__content">
            <div class="tab-pane fade show active" id="element__graphics" role="tabpanel">
                <div class="graphic__category">
                    <v-select :searchable="false" :clearable="false" :options="graphicCategoryOptions" class="app--select sidebar-select" v-model="graphicCategory">
                    </v-select>
                </div>
                <div class="graphic__list app-scrollbar">
                    <div v-for="element in graphicElements" class="list__item" @click="addElement(element)">
                        <div class="item--inner">
                            <img :src="element.thumb_url" alt="Project Resources" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="element__shapes" role="tabpanel">
                <div class="shape__list app-scrollbar">
                    <div v-for="element in shapeElements" class="list__item" @click="addElement(element)">
                        <div class="item--inner flex-center">
                            <img :src="element.thumb_url" alt="Project Resources" class="card-img-top">
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="element__lines" role="tabpanel">
                <div class="line__list app-scrollbar">
                    <div v-for="element in lineElements" class="list__item" @click="addElement(element)">
                        <div class="item--inner flex-center">
                            <img :src="element.thumb_url" alt="Project Resources" class="card-img-top">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./add-element-container.js"></script>
<style scoped lang="scss" src="./add-element-container.scss"></style>
