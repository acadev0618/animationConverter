@extends('layouts.users-base')
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="dashboard-panel">
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.home') }}</li>
            </ul>
        </div>
        <div class="header">
            <div class="header-title">{{ trans('application.welcome') }}</div>
            <div class="header-description">
                <p>Today is perfect day for building a lot of awesome videos.</p>
                <p>What do you want to do today?</p>
            </div>
        </div>
        <div class="page">
            <div class="page-header">
                <div class="page-header-title">Getting Started</div>
            </div>
            <div class="page-body">
                <div class="img-thumbnail tutorial-thumb">
                    <a href="{{ secure_routing(route('tutorial')) }}">
                        <img src="{{ asset('images/tutorial-thumb.png', config('site.ssl_tf')) }}" alt=""/>
                        <span class="tutorial-label">Tutorial Video</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="page">
            <div class="page-header">
                <div class="page-header-title">{{ trans('application.create_new') }}</div>
            </div>
            <div class="page-body flex-body">
                <div class="tutorial-thumb">
                    <a href="{{ secure_routing(route('browse-template', ['media_type' => 'image'])) }}">
                        <img src="{{ asset('images/rectangle-dash.png', config('site.ssl_tf')) }}" alt=""/>
                        <i class="fas fa-plus"></i>
                        <span class="create-label">Create Image</span>
                    </a>
                </div>
                <div class="tutorial-thumb">
                    <a href="{{ secure_routing(route('browse-template')) }}">
                        <img src="{{ asset('images/rectangle-dash.png', config('site.ssl_tf')) }}" alt=""/>
                        <i class="fas fa-plus"></i>
                        <span class="create-label">Create Video</span>
                    </a>
                </div>
            </div>
        </div>
        @include('layouts.users-footer')
    </div>
@endsection

