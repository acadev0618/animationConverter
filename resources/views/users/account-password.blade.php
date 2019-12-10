@extends('layouts.users-base')
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="settings-panel">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.change_password') }}</li>
            </ul>
        </div>
        <div class="header mt-lg-4">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-10 h4 text-underline">
                    {{ trans('application.change_password') }}
                </div>
            </div>
        </div>
        <div class="page">
            <div class="page-body mt-lg-5 mt-sm-3">
                <form action="{{ secure_routing(route('save-passwords')) }}" enctype="multipart/form-data" method="POST" target="_self" class="form-group">
                    @csrf
                    <div class="row">
                        <label class="col-md-3 col-form-label" for="current_password">Current Password</label>
                        <div class="col-md-5">
                            <input type="text" class="form-control" id="current_password" name="current_password" placeholder="Current Password" required/>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <label class="col-md-3 col-form-label" for="password">New Password</label>
                        <div class="col-md-5">
                            <input type="password" class="form-control" id="password" name="password" min="6" placeholder="New Password" required/>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <label class="col-md-3 col-form-label" for="password_confirmation">Confirm Password</label>
                        <div class="col-md-5">
                            <input type="password" class="form-control" id="password_confirmation" min="6" placeholder="Confirm Password" name="password_confirmation" required/>
                        </div>
                    </div>
                    <div class="row mt-lg-4 mt-sm-3">
                        <div class="col-md-5 offset-md-3">
                            <button type="submit" class="btn btn-nav-bg">{{ trans('application.save_change') }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        @include('layouts.users-footer')
    </div>
@endsection
