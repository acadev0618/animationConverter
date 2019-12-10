<template>
    <div class="videoTestMain" @click="onClick($event)" ref="videoTestMain">
          <div class="editor__pane" ref="editorPane" v-if="!playerAll" :style="{transform: 'scale('+ editorZoom / 100 +')', marginTop: marginTopByZoom + 'px'}">
                    <div class="pane__content" :style="{width: template_store.width + 'px', height: template_store.height + 'px'}" ref="paneContent">
                        <div class="content__slide" style="width: 100%; height: 100%; background-size: auto; background-repeat: no-repeat;" v-bind:style="slide_store.css">
                            <div class="content__slide--inner" ref="workspace">
                                <VideoElement v-if="slide_store.backgroundVideo" :element="slide_store.backgroundVideo" :control-volume="controlVolume"></VideoElement>
                                <template v-for="element in slide_store.elements">
                                    <ImageElement v-if="element.type === 'image' && element.visible"
                                                  :element="element"
                                                  :offsetX="offsetX"
                                                  :offsetY="offsetY"
                                                  :key="'editor_slide_' + slide_store.id + '_element_' + element.id"
                                                  :parentZoom="editorZoom"
                                                  v-on:click="onEditorElementClick(element)"></ImageElement>
                                    <ShapeElement v-if="element.type === 'shape' && element.visible"
                                                  :element="element"
                                                  :offsetX="offsetX"
                                                  :offsetY="offsetY"
                                                  :key="'editor_slide_' + slide_store.id + '_element_' + element.id"
                                                  :parentZoom="editorZoom"
                                                  v-on:click="onEditorElementClick(element)"></ShapeElement>
                                    <TextElement v-if="element.type === 'text' && element.visible"
                                                 :element="element"
                                                 :offsetX="offsetX"
                                                 :offsetY="offsetY"
                                                 :key="'editor_slide_' + slide_store.id + '_element_' + element.id"
                                                 :parentZoom="editorZoom"
                                                 v-on:click="onEditorElementClick(element)"></TextElement>
                                    <LottieElement v-if="element.type === 'lottie' && element.visible"
                                                   :element="element"
                                                   :offsetX="offsetX"
                                                   :offsetY="offsetY"
                                                   :key="'editor_slide_' + slide_store.id + '_element_' + element.id"
                                                   :parentZoom="editorZoom"
                                                   v-on:click="onEditorElementClick(element)"></LottieElement>
                                </template>
                            </div>
                        </div>
                        <AudioPlayer v-if="template_store.sound" :element="template_store.sound" style="display: none;" :controlState="slide_store.state" :controlVolume="controlVolume"></AudioPlayer>
                    </div>
                </div>
                <div class="player__pane" v-if="playerAll" :style="{transform: 'scale('+ editorZoom / 100 +')', marginTop: marginTopByZoom + 'px'}">
                    <TemplatePlayer
                            :template="template_store"
                            :controlSeek="templateControlSeek"
                            :controlState="template_store.state"
                            :controlVolume="controlVolume"
                            v-on:onPlay="onTemplatePlay"
                            v-on:onPause="onTemplatePause"
                            v-on:onStop="onTemplateStop"
                            v-on:element_click="onTemplateElementClick"
                    ></TemplatePlayer>
                </div>
                <div class="editor__tools d-flex align-items-center" :style="{marginTop: (marginTopByZoom + 20) + 'px'}" ref="editorTools">
                    <div class="control__item control__play-all--txt mr-3" v-if="!(slide_store.state === 'play' || slide_store.state === 'pause')">PLAY ALL</div>
                    <button class="control__item control__play-all--icon mr-4" v-if="!playerAll && !(slide_store.state === 'play' || slide_store.state === 'pause')" @click="playTemplate()">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             width="30px" height="30px" viewBox="0 0 73.17 73.17" style="enable-background:new 0 0 73.17 73.17;" xml:space="preserve"
                        >
                    <g>
                        <g id="Stop">
                            <g>
                                <path d="M36.585,0C16.412,0,0,16.413,0,36.585s16.412,36.584,36.585,36.584S73.17,56.758,73.17,36.585S56.758,0,36.585,0z
                                     M36.585,65.28c-15.817,0-28.69-12.869-28.69-28.694c0-15.817,12.873-28.688,28.69-28.688c15.821,0,28.69,12.87,28.69,28.688
                                    C65.275,52.411,52.406,65.28,36.585,65.28z M46.773,25.018H27.446c-1.087,0-1.971,0.888-1.971,1.971v19.323
                                    c0,1.09,0.884,1.979,1.971,1.979h19.328c1.086,0,1.971-0.889,1.971-1.979V26.987C48.744,25.904,47.859,25.018,46.773,25.018z"/>
                            </g>
                        </g>
                    </g>
                    </svg>
                    </button>
                    <button class="control__item control__play-all--icon mr-4" v-if="playerAll && template_store.state === 'pause'" @click="resumeTemplate">
                        <svg width="30px" height="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                    </button>
                    <button class="control__item control__play-all--icon mr-4" v-if="playerAll && template_store.state === 'play'" @click="pauseTemplate">
                        <svg  width="30px" height="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                              viewBox="0 0 87.859 87.859" style="enable-background:new 0 0 87.859 87.859;" xml:space="preserve">
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
                    </button>
                    <div class="control__item tool__divider mr-4" v-if="!(slide_store.state === 'play' || slide_store.state === 'pause') && !playerAll"></div>
                    <button class="control__item control__backward mr-3" v-if="!playerAll" :disabled="!canBackward() || playerAll || slide_store.state === 'play' || slide_store.state === 'pause'" @click="canBackward() && slideBackward()">
                        <svg width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 439.362 439.362" style="enable-background:new 0 0 439.362 439.362;"
                             xml:space="preserve">
                    <g>
                        <path d="M362.146,0.412c-2.471-1.143-5.517,0.094-9.138,3.709L150.308,206.828c-1.718,1.524-2.955,3.333-3.715,5.424V18.679
                            c0-4.952-1.809-9.234-5.424-12.85c-3.617-3.617-7.9-5.426-12.847-5.426H91.775c-4.952,0-9.233,1.809-12.85,5.426
                            C75.308,9.448,73.5,13.73,73.5,18.679v401.986c0,4.948,1.807,9.236,5.424,12.847c3.621,3.62,7.902,5.428,12.85,5.428h36.543
                            c4.947,0,9.229-1.808,12.847-5.428c3.615-3.61,5.424-7.898,5.424-12.847V227.097c0.763,1.903,2,3.717,3.715,5.425l202.705,202.712
                            c3.621,3.617,6.667,4.859,9.138,3.72c2.478-1.144,3.716-4.189,3.716-9.138V9.547C365.862,4.599,364.624,1.553,362.146,0.412z"/>
                    </g>
                </svg>
                    </button>
                    <button v-if="slide_store.state !== 'play' && !playerAll" class="control__item control__play mr-3" :disabled="playerAll" @click="playSlide">
                        <svg width="30px" height="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                    </button>
                    <button v-if="slide_store.state === 'play' && !playerAll" class="control__item control__pause mr-3" :disabled="playerAll" @click="pauseSlide">
                        <svg  width="30px" height="30px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                              viewBox="0 0 87.859 87.859" style="enable-background:new 0 0 87.859 87.859;" xml:space="preserve">
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
                    </button>
                    <button class="control__item control__forward mr-4" v-if="!playerAll" :disabled="!canForward() || playerAll || slide_store.state === 'play' || slide_store.state === 'pause'" @click="canForward() && slideForward()">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             width="20px" viewBox="0 0 439.357 439.357" style="enable-background:new 0 0 439.357 439.357;"
                             xml:space="preserve">
                    <g>
                        <path d="M360.427,5.833c-3.613-3.617-7.898-5.424-12.847-5.424h-36.545c-4.945,0-9.233,1.807-12.847,5.424
                            c-3.614,3.621-5.428,7.902-5.428,12.85v193.574c-0.948-2.091-2.19-3.901-3.717-5.424L86.343,4.125
                            c-3.617-3.617-6.663-4.856-9.136-3.713c-2.474,1.143-3.711,4.189-3.711,9.137v420.262c0,4.948,1.237,7.994,3.711,9.138
                            c2.473,1.14,5.519-0.1,9.136-3.724L289.048,232.52c1.529-1.711,2.765-3.521,3.72-5.424V420.66c0,4.948,1.81,9.239,5.421,12.847
                            c3.62,3.62,7.904,5.428,12.847,5.428h36.552c4.948,0,9.236-1.808,12.847-5.428c3.614-3.607,5.428-7.898,5.428-12.847V18.683
                            C365.854,13.73,364.037,9.45,360.427,5.833z"/>
                    </g>
                </svg>
                    </button>
                    <div class="control__item control__volume--icon mr-3">
                        <svg width="20px" height="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" xml:space="preserve"><g data-v-da0df71c=""><path d="M28.404,7.758c-0.975-0.552-2.131-0.534-3.09,0.044c-0.046,0.027-0.09,0.059-0.13,0.093L11.634,19.358H1
                                                c-0.553,0-1,0.447-1,1v19c0,0.266,0.105,0.52,0.293,0.707S0.734,40.358,1,40.358l10.61-0.005l13.543,12.44
                                                c0.05,0.046,0.104,0.086,0.161,0.12c0.492,0.297,1.037,0.446,1.582,0.446c0.517-0.001,1.033-0.134,1.508-0.402
                                                C29.403,52.393,30,51.363,30,50.201V10.514C30,9.353,29.403,8.323,28.404,7.758z M28,50.201c0,0.431-0.217,0.81-0.579,1.015
                                                c-0.155,0.087-0.548,0.255-1,0.026L13,38.913v-4.556c0-0.553-0.447-1-1-1s-1,0.447-1,1v3.996l-9,0.004v-17h9v4c0,0.553,0.447,1,1,1
                                                s1-0.447,1-1v-4.536l13.405-11.34c0.461-0.242,0.861-0.07,1.016,0.018C27.783,9.704,28,10.083,28,10.514V50.201z"></path> <path d="M52.026,29.858c0-8.347-5.316-15.76-13.229-18.447c-0.522-0.177-1.091,0.103-1.269,0.626
                                                c-0.177,0.522,0.103,1.091,0.626,1.269c7.101,2.411,11.872,9.063,11.872,16.553c0,7.483-4.762,14.136-11.849,16.554
                                                c-0.522,0.178-0.802,0.746-0.623,1.27c0.142,0.415,0.53,0.677,0.946,0.677c0.107,0,0.216-0.017,0.323-0.054
                                                C46.721,45.611,52.026,38.198,52.026,29.858z"></path> <path  d="M44.453,6.374c-0.508-0.213-1.095,0.021-1.312,0.53C42.926,7.413,43.163,8,43.672,8.216C52.376,11.909,58,20.405,58,29.858
                                                c0,9.777-5.894,18.38-15.015,21.914c-0.515,0.2-0.771,0.779-0.571,1.294c0.153,0.396,0.532,0.639,0.933,0.639
                                                c0.12,0,0.242-0.021,0.361-0.067C53.605,49.801,60,40.467,60,29.858C60,19.6,53.897,10.382,44.453,6.374z"></path> <path d="M43.026,29.858c0-5.972-4.009-11.302-9.749-12.962c-0.53-0.151-1.084,0.152-1.238,0.684
                                                c-0.153,0.53,0.152,1.085,0.684,1.238c4.889,1.413,8.304,5.953,8.304,11.04s-3.415,9.627-8.304,11.04
                                                c-0.531,0.153-0.837,0.708-0.684,1.238c0.127,0.438,0.526,0.723,0.961,0.723c0.092,0,0.185-0.013,0.277-0.039
                                                C39.018,41.159,43.026,35.829,43.026,29.858z"></path></g></svg>
                    </div>
                    <div class="control__item control__volume--value flex-grow-1">
                        <range-slider
                                class="slider"
                                min="0"
                                max="100"
                                step="1"
                                @input="volumeInput"
                                v-model="volume">
                        </range-slider>
                    </div>
                </div>
            </div>
        </template>

<script src="./videoTestMain.js"></script>

<style scoped lang="scss" src="./videoTestMain.scss"></style>
<style lang="scss">
    .range-slider.slider{
        display: block;
        width: 100%;
        line-height: 0;
    }
</style>
