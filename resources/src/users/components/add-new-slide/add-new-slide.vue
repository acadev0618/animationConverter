<template>
    <div class="component-add-new-slide">
        <div class="modal__backdrop" @click="$emit('click_close')"></div>
        <div class="modal__content">
            <h2 class="content__title">Add New Slide</h2>
            <div class="content__filter">
                <div class="row">
                    <div class="col-auto">
                        <div class="dropdown app__checkbox-dropdown">
                            <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                            </button>
                            <div class="dropdown-menu">
                                <div class="dropdown-item" v-for="(category, key) in categories" @click="$event.stopPropagation();">
                                    <input class="styled-checkbox" :id="'category-checkbox-' + category.value" type="checkbox" :value="category.value" v-model="filter.category" />
                                    <label :for="'category-checkbox-' + category.value">{{ category.label }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="dropdown app__checkbox-dropdown">
                            <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Design Type
                            </button>
                            <div class="dropdown-menu">
                                <div class="dropdown-item" v-for="item in designTypes" @click="$event.stopPropagation();">
                                    <input class="styled-checkbox" :id="'design-checkbox-' + item.value" type="checkbox" :value="item.value" v-model="filter.design_type" />
                                    <label :for="'design-checkbox-' + item.value">{{ item.label }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto mr-auto">
                        <div class="dropdown app__checkbox-dropdown">
                            <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Size
                            </button>
                            <div class="dropdown-menu">
                                <div class="dropdown-item" @click="$event.stopPropagation();">
                                    <input class="styled-checkbox" :id="'size-checkbox-same'" type="radio" value="same" v-model="size" />
                                    <label :for="'size-checkbox-same'">Same</label>
                                </div>
                                <div class="dropdown-item" @click="$event.stopPropagation();">
                                    <input class="styled-checkbox" :id="'size-checkbox-all'" type="radio" value="all" v-model="size" />
                                    <label :for="'size-checkbox-all'">All</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <input type="text" class="form-control" v-model="filter.q" placeholder="Search by Name"/>
                    </div>
                </div>
            </div>
            <div class="content__body">
                <div class="row">
                    <div class="col">
                        <div class="slide--list">
                            <div class="list__item item--blank" @click="addSlide(slideBoxes[0].items[0])" :key="'box0_slide_-1'">
                                <div class="plus-icon">
                                    <svg width="50px" height="50px" viewBox="0 0 40 40"><g stroke="none" stroke-width="1" fill-rule="evenodd" fill-opacity="0.8"><g transform="translate(-310.000000, -260.000000)"><g transform="translate(-481.000000, 57.000000)"><g transform="translate(741.000000, 163.000000)"><g><g><path d="M71,58 L71,40 L68,40 L68,58 L50,58 L50,61 L68,61 L68,80 L71,80 L71,61 L90,61L90,58 L71,58 Z"></path></g></g></g></g></g></g></svg>
                                </div>
                                <div class="add-blank-text">Add Blank slide</div>
                            </div>
                            <div class="list__item" v-for="(item, index) in slideBoxes[0].items.slice(1)" @click="addSlide(item.data_json)" :key="'box0_slide_' + index">
                                <div class="item__preview--wrap">
                                    <SlidePreview :slide="item" />
                                </div>
                                <footer class="item__footer">
                                    <div class="item__name">{{item.name}} - {{item.aspect}}(Version 1)</div>
                                    <div class="item__aside">
                                        <div class="d-flex align-items-center">
                                            <div class="mr-auto">
                                                <div>Julet_us</div>
                                            </div>
                                            <div>
                                                {{durationFormat(item.duration)}}
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="slide--list">
                            <div class="list__item" v-for="(item, index) in slideBoxes[1].items" @click="addSlide(item.data_json)" :key="'box1_slide_' + index">
                                <div class="item__preview--wrap">
                                    <SlidePreview :slide="item.data_json" />
                                </div>
                                <footer class="item__footer">
                                    <div class="item__name">{{item.name}} - {{item.aspect}}(Version 1)</div>
                                    <div class="item__aside">
                                        <div class="d-flex align-items-center">
                                            <div class="mr-auto">
                                                <div>Julet_us</div>
                                            </div>
                                            <div>
                                                {{durationFormat(item.duration)}}
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="slide--list">
                            <div class="list__item" v-for="(item, index) in slideBoxes[2].items" @click="addSlide(item.data_json)" :key="'box2_slide_' + index">
                                <div class="item__preview--wrap">
                                    <SlidePreview :slide="item.data_json" />
                                </div>
                                <footer class="item__footer">
                                    <div class="item__name">Runner - Square(Version 1)</div>
                                    <div class="item__aside">
                                        <div class="d-flex align-items-center">
                                            <div class="mr-auto">
                                                <div>Julet_us</div>
                                            </div>
                                            <div>
                                                {{durationFormat(item.duration)}}
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="slide--list">
                            <div class="list__item" v-for="(item, index) in slideBoxes[3].items" @click="addSlide(item.data_json)" :key="'box1_slide_' + index">
                                <div class="item__preview--wrap">
                                    <SlidePreview :slide="item.data_json" />
                                </div>
                                <footer class="item__footer">
                                    <div class="item__name">{{item.name}} - {{item.aspect}}(Version 1)</div>
                                    <div class="item__aside">
                                        <div class="d-flex align-items-center">
                                            <div class="mr-auto">
                                                <div>Julet_us</div>
                                            </div>
                                            <div>
                                                {{durationFormat(item.duration)}}
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="slide--list">
                            <div class="list__item" v-for="(item, index) in slideBoxes[4].items" @click="addSlide(item.data_json)" :key="'box1_slide_' + index">
                                <div class="item__preview--wrap">
                                    <SlidePreview :slide="item.data_json" />
                                </div>
                                <footer class="item__footer">
                                    <div class="item__name">{{item.name}} - {{item.aspect}}(Version 1)</div>
                                    <div class="item__aside">
                                        <div class="d-flex align-items-center">
                                            <div class="mr-auto">
                                                <div>Julet_us</div>
                                            </div>
                                            <div>
                                                {{durationFormat(item.duration)}}
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./add-new-slide.js"></script>

<style scoped lang="scss" src="./add-new-slide.scss"></style>
