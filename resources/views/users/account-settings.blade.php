@extends('layouts.users-base')
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="settings-panel">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.account_setting') }}</li>
            </ul>
        </div>
        <div class="header mt-lg-4">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-10 h4 text-underline">
                    {{ trans('application.account_setting') }}
                </div>
            </div>
        </div>
        <div class="page">
            <div class="page-body mt-lg-5 mt-sm-3">
                <div class="row mb-3">
                    <label class="col-md-3 col-form-label">
                        <img :src="photo" class="rounded-circle img-fluid user-photo" alt="User Image" @click="toggleShow"/>
                    </label>
                    <div class="col-md-5">
                        <div class="font-weight-bold">
                            Profile Image
                        </div>
                        <div class="mt-1 small">
                            Select image for your profile
                        </div>
                        <button type="button" class="btn btn-info btn-sm mt-2" @click="toggleShow"><i class="fas fa-upload"></i> Upload</button>
                        <my-upload field="img"
                                   @crop-success="cropSuccess"
                                   @crop-upload-success="cropUploadSuccess"
                                   @crop-upload-fail="cropUploadFail"
                                   v-model="show"
                                   :width="300"
                                   :height="300"
                                   :url="upload_url"
                                   :params="params"
                                   lang-type="en"
                                   img-format="png"></my-upload>
                        <input type="file" id="photo-upload"/>
                    </div>
                </div>
                <form action="{{ secure_routing(route('settings-save')) }}" enctype="multipart/form-data" method="POST" target="_self" class="form-group">
                    @csrf
                    <div class="row">
                        <label class="col-md-3 col-form-label">Email</label>
                        <div class="col-md-5">{{ auth()->user()->email }}</div>
                    </div>
                    <div class="row mt-lg-3 mt-sm-2">
                        <label class="col-md-3 col-form-label" for="name">{{ trans('application.name') }}</label>
                        <div class="col-md-5">
                            <input type="text" class="form-control" id="name" name="name" value="{{ auth()->user()->name }}"/>
                        </div>
                    </div>
                    <div class="row mt-lg-3 mt-sm-2">
                        <label class="col-md-3 col-form-label" for="password">{{ trans('application.password') }}</label>
                        <div class="col-md-5">
                            <input type="password" class="form-control" id="password" value="12345678" readonly/>
                        </div>
                        <div class="col-md-4 mt-sm-2 mt-md-0">
                            <a href="{{ secure_routing(route('change-passwords')) }}" class="btn btn-nav-bg">{{ trans('application.change_password') }}</a>
                        </div>
                    </div>
                    <div class="row mt-md-3 mt-sm-2">
                        <label class="col-md-3 col-form-label">{{ trans('application.current_plan') }}</label>
                        <div class="col-md-2 {{ (auth()->user()->user_plan->plan->trial_plan || auth()->user()->user_plan->plan->free_plan) ? 'red-bold-text' : 'text-success' }}">
                            {{ auth()->user()->user_plan->plan->plan_name }}
                        </div>
                        @if(auth()->user()->user_plan->plan->trial_plan || auth()->user()->user_plan->plan->free_plan == 1)
                            <div class="col-md-2 mt-sm-2 mt-md-0">
                                <a href="#" class="btn btn-success">{{ trans('application.upgrade_to_pro') }}</a>
                            </div>
                            <div class="col-md-5 red-bold-text">
                                <span class="text-underline">Upgrade</span> <span class="small">to a paid plan to download and use the videos you make.</span>
                            </div>
                        @endif
                    </div>
                    <div class="row mt-lg-3 mt-sm-2">
                        <label class="col-md-3 col-form-label">{{ trans('application.credit_card') }}</label>
                        <div class="col-md-5 font-weight-bold">
                            @if(auth()->user()->user_profile->credit_card_expire_on != '0000-00-00')
                                {{ trans('application.visa_ending') }} in
                                {{ round((strtotime(auth()->user()->user_profile->credit_card_expire_on) - strtotime(date('Y-m-d'))) / 3600 / 24) }} Days
                            @else
                                ---
                            @endif
                        </div>
                        <div class="col-md-4 mt-sm-2 mt-md-0">
                            <a href="{{ secure_routing(route('change-credit-card')) }}" class="btn btn-nav-bg">{{ trans('application.change_card') }}</a>
                        </div>
                    </div>
                    <div class="row mt-lg-4 mt-sm-3">
                        <div class="col-md-5 offset-md-3">
                            <button type="submit" class="btn btn-nav-bg">{{ trans('application.save_settings') }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        @include('layouts.users-footer')
    </div>
@endsection
@section('scripts')
    <script src="{{ url(mix('js/pages/profile.js'), [], config('site.ssl_tf')) }}"></script>
@endsection
