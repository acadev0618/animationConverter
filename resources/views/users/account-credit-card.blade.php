@extends('layouts.users-base')
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="settings-panel">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.change_card') }}</li>
            </ul>
        </div>
        <div class="header mt-lg-4">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-10 h4 text-underline">
                    {{ trans('application.change_card') }}
                </div>
            </div>
        </div>
        <div class="page">
            <div class="page-body mt-lg-5 mt-sm-3">
                <form action="{{ secure_routing(route('save-credit-card')) }}" enctype="multipart/form-data" method="POST" target="_self" class="form-group">
                    @csrf
                    <div class="row">
                        <label class="col-md-3 col-form-label" for="credit_card_number">Credit Card Number</label>
                        <div class="col-md-5">
                            <input type="text" minlength="6" class="form-control" id="credit_card_number" name="credit_card_number"
                                   placeholder="Credit Card Number" value="{{ $data['credit_card_number'] }}" required/>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <label class="col-md-3 col-form-label" for="credit_card_expire_month">Expire Date</label>
                        <div class="col-lg-1 col-md-2 col-sm-2">
                            <input type="number" class="form-control" id="credit_card_expire_month" name="credit_card_expire_month"
                                   placeholder="MM" min="1" max="12" value="{{ $data['credit_card_expire_month'] }}" required/>
                        </div>
                        <div>/</div>
                        <div class="col-lg-1 col-md-2 col-sm-2">
                            <input type="number" class="form-control" id="credit_card_expire_year" name="credit_card_expire_year" min="19" max="99"
                                   value="{{ $data['credit_card_expire_year'] }}" placeholder="YY" required/>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <label class="col-md-3 col-form-label" for="credit_card_name">Name On Card</label>
                        <div class="col-md-5">
                            <input type="text" minlength="2" class="form-control" id="credit_card_name" min="6" name="credit_card_name"
                                   value="{{ $data['credit_card_name'] }}" placeholder="Name On Card" required/>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <label class="col-md-3 col-form-label" for="credit_card_cvv">CVC</label>
                        <div class="col-lg-1 col-md-2 col-sm-2">
                            <input type="text" minlength="3" class="form-control" id="credit_card_cvv" name="credit_card_cvv"
                                   value="{{ $data['credit_card_cvv'] }}" placeholder="CVC" required/>
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
