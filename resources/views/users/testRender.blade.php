<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Video') }}</title>
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
    <link href="{{ asset('css/users/customize-video.css', config('site.ssl_tf')) }}" rel="stylesheet"/>

    <!-- Scripts -->
    <script src="{{ asset('libs/pace.js', config('site.ssl_tf')) }}"></script>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->




{{--    <style>--}}
{{--     #test {--}}
{{--         width: 100px;--}}
{{--         height:100px;--}}
{{--         margin: 0px auto;--}}
{{--     }--}}
{{--    </style>--}}

    <style>
    canvas {
      width: 800px;
      height:800px;
      margin: 0px auto;
      position: absolute;
       }

    </style>
</head>
<body >
<div class="site-wrapper">
    @include('layouts.users-testnavbar')
    <div class="page-wrapper" id="customize-video">

{{--        <div class="layout-body">--}}
{{--            <div class="page-content-wrap">--}}
{{--                <canvas-test-editor ref="canvasTestEditor"></canvas-test-editor>--}}

                <video-test-editor ref="videoTestEditor"></video-test-editor>

{{--                <test-video></test-video>--}}

{{--            </div>--}}

{{--            $osi = '{"physical":"cables","data link":"mac address","network":"ip address","transport":"tcp","session":"application connections","presentation":"translation","application":"email"}';--}}
{{--            $osi = json_decode($osi, true);--}}

{{--            echo $osi['physical'];--}}
{{--            echo $osi['data link'];--}}
{{--            echo $osi['network'];--}}
{{--            echo $osi['transport'];--}}
{{--            echo $osi['session'];--}}


{{--                         {{$videoTemplate}}--}}

{{--            <svg width="400" height="110">--}}
{{--                <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />--}}
{{--                Sorry, your browser does not support inline SVG.--}}
{{--            </svg>--}}

{{--        <div style="position: relative;">--}}
{{--            <canvas id="layer1" width="100" height="100"--}}
{{--                    style="position: absolute; left: 0; top: 0; z-index: 0; background-image: url(https://static.pexels.com/photos/158780/leaf-nature-green-spring-158780.jpeg);" onclick="ChangePicture(1)"></canvas>--}}
{{--            <canvas id="layer2" width="100" height="100"--}}
{{--                    style="position: absolute; left: 0; top: 0; z-index: 1; background-image: url(https://static.pexels.com/photos/54320/rose-roses-flowers-red-54320.jpeg);" onclick="ChangePicture(2)"></canvas>--}}
{{--            <canvas id="layer3" width="100" height="100"--}}
{{--                    style="position: absolute; left: 0; top: 0; z-index: 2; background-image: url(https://static.pexels.com/photos/5412/water-blue-ocean.jpg);" onclick="ChangePicture(3)"></canvas>--}}
{{--        </div>--}}



{{--        <test-video></test-video>--}}




    </div>
</div>

<!--div id="new">
  Wobble some <a target="_blank" href="https://codepen.io/dissimulate/details/dJgMaO">jelly</a> <span class="bull">&bull;</span>
  Check out my <a target="_blank" href="https://www.instagram.com/abro_oks/">instagram!</a>
</div-->



{{--<script>--}}
{{--    function drawShape() {--}}
{{--            var ctx = document.getElementById("mycanvas").getContext("2d");--}}
{{--            ctx.fillStyle = "orange";--}}
{{--            ctx.fillRect(0,0,500,500);--}}

{{--            //JSON object--}}
{{--            var buildings = [--}}
{{--                {"id":"ID1", "px":10, "py":50,"w":60, "h":60, "bgColor":"black"},--}}
{{--                {"id":"ID2", "px":110, "py":50,"w":60, "h":60, "bgColor":"grey"},--}}
{{--                {"id":"ID3", "px":220, "py":50,"w":60, "h":60, "bgColor":"yellow"}--}}
{{--            ];--}}

{{--            for(var i = 0; i < buildings.length ; i++ ){--}}
{{--                var line = buildings[i];--}}
{{--                ctx.fillStyle = line.bgColor;--}}
{{--                ctx.fillRect(line.px,line.py,line.w,line.h);--}}
{{--            }--}}
{{--    }--}}
{{--</script>--}}



{{--<script>--}}
{{--    var canvas = document.getElementById("myCanvas");--}}
{{--    var ctx = canvas.getContext("2d");--}}
{{--    ctx.fillStyle = "#ff374b";--}}
{{--    ctx.fillRect(0,0,150,75);--}}
{{--</script>--}}



{{--<script>--}}

{{--    function ChangePicture(layerNumber) {--}}
{{--        if (layerNumber === 1) {--}}
{{--            document.getElementById("layer1").style.zIndex = "0";--}}
{{--            document.getElementById("layer2").style.zIndex = "2";--}}
{{--            document.getElementById("layer3").style.zIndex = "1";--}}
{{--        } else if (layerNumber === 2) {--}}
{{--            document.getElementById("layer1").style.zIndex = "1";--}}
{{--            document.getElementById("layer2").style.zIndex = "0";--}}
{{--            document.getElementById("layer3").style.zIndex = "2";--}}
{{--        } else if (layerNumber === 3) {--}}
{{--            document.getElementById("layer1").style.zIndex = "2";--}}
{{--            document.getElementById("layer2").style.zIndex = "1";--}}
{{--            document.getElementById("layer3").style.zIndex = "0";--}}
{{--        } else {--}}
{{--            console.log("Failed.");--}}
{{--        }--}}
{{--    }--}}

{{--</script>--}}

<script>

    // function initCanvas(){
    //
    //     var ctx = document.getElementById("mycanvas").getContext("2d");
    //     ctx.fillStyle = "orange";
    //     ctx.fillRect(0,0,500,500);
    //
    //     //JSON object
    //     var buildings = [
    //         {"id":"ID1", "px":10, "py":50,"w":60, "h":60, "bgColor":"black"},
    //         {"id":"ID2", "px":110, "py":50,"w":60, "h":60, "bgColor":"grey"},
    //         {"id":"ID3", "px":220, "py":50,"w":60, "h":60, "bgColor":"yellow"}
    //     ];
    //
    //     for(var i = 0; i < buildings.length ; i++ ){
    //         var line = buildings[i];
    //         ctx.fillStyle = line.bgColor;
    //         ctx.fillRect(line.px,line.py,line.w,line.h);
    //     }
    //
    // }
    //
    // window.addEventListener('load',function(event){
    //     initCanvas();
    // } );




</script>




<script type="text/javascript">

    const TEMPLATE_EDITABLE = @json($TEMPLATE_EDITABLE);
    let videoTemplate = @json($videoTemplate);
    const CREATE_FROM = @json($createFrom);
    let vbuildings = @json($cbuildings);
    // let $osi = array('physical' => 'cables', 'data link' => 'mac address', 'network' => 'ip address', 'transport' => 'tcp', 'session' => 'application connections', 'presentation' => 'translation', 'application' => 'email');
    // console.log(videoTemplate);
    // echo json_encode($osi);


</script>
<script type="text/javascript" src="{{ url(mix('js/manifest.js'), [], config('site.ssl_tf'))}}"></script>
<script type="text/javascript" src="{{ url(mix('js/vendor.js'), [], config('site.ssl_tf'))}}"></script>
{{--<script type="text/javascript" src="{{ url(mix('js/customize-video.js'), [], config('site.ssl_tf'))}}"></script>--}}

<script type="text/javascript" src="{{ url(mix('js/customize-test-video.js'), [], config('site.ssl_tf'))}}"></script>

{{--<script type="text/javascript" src="{{ url(mix('js/test-video.js'), [], config('site.ssl_tf'))}}"></script>--}}



</body>
</html>
s
