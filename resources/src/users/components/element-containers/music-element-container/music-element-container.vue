<template>
    <div class="music-element-container">
        <h2 class="element__name">Add Element</h2>
        <ul class="nav nav-tabs" id="music__nav" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#music__library" role="tab">
                    <div class="link__icon flex-center">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
                            <g>
                                <path d="M28.404,7.758c-0.975-0.552-2.131-0.534-3.09,0.044c-0.046,0.027-0.09,0.059-0.13,0.093L11.634,19.358H1
                                    c-0.553,0-1,0.447-1,1v19c0,0.266,0.105,0.52,0.293,0.707S0.734,40.358,1,40.358l10.61-0.005l13.543,12.44
                                    c0.05,0.046,0.104,0.086,0.161,0.12c0.492,0.297,1.037,0.446,1.582,0.446c0.517-0.001,1.033-0.134,1.508-0.402
                                    C29.403,52.393,30,51.363,30,50.201V10.514C30,9.353,29.403,8.323,28.404,7.758z M28,50.201c0,0.431-0.217,0.81-0.579,1.015
                                    c-0.155,0.087-0.548,0.255-1,0.026L13,38.913v-4.556c0-0.553-0.447-1-1-1s-1,0.447-1,1v3.996l-9,0.004v-17h9v4c0,0.553,0.447,1,1,1
                                    s1-0.447,1-1v-4.536l13.405-11.34c0.461-0.242,0.861-0.07,1.016,0.018C27.783,9.704,28,10.083,28,10.514V50.201z"/>
                                <path d="M52.026,29.858c0-8.347-5.316-15.76-13.229-18.447c-0.522-0.177-1.091,0.103-1.269,0.626
                                    c-0.177,0.522,0.103,1.091,0.626,1.269c7.101,2.411,11.872,9.063,11.872,16.553c0,7.483-4.762,14.136-11.849,16.554
                                    c-0.522,0.178-0.802,0.746-0.623,1.27c0.142,0.415,0.53,0.677,0.946,0.677c0.107,0,0.216-0.017,0.323-0.054
                                    C46.721,45.611,52.026,38.198,52.026,29.858z"/>
                                <path d="M44.453,6.374c-0.508-0.213-1.095,0.021-1.312,0.53C42.926,7.413,43.163,8,43.672,8.216C52.376,11.909,58,20.405,58,29.858
                                    c0,9.777-5.894,18.38-15.015,21.914c-0.515,0.2-0.771,0.779-0.571,1.294c0.153,0.396,0.532,0.639,0.933,0.639
                                    c0.12,0,0.242-0.021,0.361-0.067C53.605,49.801,60,40.467,60,29.858C60,19.6,53.897,10.382,44.453,6.374z"/>
                                <path d="M43.026,29.858c0-5.972-4.009-11.302-9.749-12.962c-0.53-0.151-1.084,0.152-1.238,0.684
                                    c-0.153,0.53,0.152,1.085,0.684,1.238c4.889,1.413,8.304,5.953,8.304,11.04s-3.415,9.627-8.304,11.04
                                    c-0.531,0.153-0.837,0.708-0.684,1.238c0.127,0.438,0.526,0.723,0.961,0.723c0.092,0,0.185-0.013,0.277-0.039
                                    C39.018,41.159,43.026,35.829,43.026,29.858z"/>
                            </g>
                        </svg>
                    </div>
                    <div>Music Library</div>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#music__upload" role="tab">
                    <div class="link__icon flex-center">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 60 60" style="enable-background:new 0 0 60 60;" xml:space="preserve">
                            <g>
                                <path d="M50.975,20.694c-0.527-9-7.946-16.194-16.891-16.194c-5.43,0-10.688,2.663-13.946,7.008
                                    c-0.074-0.039-0.153-0.065-0.228-0.102c-0.198-0.096-0.399-0.188-0.605-0.269c-0.115-0.045-0.23-0.086-0.346-0.127
                                    c-0.202-0.071-0.406-0.133-0.615-0.19c-0.116-0.031-0.231-0.063-0.349-0.09c-0.224-0.051-0.452-0.09-0.683-0.124
                                    c-0.102-0.015-0.202-0.035-0.305-0.047C16.677,10.523,16.341,10.5,16,10.5c-4.962,0-9,4.037-9,9c0,0.129,0.007,0.255,0.016,0.381
                                    C2.857,22.148,0,26.899,0,31.654C0,38.737,5.762,44.5,12.845,44.5H18c0.552,0,1-0.447,1-1s-0.448-1-1-1h-5.155
                                    C6.865,42.5,2,37.635,2,31.654c0-4.154,2.705-8.466,6.432-10.253L9,21.13V20.5c0-0.123,0.008-0.249,0.015-0.375l0.009-0.175
                                    l-0.012-0.188C9.007,19.675,9,19.588,9,19.5c0-3.859,3.14-7,7-7c0.309,0,0.614,0.027,0.917,0.067
                                    c0.078,0.01,0.155,0.023,0.232,0.036c0.268,0.044,0.532,0.102,0.792,0.177c0.034,0.01,0.069,0.016,0.102,0.026
                                    c0.286,0.087,0.565,0.198,0.838,0.322c0.069,0.031,0.137,0.065,0.205,0.099c0.242,0.119,0.479,0.251,0.707,0.399
                                    C21.72,14.875,23,17.039,23,19.5c0,0.553,0.448,1,1,1s1-0.447,1-1c0-2.754-1.246-5.219-3.2-6.871
                                    C24.666,8.879,29.388,6.5,34.084,6.5c7.744,0,14.178,6.135,14.848,13.887c-1.022-0.072-2.553-0.109-4.083,0.125
                                    c-0.546,0.083-0.921,0.593-0.838,1.139c0.075,0.495,0.501,0.85,0.987,0.85c0.05,0,0.101-0.004,0.152-0.012
                                    c2.224-0.336,4.543-0.021,4.684-0.002C54.49,23.372,58,27.661,58,32.472C58,38.001,53.501,42.5,47.972,42.5H44
                                    c-0.552,0-1,0.447-1,1s0.448,1,1,1h3.972C54.604,44.5,60,39.104,60,32.472C60,26.983,56.173,22.06,50.975,20.694z"/>
                                <path d="M31.708,30.794c-0.092-0.093-0.203-0.166-0.326-0.217c-0.244-0.101-0.52-0.101-0.764,0
                                    c-0.123,0.051-0.233,0.124-0.326,0.217l-7.999,7.999c-0.391,0.391-0.391,1.023,0,1.414C22.488,40.402,22.744,40.5,23,40.5
                                    s0.512-0.098,0.707-0.293L30,33.914V54.5c0,0.553,0.448,1,1,1s1-0.447,1-1V33.914l6.293,6.293C38.488,40.402,38.744,40.5,39,40.5
                                    s0.512-0.098,0.707-0.293c0.391-0.391,0.391-1.023,0-1.414L31.708,30.794z"/>
                            </g>
                        </svg>
                    </div>
                    <div>Upload</div>
                </a>
            </li>
        </ul>
        <div class="tab-content" id="music__content">
            <div class="tab-pane fade show active" id="music__library" role="tabpanel">
                <div class="pane__title">Title</div>
                <div class="result--list app-scrollbar">
                    <div class="list__item" v-for="item in library">
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
                                    <div class="item__title">{{item.origin_file_name}}</div>
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
                            <AudioPlayer :element="item.element" :autoPlay="true"></AudioPlayer>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="music__upload" role="tabpanel">
                <div class="upload-section">
                    <div class="upload__brand">
                        Upload
                    </div>
                    <div class="upload__helper">
                        or Drag and Drop to Upload music
                    </div>
                    <input type="file" name="upload_music" @change="uploadSound" ref="audioInput"/>
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
        </div>
    </div>
</template>

<script src="./music-element-container.js"></script>
<style scoped lang="scss" src="./music-element-container.scss"></style>
