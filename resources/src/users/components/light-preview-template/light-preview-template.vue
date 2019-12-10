<template>
    <div class="component-light-preview-template app-modal" ref="modal-ref" @click="checkClose">
        <div class="modal__dialog" :style="{width: dialogWidth + 'px'}">
            <div class="modal__content" ref="modalContent">
                <div class="modal__header">
                    <h5 class="modal__title mr-auto">{{videoTemplate.temp_name}}</h5>
                    <button type="button" class="close" @click="$event.stopPropagation(); onHidden();">
                        <span>×</span>
                    </button>
                </div>
                <div class="modal__body">
                    <div class="template__meta mb-2">
                        <div class="d-flex align-items-center mb-1">
                            <div class="meta__date mr-2">{{createdAt}}</div>
                            <div class="meta__user mr-auto">sakonchai</div>
                            <div class="meta__status">{{videoTemplate.status}}</div>
                        </div>
                        <div class="meta__made-with">
                            <span>Made with:</span>
                            <span class="made-with__val">Origami Bubbles - {{videoTemplate.aspect}}</span>
                        </div>
                    </div>
                    <div class="template__main">
                        <div class="template__player--wrap" :style="{width: previewWidth + 'px'}" v-if="videoTemplate.media_type === 'video'">
                            <template-player
                                :template="videoTemplate.data_json"
                                :controlState="playerState"
                                :control-seek="playerSeek"
                                :responsive="true"
                                @onStop="onStop"
                                ref="templatePlayer"
                            ></template-player>
                        </div>
                        <div class="template__preview--wrap" :style="{width: previewWidth + 'px'}" v-if="videoTemplate.media_type === 'image'">
                            <template-preview
                                :template="videoTemplate.data_json"
                            ></template-preview>
                        </div>
                    </div>
                </div>
                <div class="modal__footer">
                    <div class="d-flex align-items-center">
                        <a class="action__item mr-2" :href="'/edit-template?id=' + videoTemplate.id">
                            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 viewBox="0 0 277.446 277.446" style="enable-background:new 0 0 277.446 277.446;" xml:space="preserve">
<path id="_x30_6-Movie_Clapper" d="M59.488,117.299c-0.504-4.237-2.007-8.171-4.273-11.556l202.992-67.776L247.552,6.051
	c-1.549-4.638-6.566-7.141-11.201-5.594L15.54,74.182c-4.635,1.547-7.143,6.563-5.594,11.201l5.225,15.647
	c-5.216,4.843-8.488,11.752-8.488,19.415c0,9.924,5.486,18.586,13.582,23.127v125.02c0,4.891,3.967,8.853,8.854,8.853h232.793
	c4.885,0,8.852-3.963,8.852-8.853V117.299H59.488z M188.869,26.724l26.875-8.973l-6.467,26.14l-26.875,8.973L188.869,26.724z
	 M122.47,48.893l26.877-8.973l-6.467,26.139l-26.875,8.974L122.47,48.893z M33.181,133.946c-7.442,0-13.498-6.056-13.498-13.5
	c0-7.444,6.056-13.5,13.498-13.5c7.444,0,13.5,6.056,13.5,13.5C46.681,127.89,40.625,133.946,33.181,133.946z M56.074,71.062
	l26.877-8.973l-6.467,26.14l-26.877,8.974L56.074,71.062z M82.476,147.192H54.142l14.412-22.746h28.334L82.476,147.192z
	 M138.554,124.446h28.334l-14.412,22.746h-28.334L138.554,124.446z M131.599,234.372v-60l47.783,30L131.599,234.372z
	 M222.476,147.192h-28.334l14.412-22.746h28.334L222.476,147.192z"/>
</svg>
                            <span>EDIT VIDEO</span>
                        </a>
                        <a class="action__item mr-2" href="javascript:;">
                            <svg id="Capa_1" enable-background="new 0 0 551.13 551.13" height="512" viewBox="0 0 551.13 551.13" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m465.016 172.228h-51.668v34.446h34.446v310.011h-344.457v-310.011h34.446v-34.446h-51.669c-9.52 0-17.223 7.703-17.223 17.223v344.456c0 9.52 7.703 17.223 17.223 17.223h378.902c9.52 0 17.223-7.703 17.223-17.223v-344.456c0-9.52-7.703-17.223-17.223-17.223z"/><path d="m258.342 65.931v244.08h34.446v-244.08l73.937 73.937 24.354-24.354-115.514-115.514-115.514 115.514 24.354 24.354z"/></svg>
                            <span>EXPORT TO...</span>
                        </a>
                        <a class="action__item item__delete" href="javascript:;" @click="confirmDelete">
                            <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="del-a" d="M10 3v1H6v2h1v13.008A2 2 0 0 0 9.001 21h6.998C17.104 21 18 20.1 18 19.008V6h1V4h-4V3h-5zM9 8.001h7V7H9v1.001zM15 19h1v-9h-1v9zm-2.999 0h1v-9h-1v9zM9 19h1v-9H9v9z"></path></defs><g fill-rule="evenodd"><mask id="del-b" fill="#fff"><use xlink:href="#del-a"></use></mask><g mask="url(#del-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                            <span>DELETE</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./light-preview-template.js"></script>

<style scoped lang="scss" src="./light-preview-template.scss"></style>
