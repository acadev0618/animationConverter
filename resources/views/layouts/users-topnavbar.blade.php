<header class="user-header fixed-top">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
        @if(isset($customSidebar) && $customSidebar)
            <a href="/" class="navbar-btn btn back-to-main">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
            </a>
        @else
            <button type="button" id="sidebarCollapse" class="navbar-btn btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
        @endif
        <a href="/" class="logo navbar-brand">
            <div class="app-name">{{ config('app.name') }}</div>
        </a>
        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-2 mr-auto">
                @if (session()->get('login_as_user') == 'admin')
                    <li class="nav-item">
                        <a href="{{ url('/login-as-admin', [], config('site.ssl_tf')) }}" class="btn btn-sm btn-outline-secondary">
                            <i class="fas fa-arrow-left"></i> Back to Admin
                        </a>
                    </li>
                @endif
            </ul>

            <ul class="navbar-nav navbar-right">
{{--                @if(auth()->user()->user_plan->plan->trial_plan || auth()->user()->user_plan->plan->free_plan)--}}
                    <li class="nav-item">
                        <button type="button" id="btn-upgrade" class="btn btn-success font-weight-bold text-uppercase">
                            {{ trans('application.upgrade_to_pro') }}
                        </button>
                    </li>
{{--                @endif--}}


                <li class="nav-item" id="profile-setting">
{{--                    <a class="nav-link dropdown-toggle" href="#" id="ProfileDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">--}}

{{--                        <img src="{{ auth()->user()->user_profile()->first()->image_ext !== '' && !empty(auth()->user()->user_profile()->first()->image_ext) ? \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'avatars/' . auth()->user()->id . '.' . auth()->user()->user_profile()->first()->image_ext) : '/images/user.jpg' }}"--}}
{{--                             class="rounded-circle img-fluid" id="user_photo" alt=""/><span class="ml-2">{{ auth()->user()->name }}</span>--}}

{{--                    </a>--}}



{{--                    <div class="dropdown-menu" aria-labelledby="ProfileDropDown">--}}
{{--                        <a class="dropdown-item" href="{{ secure_routing(route('account-settings')) }}">--}}
{{--                            <div class="w100">--}}
{{--                                <i class="fas fa-user-circle"></i> <span>{{ trans('application.account_setting') }}</span>--}}
{{--                            </div>--}}
{{--                        </a>--}}
{{--                        <a class="dropdown-item" href="{{ secure_routing(route('tutorial')) }}">--}}
{{--                            <div class="w100">--}}
{{--                                <i class="fas fa-tv"></i> <span>{{ trans('application.tutorial') }}</span>--}}
{{--                            </div>--}}
{{--                        </a>--}}
{{--                        <a class="dropdown-item" href="{{ secure_routing(route('messages')) }}">--}}
{{--                            <div class="w100">--}}
{{--                                <i class="fas fa-question"></i> <span>{{ trans('application.support') }}</span>--}}
{{--                            </div>--}}
{{--                        </a>--}}
{{--                        <a class="dropdown-item" href="{{ secure_routing(route('login')) }}">--}}
{{--                            <div class="w100">--}}
{{--                                <i class="fas fa-sign-out-alt"></i> <span>{{ trans('application.log_out') }}</span>--}}
{{--                            </div>--}}
{{--                        </a>--}}
{{--                    </div>--}}
                </li>



            </ul>
        </div>
    </nav>
</header>
