<template>
    <div class="my-file-element-container">
        <h2 class="element__name">Add Element</h2>
        <ul class="nav nav-tabs" id="my-file__nav" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#my__images" role="tab">
                    <div>My Images</div>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#my__videos" role="tab">
                    <div>My Videos</div>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#my__musics" role="tab">
                    <div>My Musics</div>
                </a>
            </li>
        </ul>
        <div class="tab-content" id="my-file__content">
            <div class="tab-pane fade show active" id="my__images" role="tabpanel">
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
            <div class="tab-pane fade" id="my__musics" role="tabpanel">
                <div class="upload-section">
                    <div class="upload__brand">
                        Upload
                    </div>
                    <div class="upload__helper">
                        or Drag and Drop to Upload music
                    </div>
                    <input type="file" name="upload_music" ref="audioInput" @change="uploadSound" />
                </div>
                <div class="pane__title">Your Uploaded Music</div>
                <div class="result--list">
                    <div class="list__item" v-for="item in myMusic">
                        <div class="item__main">
                            <div class="row align-items-center m-0">
                                <div class="col-auto pr-0 pl-0">
                                    <div class="play--status play--status-pause" v-if="item.play_status === 'pause'" v-on:click="itemPlay(item)">
                                        <svg width="20px" height="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M357.771,264.969
                                                        l-149.333,96c-1.75,1.135-3.771,1.698-5.771,1.698c-1.75,0-3.521-0.438-5.104-1.302C194.125,359.49,192,355.906,192,352V160
                                                        c0-3.906,2.125-7.49,5.563-9.365c3.375-1.854,7.604-1.74,10.875,0.396l149.333,96c3.042,1.958,4.896,5.344,4.896,8.969
                                                        S360.813,263.01,357.771,264.969z"/>
                                                </g>
                                            </g>
                                            </svg>
                                    </div>
                                    <div class="play--status play--status-playing" v-if="item.play_status === 'play'" v-on:click="itemPause(item)">
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             width="20px" height="20px" viewBox="0 0 87.859 87.859" style="enable-background:new 0 0 87.859 87.859;"
                                             xml:space="preserve">
                                            <g>
                                                <g id="Pause_1_">
                                                    <g>
                                                        <path d="M43.93,0C19.705,0,0,19.706,0,43.93c0,24.225,19.705,43.929,43.93,43.929c24.224,0,43.929-19.704,43.929-43.929
                                                            C87.859,19.706,68.154,0,43.93,0z M43.93,79.873c-19.82,0-35.944-16.123-35.944-35.943c0-19.812,16.124-35.942,35.943-35.942
                                                            c19.82,0,35.943,16.13,35.943,35.942C79.873,63.75,63.75,79.873,43.93,79.873z M31.95,55.913h7.986V31.946H31.95V55.913z
                                                             M47.923,55.913h7.987V31.946h-7.987V55.913z"/>
                                                    </g>
                                                </g>
                                            </g>
                                            </svg>
                                    </div>
                                </div>
                                <div class="col pr-0">
                                    <div class="item__title">{{item.title}}</div>
                                </div>
                                <div class="col-auto pr-0">
                                    <div class="item__use item--used" v-if="usedSound && item.element.content.src === usedSound.content.src" @click="unUseSound(item)">
                                        Used
                                    </div>
                                    <div class="item__use" v-else @click="useSound(item)">
                                        Use
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="item__play" v-if="item.play_status === 'play'">
                            <AudioPlayer :element="item.element" :auto-play="true"></AudioPlayer>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="my__videos" role="tabpanel">
                <div class="upload-section">
                    <div>
                        <div class="upload__image">
                            <svg viewBox="0 0 24 24" width="24px"><path d="M19.35,10.04 C18.67,6.59 15.64,4 12,4 C9.11,4 6.6,5.64 5.35,8.04 C2.34,8.36 0,10.91 0,14 C0,17.31 2.69,20 6,20 L19,20 C21.76,20 24,17.76 24,15 C24,12.36 21.95,10.22 19.35,10.04 Z M14,13 L14,17 L10,17 L10,13 L7,13 L12,8 L17,13 L14,13 Z"></path></svg>
                            <span>Upload video(s)</span>
                        </div>
                    </div>
                    <div class="upload__drag-txt">
                        <span>or Drag and Drop to upload video</span>
                        <i>
                            <svg height="10px" viewBox="0 0 10.47 24"><path d="M20.07,27.85a2.14,2.14,0,0,1-1.36-.32,1.51,1.51,0,0,1-.39-1.2,6.5,6.5,0,0,1,.12-1c0.09-.45.18-0.86,0.28-1.22L20,19.63a7,7,0,0,0,.25-1.34c0-.48.07-0.82,0.07-1a2.93,2.93,0,0,0-1-2.28,4,4,0,0,0-2.76-.88,6.76,6.76,0,0,0-2.11.36c-0.74.24-1.52,0.53-2.34,0.86l-0.33,1.37,0.86-.29a3.59,3.59,0,0,1,1-.14,1.92,1.92,0,0,1,1.32.33,1.62,1.62,0,0,1,.35,1.19,5.68,5.68,0,0,1-.11,1.05c-0.07.37-.17,0.78-0.28,1.2L13.65,24.5c-0.11.47-.19,0.88-0.24,1.25a8.72,8.72,0,0,0-.07,1.09,2.88,2.88,0,0,0,1,2.26,4.06,4.06,0,0,0,2.81.9,6.11,6.11,0,0,0,2.06-.32c0.59-.21,1.38-0.51,2.38-0.9l0.33-1.37a5.8,5.8,0,0,1-.83.28A3.88,3.88,0,0,1,20.07,27.85ZM19.28,11.59a3,3,0,0,0,2.09-.82,2.62,2.62,0,0,0,.86-2,2.65,2.65,0,0,0-.86-2,3.09,3.09,0,0,0-4.18,0,2.66,2.66,0,0,0-.87,2,2.63,2.63,0,0,0,.87,2A3,3,0,0,0,19.28,11.59Z" transform="translate(-11.77 -6)"></path></svg>
                        </i>
                    </div>
                    <input type="file" class="upload__input"  ref="videoInput" @change="uploadVideo()"/>
                </div>
                <div class="result-section">
                    <div class="result__show-txt">
                        Showing results for All videos
                    </div>
                    <div class="result__list">
                        <div class="list__column column--1">
                            <div v-for="item in my_video.boxes[0].items" class="stock-video__item" @click="setBackgroundVideoWithMyVideo(item)">
                                <img
                                    v-bind:src="item.thumb_url"
                                    alt="" />
                            </div>
                        </div>
                        <div class="list__column column--2">
                            <div v-for="item in my_video.boxes[1].items" class="stock-video__item" @click="setBackgroundVideoWithMyVideo(item)">
                                <img
                                    v-bind:src="item.thumb_url"
                                    alt="" />
                            </div>
                        </div>
                        <div class="list__column column--3">
                            <div v-for="item in my_video.boxes[2].items" class="stock-video__item" @click="setBackgroundVideoWithMyVideo(item)">
                                <img
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

<script src="./my-file-element-container.js"></script>

<style scoped lang="scss" src="./my-file-element-container.scss">

</style>
