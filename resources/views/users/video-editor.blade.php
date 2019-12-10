<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Video') }}</title>
    <!-- Meta -->
    <meta name="description" content="Video Custom Edit Application.">
    <!-- keywords -->
    <meta name="keywords" content="Video Edit App, Video, Video Bot, Video Edit, Online Video Generate">
    <link rel="shortcut icon" href="{{ asset('favicon.png', config('site.ssl_tf')) }}"/>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css', config('site.ssl_tf')) }}" rel="stylesheet"/>
    <link href="{{ asset('css/users.css', config('site.ssl_tf')) }}" rel="stylesheet"/>
    <link href="{{ asset('css/users/customize-video.css', config('site.ssl_tf')) }}" rel="stylesheet"/>

    <!-- Scripts -->
    <script src="{{ asset('libs/pace.js', config('site.ssl_tf')) }}"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="site-wrapper">
    @include('layouts.users-topnavbar')
    <div class="page-wrapper" id="customize-video">
        <div class="layout-header">
            <header class="page-header-wrap">
                <div class="row justify-content-between">
                    <div class="col-auto">
                        <div class="search-wrap">
                            <span>Your Video Name:</span>
                            <input type="text" name="video_name" v-model="videoTemplate.temp_name"/>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <div class="history-nav-wrap">
                                    <span class="nav-arrow" @click="historyBack" :disabled="!canHistoryBack">
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             width="485.183px" height="485.183px" viewBox="0 0 485.183 485.183" style="enable-background:new 0 0 485.183 485.183;"
                                             xml:space="preserve">
                                        <g>
                                            <path d="M257.751,113.708c-74.419,0-140.281,35.892-181.773,91.155L0,128.868v242.606h242.606l-82.538-82.532
                                                c21.931-66.52,84.474-114.584,158.326-114.584c92.161,0,166.788,74.689,166.788,166.795
                                                C485.183,215.524,383.365,113.708,257.751,113.708z"/>
                                        </g></svg>
                                    </span>
                                    <span class="nav-arrow" @click="historyForward" :disabled="!canHistoryForward">
                                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             viewBox="0 0 485.215 485.215" style="enable-background:new 0 0 485.215 485.215;"
                                             xml:space="preserve">
                                            <g>
                                                <path d="M227.443,113.724c74.421,0,140.283,35.892,181.773,91.155l75.999-75.994v242.606H242.592l82.523-82.532
                                                    c-21.921-66.52-84.465-114.584-158.326-114.584C74.659,174.375,0,249.064,0,341.17C0,215.541,101.817,113.724,227.443,113.724z"/>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="zoom-wrap d-flex align-items-center">
                                    <span class="zoom-action">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke-width="1" fill-rule="evenodd"><polygon points="6 11 6 13 18 13 18 11"></polygon></g></svg>
                                    </span>
                                    <div class="flex-grow-1 zoom__range-slider">
                                        <range-slider
                                            class="slider"
                                            min="50"
                                            max="150"
                                            step="10"
                                            v-model="zoom">
                                        </range-slider>
                                    </div>
                                    <span class="zoom-action">
                                        <svg width="24px" height="24px" viewBox="0 0 24 24"><g stroke-width="1" fill-rule="evenodd"><path d="M11,13 L6,13 L6,11 L11,11 L11,6 L13,6 L13,11 L18,11 L18,13 L13,13 L13,18 L11,18 L11,13 Z"></path></g></svg>
                                    </span>&nbsp;
                                    <div class="zoom-value" v-cloak>
                                        <span>@{{zoom}}%</span>
                                        <div class="zoom__popup" v-cloak>
                                            <div class="zoom__list">
                                                <div class="list__item" v-for="item in zoomItems" @click="setZoom(item.value)">@{{item.label}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <div class="duration-wrap" v-cloak>
                                    Duration: @{{templateDuration}}s
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div class="save-export-wrap">
                            <div class="btn-group save-as-group mr-2">
                                <button type="button" class="btn btn-success save-btn" @click="save">Save</button>
                                <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="sr-only">Toggle Dropdown</span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <a class="dropdown-item" href="javascript:;" @click="saveAsVideo">Save As Video</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="javascript:;" @click="saveAsImage">Save As Image</a>
                                </div>
                            </div>
                            <button class="export-btn">Export</button>
                        </div>
                    </div>
                </div>
            </header>
        </div>
        <div class="layout-body">
            <div class="page-sidebar-wrap">
                <video-element-container></video-element-container>
            </div>
            <div class="page-content-wrap">
                <video-editor ref="videoEditor"></video-editor>
            </div>
        </div>
        <save-template v-if="saveTemplate" :video-template="saveTemplate" @cancel="saveTemplate = false" v-on:after-save="afterSave" :create-from="createFrom" :template-editable="templateEditable"></save-template>
    </div>
</div>
<script type="text/javascript">
    const TEMPLATE_EDITABLE = @json($TEMPLATE_EDITABLE);
    let videoTemplate = @json($videoTemplate);
    const CREATE_FROM = @json($createFrom);
</script>
<script type="text/javascript" src="{{ url(mix('js/manifest.js'), [], config('site.ssl_tf'))}}"></script>
<script type="text/javascript" src="{{ url(mix('js/vendor.js'), [], config('site.ssl_tf'))}}"></script>
<script type="text/javascript" src="{{ url(mix('js/customize-video.js'), [], config('site.ssl_tf'))}}"></script>
</body>
</html>
