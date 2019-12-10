<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Video') }} | {{ $page_title }}</title>
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
    <!-- Scripts -->
    <script src="{{ asset('libs/pace.js', config('site.ssl_tf')) }}"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
    <script>
        window.laravel = '{!! json_encode(['csrfToken' => csrf_token()]) !!}';

        {{--window._vAppConfig = {--}}
        {{--    is_editor: '{!! isAdminUser() ? 1 : 0 !!}',--}}
        {{--    page_title: '{{ $page_title }}',--}}
        {{--    BASE: '{{ request()->root() }}',--}}
        {{--    Token: JSON.parse(window.laravel).csrfToken,--}}
        {{--    photo: "{{ auth()->user()->user_profile()->first()->image_ext !== '' && !empty(auth()->user()->user_profile()->first()->image_ext) ? \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'avatars/' . auth()->user()->id . '.' . auth()->user()->user_profile()->first()->image_ext) : '/images/user.jpg' }}"--}}
        // };
    </script>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
    @section('head')
    @show
</head>
<body>
<div id="app">
    @include('layouts.users-topnavbar')
    @include('layouts.users-sidebar')
    @yield('content')
</div>
<script type="text/javascript" src="{{ url(mix('js/manifest.js'), [], config('site.ssl_tf'))}}"></script>
<script type="text/javascript" src="{{ url(mix('js/vendor.js'), [], config('site.ssl_tf'))}}"></script>
<script type="text/javascript" src="{{ url(mix('js/users-main.js'), [], config('site.ssl_tf')) }}"></script>
<script type="text/javascript" src="{{ url(mix('js/users.js'), [], config('site.ssl_tf')) }}"></script>
@section('scripts')
@show
</body>
</html>
