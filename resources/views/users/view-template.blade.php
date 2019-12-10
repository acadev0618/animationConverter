<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>View Template</title>
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
    <link href="{{ asset('css/users/view-template.css', config('site.ssl_tf')) }}" rel="stylesheet"/>
</head>
<body>
<div class="template-view-wrapper" id="view-template">
    <div class="template-player-wrapper">
        <template-player
            :template="videoTemplate.data_json"
            :control-state="playerState"
            :control-seek="playerSeek"
            :responsive="false"
            ref="templatePlayer"
        ></template-player>
    </div>
    <div class="template-canvas" ref="templateCanvas" :style="{width: videoTemplate.data_json.width + 'px'}">
    </div>
</div>
<script type="text/javascript">
    let videoTemplate = @json($videoTemplate);
</script>
<script type="text/javascript" src="{{ url(mix('js/manifest.js'), [], config('site.ssl_tf'))}}"></script>
<script type="text/javascript" src="{{ url(mix('js/vendor.js'), [], config('site.ssl_tf'))}}"></script>
<script type="text/javascript" src="{{ url(mix('js/view-template.js'), [], config('site.ssl_tf'))}}"></script>
</body>
</html>
