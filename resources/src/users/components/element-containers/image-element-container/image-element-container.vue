<template>
    <div class="image-element-container">
        <h2 class="element--name">Add Image</h2>
        <ul class="nav nav-tabs" id="image__nav" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#image__stock-photos" role="tab">Stock Photos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#image__my-images" role="tab">My Images</a>
            </li>
        </ul>
        <div class="tab-content" id="image__content">
            <div class="tab-pane fade show active" id="image__stock-photos" role="tabpanel">
                <div class="search-wrap d-flex">
                    <div class="search__find flex-center">
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><defs></defs><g stroke="none" stroke-width="1" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M15.5,14 L14.71,14 L14.43,13.73 C15.41,12.59 16,11.11 16,9.5 C16,5.91 13.09,3 9.5,3 C5.91,3 3,5.91 3,9.5 C3,13.09 5.91,16 9.5,16 C11.11,16 12.59,15.41 13.73,14.43 L14,14.71 L14,15.5 L19,20.49 L20.49,19 L15.5,14 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 Z"></path></g></g></svg>
                    </div>
                    <div class="search__input--wrap">
                        <input type="text" class="search__input flex-grow-1" placeholder="Search images..."  v-on:keyup.enter="searchStockImage($event.target.value)"/>
                    </div>
                    <div class="search__clear flex-center">
                        <svg width="15px" height="15px" viewBox="0 0 18 18"><polygon points="17.71 1.71 16.29 0.29 9 7.59 1.71 0.29 0.29 1.71 7.59 9 0.29 16.29 1.71 17.71 9 10.41 16.29 17.71 17.71 16.29 10.41 9 17.71 1.71"></polygon></svg>
                    </div>
                </div>
                <div class="stock-photo--wrap app-scrollbar" v-on:scroll="onStockPhotoScroll">
                    <div class="stock-photo--list">
                        <div class="list__column column--1">
                            <div v-for="item in stock.boxes[0].items" class="stock-photo__item">
                                <img @click="addStock(item)"
                                     v-bind:src="item.previewURL"
                                     alt="" />
                            </div>
                        </div>
                        <div class="list__column column--2">
                            <div v-for="item in stock.boxes[1].items" class="stock-photo__item">
                                <img @click="addStock(item)"
                                     v-bind:src="item.previewURL"
                                     alt="" />
                            </div>
                        </div>
                        <div class="list__column column--3">
                            <div v-for="item in stock.boxes[2].items" class="stock-photo__item">
                                <img @click="addStock(item)"
                                     v-bind:src="item.previewURL"
                                     alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="app-loading--wrap">
                        <loading :active.sync="stock.isLoading"
                                 :is-full-page="false"></loading>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="image__my-images" role="tabpanel">
                <div class="upload-section">
                    <div>
                        <div class="upload__image">
                            <svg viewBox="0 0 24 24" width="24px"><path d="M19.35,10.04 C18.67,6.59 15.64,4 12,4 C9.11,4 6.6,5.64 5.35,8.04 C2.34,8.36 0,10.91 0,14 C0,17.31 2.69,20 6,20 L19,20 C21.76,20 24,17.76 24,15 C24,12.36 21.95,10.22 19.35,10.04 Z M14,13 L14,17 L10,17 L10,13 L7,13 L12,8 L17,13 L14,13 Z"></path></svg>
                            <span>Upload image(s)</span>
                        </div>
                    </div>
                    <div class="upload__drag-txt">
                        <span>or Drag and Drop to upload image</span>
                        <i>
                            <svg height="10px" viewBox="0 0 10.47 24"><path d="M20.07,27.85a2.14,2.14,0,0,1-1.36-.32,1.51,1.51,0,0,1-.39-1.2,6.5,6.5,0,0,1,.12-1c0.09-.45.18-0.86,0.28-1.22L20,19.63a7,7,0,0,0,.25-1.34c0-.48.07-0.82,0.07-1a2.93,2.93,0,0,0-1-2.28,4,4,0,0,0-2.76-.88,6.76,6.76,0,0,0-2.11.36c-0.74.24-1.52,0.53-2.34,0.86l-0.33,1.37,0.86-.29a3.59,3.59,0,0,1,1-.14,1.92,1.92,0,0,1,1.32.33,1.62,1.62,0,0,1,.35,1.19,5.68,5.68,0,0,1-.11,1.05c-0.07.37-.17,0.78-0.28,1.2L13.65,24.5c-0.11.47-.19,0.88-0.24,1.25a8.72,8.72,0,0,0-.07,1.09,2.88,2.88,0,0,0,1,2.26,4.06,4.06,0,0,0,2.81.9,6.11,6.11,0,0,0,2.06-.32c0.59-.21,1.38-0.51,2.38-0.9l0.33-1.37a5.8,5.8,0,0,1-.83.28A3.88,3.88,0,0,1,20.07,27.85ZM19.28,11.59a3,3,0,0,0,2.09-.82,2.62,2.62,0,0,0,.86-2,2.65,2.65,0,0,0-.86-2,3.09,3.09,0,0,0-4.18,0,2.66,2.66,0,0,0-.87,2,2.63,2.63,0,0,0,.87,2A3,3,0,0,0,19.28,11.59Z" transform="translate(-11.77 -6)"></path></svg>
                        </i>
                    </div>
                    <input type="file" class="upload__input"  @change="uploadPhoto()" ref="photoInput"/>
                </div>
                <div class="result-section">
                    <div class="result__show-txt">
                        Showing results for All images
                    </div>
                    <div class="result__list">
                        <div class="list__column column--1">
                            <div v-for="item in my_image.boxes[0].items" class="stock-photo__item">
                                <img @click="addMyImage(item)"
                                    v-bind:src="item.thumb_url"
                                    alt="" />
                            </div>
                        </div>
                        <div class="list__column column--2">
                            <div v-for="item in my_image.boxes[1].items" class="stock-photo__item">
                                <img @click="addMyImage(item)"
                                     v-bind:src="item.thumb_url"
                                     alt="" />
                            </div>
                        </div>
                        <div class="list__column column--3">
                            <div v-for="item in my_image.boxes[2].items" class="stock-photo__item">
                                <img @click="addMyImage(item)"
                                     v-bind:src="item.thumb_url"
                                     alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./image-element-container.js"></script>
<style scoped lang="scss" src="./image-element-container.scss"></style>
