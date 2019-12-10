@extends('layouts.users-base')
@section('head')
    <link href="{{ asset('css/pages/users/browse-video-template.css', config('site.ssl_tf')) }}" rel="stylesheet"/>
@endsection
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="browse-video-template">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.browse_template') }}</li>
            </ul>
        </div>
        <div class="mt-2 step-section">
            <div class="d-flex justify-content-center">
                <div class="d-flex align-items-center">
                    <div class="step-description selected-step align-self-start">
                        <div>Step1</div>
                        <div><span class="text-underline font-weight-bold step-name">Choose</span> your</div>
                        <div>Video template</div>
                    </div>
                    <div class="step-line"></div>
                    <div class="step-description align-self-start">
                        <div>Step2</div>
                        <div><span class="text-underline font-weight-bold step-name">Customize</span></div>
                        <div>Video, Image, Text <br>and Music</div>
                    </div>
                    <div class="step-line"></div>
                    <div class="step-description align-self-start">
                        <div>Step3</div>
                        <div><span class="text-underline font-weight-bold step-name">Export it!</span></div>
                        <div>Done</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-wrapper" id="vue-app">
            <header class="content__header">
                <div class="row">
                    <div class="col-auto">
                        <a :class="{active: mediaType === 'video'}" @click="mediaType = 'video';" href="javascript:;">VIDEO TEMPLATE</a>
                    </div>
                    <div class="col-auto">
                        <a :class="{active: mediaType === 'image'}" @click="mediaType = 'image';" href="javascript:;">IMAGE TEMPLATE</a>
                    </div>
                </div>
            </header>
            <div class="content__body">
                <main class="page-main" id="page-main">
                    <header class="main__header">
                        <div class="row">
                            <div class="col-auto pr-0">
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{ trans('application.category') }}
                                    </button>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-item" v-for="(category, key) in categories" @click="$event.stopPropagation();">
                                            <input class="styled-checkbox" :id="'category-checkbox-' + key" type="checkbox" :value="key" v-model="selectedCategories" />
                                            <label :for="'category-checkbox-' + key">@{{ category }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto pr-0">
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{ trans('application.aspect_ratio') }}
                                    </button>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-item" v-for="(item, key) in aspects" @click="$event.stopPropagation();">
                                            <input class="styled-checkbox" :id="'aspect-checkbox-' + key" type="checkbox" :value="key" v-model="selectedAspects" />
                                            <label :for="'aspect-checkbox-' + key">@{{ item }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto mr-auto">
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{ trans('application.design_type') }}
                                    </button>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-item" v-for="(item, key) in designs" @click="$event.stopPropagation();">
                                            <input class="styled-checkbox" :id="'design-checkbox-' + key" type="checkbox" :value="key" v-model="selectedDesigns" />
                                            <label :for="'design-checkbox-' + key">@{{ item }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Sort By
                                    </button>
                                    <div class="dropdown-menu">
                                        <div class="dropdown-item" v-for="item in sortBy" @click="$event.stopPropagation();">
                                            <input class="styled-checkbox" :id="'sort-checkbox-' + item.value" type="radio" :value="item.value" v-model="selectedSortBy"/>
                                            <label :for="'sort-checkbox-' + item.value">@{{ item.label }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="main__content">
                        <div class="result__text" v-cloak>@{{videoTemplates.length}} Video Template Designs</div>
                        <div class="result__list" v-cloak>
                            <div class="col-box" v-for="box in boxes">
                                <template v-for="item in box.items">
                                    <a href="javascript:;" v-if="item.create_new" @click="createNew=true" class="list__item create--new flex-center" key="0">
                                        <div class="text-center">
                                            <div class="plus-icon ml-auto mr-auto"></div>
                                            <div class="from-zero">Create From Zero</div>
                                        </div>
                                    </a>
                                    <div v-else class="list__item" @mouseleave="toolMore=false" :key="item.id">
                                        <div class="item__preview">
                                            <template-preview :template="item.data_json"></template-preview>
                                        </div>
                                        <footer class="item__footer">
                                            <div class="d-flex align-items-center flex-wrap">
                                                <div class="item__title mr-1" v-cloak>@{{ item.temp_name }}</div>
                                                <div class="mr-1">-</div>
                                                <div class="item__aspect" v-cloak>@{{ item.aspect_type }}</div>
                                            </div>
                                            <div class="d-flex align-items-center">
                                                <div class="item__user mr-auto">Juliet Ua</div>
                                                <div class="item__duration mr-2" v-cloak>@{{ durationFormat(item.duration) }}</div>
                                                <div class="item__photo mr-2">
                                                    <i class="far fa-image"></i>
                                                    <span>5</span>
                                                </div>
                                                <div class="item__video">
                                                    <i class="fas fa-video"></i>
                                                    <span>0</span>
                                                </div>
                                            </div>
                                        </footer>
                                        <div class="hover-content">
                                            <div class="control-bg"></div>
                                            <div class="hover-control w-100">
                                                <div class="control--top" v-if="template_editable">
                                                    <div class="d-flex">
                                                        <div class="control__item tool__download ml-auto">
                                                            <svg width="24px" height="24px" viewBox="0 0 24 24"><g id="24px-Download banner" stroke="none" stroke-width="1" fill-rule="evenodd"><g fill-rule="nonzero"><path d="M16.4704221,11.2746482 C17.3151847,10.5706795 17.1122704,10 16,10 L14,10 L14,5 L10,5 L10,10 L8,10 C6.8954305,10 6.68827629,10.5735636 7.52957788,11.2746482 L11.2278881,14.3565734 C11.6543137,14.7119281 12.3397772,14.7168523 12.7721119,14.3565734 L16.4704221,11.2746482 Z M7,17 L7,19 L17,19 L17,17 L7,17 Z" id="Shape-Copy-2"></path></g></g></svg>
                                                        </div>
                                                        <div class="tool__more">
                                                            <div class="control__item more__icon" @click="toolMore = item.id">
                                                                <svg width="24px" height="24px" viewBox="0 0 24 24"><defs></defs><g id="moreSmall-svg" stroke="none" stroke-width="1" fill-rule="evenodd"><path d="M6,11 L8,11 L8,13 L6,13 L6,11 Z M11,11 L13,11 L13,13 L11,13 L11,11 Z M16,11 L18,11 L18,13 L16,13 L16,11 Z" id="Combined-Shape"></path></g></svg>
                                                            </div>
                                                            <div class="more__dropdown" v-if="toolMore === item.id">
                                                                <div class="dropdown__list">
                                                                    <div class="list__item" @click="confirmDelete(item.id)">
                                                                        <svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="del-a" d="M10 3v1H6v2h1v13.008A2 2 0 0 0 9.001 21h6.998C17.104 21 18 20.1 18 19.008V6h1V4h-4V3h-5zM9 8.001h7V7H9v1.001zM15 19h1v-9h-1v9zm-2.999 0h1v-9h-1v9zM9 19h1v-9H9v9z"></path></defs><g fill-rule="evenodd"><mask id="del-b" fill="#fff"><use xlink:href="#del-a"></use></mask><g mask="url(#del-b)"><path d="M0 0h24v24H0z"></path></g></g></svg>
                                                                        <div class="ml-1">Delete</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="view-button">
                                                    <button @click="openCustomizeModal(item)" type="button" data-title="1" class="btn btn-outline-light view-btn"><i class="fas fa-eye"></i> View
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <customize-video-modal ref="customizeVideoModal" v-if="openVideoTemplate" :video-template="openVideoTemplate" :create-from="createFrom" @hidden="openVideoTemplate=false"></customize-video-modal>
                    <variation-selector v-if="createNew" @hidden="createNew=false" @select="createWith"></variation-selector>
                </main>
            </div>
        </div>
        @include('layouts.users-footer')
    </div>
@endsection
@section('scripts')
    <script type="text/javascript">
        let videoTemplates = @json($videoTemplates);
        let videoAspects = @json(config('video_template.aspect'));
        let videoDesigns = @json(config('video_template.design_type'));
        const TEMPLATE_EDITABLE = @json($TEMPLATE_EDITABLE);
        const CATEGORIES = @json(config('video_template.category'));
    </script>
    <script type="text/javascript" src="{{ url(mix('js/pages/users/browse-video-template.js'), [], config('site.ssl_tf')) }}"></script>
@endsection
