@extends('layouts.users-base')
@section('content')
    <link rel="stylesheet" href="{{ asset('libs/mediaelement/build/mediaelementplayer.min.css') }}"/>
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="tutorial-panel">
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.tutorial') }}</li>
            </ul>
        </div>
        <div class="header">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-5 col-sm-10 text-center h3">
                    {{ trans('application.tutorial') }}
                    <hr/>
                </div>
            </div>
        </div>
        <div class="page">
            <div class="page-body mt-lg-5 mt-sm-3 row">
                <div class="col-lg-7 col-md-9 col-sm-12 vid-sec">
                    <video class="tutorial-video" id="tutorial-player" poster="{{ \Illuminate\Support\Facades\Storage::url('libraries/backgrounds/wide_01.jpg') }}"
                           width="100%" height="100%">
                        <source type="video/mp4" src="{{ \Illuminate\Support\Facades\Storage::url('libraries/videos/tutorial.mp4') }}"/>
                    </video>
                </div>
            </div>
        </div>
        @include('layouts.users-footer')
    </div>
@endsection
@section('scripts')
    <script type="text/javascript" src="{{ asset('libs/jquery.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('libs/mediaelement/build/mediaelement-and-player.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('libs/mediaelement/build/renderers/vimeo.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('libs/mediaelement/build/renderers/twitch.min.js') }}"></script>
    <script type="text/javascript">
        window.onload = function () {
            $('#tutorial-player').mediaelementplayer({
                pluginPath: "{{ asset('libs/mediaelement/build/') }}",
                shimScriptAccess: 'always'
            });
        };
    </script>
@endsection
