<template>
    <div class="videoTestTimeline">
        <div class="timeline-ruler">
            <div v-for="tPoint in timePoints" v-bind:class="tPoint.class" v-bind:data-time="tPoint.value" :style="{width: pxPerSec + 'px'}"></div>
            <div class="timeline-seeker">
                <range-slider
                        class="slider timeline-slider"
                        min="0"
                        max="50000"
                        v-model="timelineVars.timeSeek"
                        :disabled="state === 'play'"
                        @input="onTimeSeekInput">
                    <template v-slot:knob>
                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g><path d="M9,4 L16,4 C17.1045695,4 18,4.8954305 18,6 L18,13.0070582 C18,14.3526183 17.4576726,15.6413868 16.4955882,16.5820916 L13,20 L12,20 L8.50441184,16.5820916 C7.5423274,15.6413868 7,14.3526183 7,13.0070582 L7,6 C7,4.8954305 7.8954305,4 9,4 Z"></path><g transform="translate(12.000000, 7.000000)" fill="#FFFFFF" fill-opacity="0.2"><rect id="Rectangle" x="0" y="0" width="1" height="1"></rect><rect id="Rectangle" x="0" y="3" width="1" height="1"></rect><rect id="Rectangle" x="0" y="6" width="1" height="1"></rect></g></g></svg>
                    </template>
                </range-slider>
            </div>
        </div>
        <div class="timeline-slide">
            <div class="slide--list">
                <draggable v-bind="dragOptions" v-model="template_store.slides" :direction="'horizontal'">
                    <transition-group type="transition">
                        <div v-for="(slide, index) in template_store.slides" class="slide-item" :key="'timeline_slide_' + slide.id" :class="{active: slide.id === current_slide_store.id}" :style="{width: slideWidth(slide) + 'px'}">
                            <AppResizable :top="0" :left="-2" :width="slideWidth(slide)" :height="'100%'" :active="['r']" @resize:move="resizeSlide($event, slide)">
                            </AppResizable>
                            <header class="item-header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div v-if="slide.id === current_slide_store.id && slideState === 'play'" class="play-item" @click="pauseSlide">
                                        <svg  width="24px" height="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                    </div>
                                    <div v-else class="play-item" @click="playSlide(slide)">
                                        <svg width="24px" height="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                    <div class="edit-btn" v-on:mouseover="editHoverIndex = index" v-on:mouseleave="editHoverIndex = false">
                                        <span>Edit</span>
                                        <div class="item--actions" v-if="editHoverIndex === index">
                                            <div class="action--list">
                                                <div class="list__item" @click="deleteSlide(slide)">
                                                    <div class="d-flex align-items-center">
                                                        <div class="item__icon">
                                                            <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="del-a" d="M10 3v1H6v2h1v13.008A2 2 0 0 0 9.001 21h6.998C17.104 21 18 20.1 18 19.008V6h1V4h-4V3h-5zM9 8.001h7V7H9v1.001zM15 19h1v-9h-1v9zm-2.999 0h1v-9h-1v9zM9 19h1v-9H9v9z"></path></defs><g fill-rule="evenodd"><mask id="del-b" fill="#fff"><use xlink:href="#del-a"></use></mask><g mask="url(#del-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                                                        </div>
                                                        <div class="item__text">Delete</div>
                                                    </div>
                                                </div>
                                                <div class="list__item" @click="duplicateSlide(slide)">
                                                    <div class="d-flex align-items-center">
                                                        <div class="item__icon">
                                                            <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="dup-a" d="M7.992 3C6.892 3 6 3.888 6 5v2h-.999A2.003 2.003 0 0 0 3 9.006v9.988C3 20.102 3.897 21 5.006 21h9.989c1.108 0 2.006-.9 2.006-2.001V18h2C20.104 18 21 17.107 21 16.008V4.992C21 3.892 20.107 3 19.008 3H7.992zM8 5h11v11h-2V7h-9V5zM11 11v2h2v2h-2v2H9v-2H7v-2h2v-2h2zM5 9h10v10H5V9z"></path></defs><g fill-rule="evenodd"><mask id="dup-b" fill="#fff"><use xlink:href="#dup-a"></use></mask><g mask="url(#dup-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                                                        </div>
                                                        <div class="item__text">Duplicate</div>
                                                    </div>
                                                </div>
                                                <div class="list__item" @click="openSlideTransition = slide">
                                                    <div class="d-flex align-items-center">
                                                        <div class="item__icon">
                                                            <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="trans-a" d="M3 21h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1zM16 7h4V5h-4v2zm-6 0h4V5h-4v2zM4 7h4.001V5H4v2zm6 1.915L15.343 12 10 15.085v-6.17zM16 19h4v-2h-4v2zm-6 0h4v-2h-4v2zm-6 0h4.001v-2H4v2z"></path></defs><g fill-rule="evenodd"><mask id="trans-b" fill="#fff"><use xlink:href="#trans-a"></use></mask><g mask="url(#trans-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                                                        </div>
                                                        <div class="item__text">Transition</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </header>
                            <div class="item-body">
                                <div class="item-nav nav-prev">
                                    <img src="icon/double-left-chevron.svg" alt="" />
                                </div>
                                <div class="slide-preview--wrap" @click="setCurrentSlide(slide)">
                                    <SlidePreview :style="slidePreviewStyle" :slide="slide" />
                                </div>
                                <div class="item-nav nav-next">
                                    <img src="icon/double-angle-pointing-to-right.svg" alt="" />
                                </div>
                            </div>
                            <footer class="item-footer">
                                <div class="row justify-content-between align-items-end">
                                    <div class="col-auto">
                                        <div class="item-number">#1</div>
                                    </div>
                                    <div class="col-auto">
                                        <div class="item-duration">{{slideDurationFormat(slide)}}</div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <div class="slide-item item--plus" @click="openAddNewSlide = true" :key="'timeline_slide_-1'">
                <div class="plus__icon">
                    <svg width="40px" height="40px" viewBox="0 0 40 40"><g stroke="none" stroke-width="1" fill-rule="evenodd" fill-opacity="0.8"><g transform="translate(-310.000000, -260.000000)"><g transform="translate(-481.000000, 57.000000)"><g transform="translate(741.000000, 163.000000)"><g><g><path d="M71,58 L71,40 L68,40 L68,58 L50,58 L50,61 L68,61 L68,80 L71,80 L71,61 L90,61L90,58 L71,58 Z"></path></g></g></g></g></g></g></svg>
                </div>
                <div class="plus__text">
                    Add slide
                </div>
            </div>
        </div>
        <AddNewSlide v-if="openAddNewSlide" v-on:click_close="openAddNewSlide = false" />
        <AddSlideTransition v-if="openSlideTransition" :animation-name="openSlideTransition.animation.leave ? openSlideTransition.animation.leave.name : false" v-on:click_close="openSlideTransition = false" v-on:selectTransition="setSlideTransition"></AddSlideTransition>
    </div>
</template>

<script src="./videoTestTimeline.js"></script>

<style scoped lang="scss" src="./videoTestTimeline.scss"></style>
<style lang="scss">
    .timeline-slider{
        .range-slider-inner{
            z-index: 10;
            .range-slider-rail{
                background-color: transparent;
            }
            .range-slider-fill{
                background-color: transparent;
            }
            .range-slider-knob{
                width: 24px;
                height: 24px;
                border-radius: 0px;
                background-color: transparent;
                border: none;
                box-shadow: none;
                svg{
                    fill: #515873;
                }
                &:before {
                    content: '';
                    display: block;
                    background-color: rgba(81, 88, 115, 0.4);
                    pointer-events: none;
                    position: absolute;
                    top: 20px;
                    left: 12px;
                    width: 1px;
                    height: 220px;
                }
            }
        }
        &.disabled{
            opacity: 1;
        }
    }
</style>
