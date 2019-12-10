@extends('layouts.users-base')
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ $success_data['action_name'] }}</li>
            </ul>
        </div>
        <div class="page">
            <div class="page-body mt-lg-5 mt-sm-3">
                <div class="row justify-content-center">
                    <div class="col-md-4 col-md-6 col-sm-10 h3 text-center">
                        Saved New {{ $success_data['msg'] }}
                        <hr/>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-5 col-sm-10 h4 text-center">
                        Completed...
                    </div>
                </div>
                <div class="text-center mt-md-4">
                    <a href="{{ $success_data['url'] }}" class="btn btn-nav-bg">BACK</a>
                </div>
            </div>
        </div>
        @include('layouts.users-footer')
    </div>
@endsection
