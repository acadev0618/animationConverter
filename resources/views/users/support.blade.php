@extends('layouts.users-base')
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="support-panel">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.support') }}</li>
            </ul>
        </div>
        <div class="header">
            <div class="row justify-content-center">
                <div class="col-lg-4 col-md-5 col-sm-10 text-center h3">
                    {{ trans('application.support_header') }}
                </div>
            </div>
            <div class="small text-center">Send your question below and we'll get back to you within the next 24 hours.</div>
        </div>
        <div class="page">
            <div class="page-body mt-lg-5 mt-sm-3">
                <form action="{{ secure_routing(route('messages.store')) }}" enctype="multipart/form-data" method="POST" target="_self" class="form-group">
                    @csrf
                    <div class="row justify-content-center">
                        <div class="col-lg-6 col-md-7 col-sm-12">
                            <div class="row">
                                <label class="col-md-3 col-form-label" for="email">{{ trans('application.support_label_email') }}</label>
                                <div class="col-md-9">
                                    <input type="email" class="form-control" id="email" name="email" required/>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <label class="col-md-3 col-form-label" for="message_subject">Subject</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" id="message_subject" name="message_subject" minlength="2" maxlength="200" required/>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <label class="col-md-3 col-form-label" for="message_content">Description</label>
                                <div class="col-md-9">
                                    <textarea class="form-control" rows="6" id="message_content" name="message_content" minlength="10" required></textarea>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-12 text-right">
                                    <input type="file" class="form-control hidden" id="attached_file" name="attached_file" @change="changedFile($event)"
                                           accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*, audio/*, video/*"/>
                                    <i class="fas fa-paperclip pointer-cursor" @click="clickClip"></i>
                                    <i class="fas fa-angle-down pointer-cursor"></i>
                                    <div id="file_name" class="text-right w-100" v-if="models.attache_file !== ''">@{{ models.attache_file }}</div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12 text-right">
                                    <button type="submit" class="btn btn-nav-bg">SEND</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script src="{{ url(mix('js/pages/support.js'), [], config('site.ssl_tf')) }}"></script>
@endsection
