@extends('layouts.users-base')
@section('head')
    <link href="{{ asset('css/pages/users/my-library-page.css', config('site.ssl_tf')) }}" rel="stylesheet"/>
@endsection
@section('content')
    @if($file_type == 'video')
        <link rel="stylesheet" href="{{ asset('libs/mediaelement/build/mediaelementplayer.min.css') }}"/>
    @endif
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="library-page">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.my_library') }}</li>
            </ul>
        </div>
        <div class="page">
            <div class="page-body mt-lg-3">
                <ul class="nav nav-tabs" id="libraryTab" role="tablist">
                    @for($i = 0; $i < 3; $i ++)
                        <li class="nav-item">
                            <a class="nav-link{{ $file_type == $type_array[$i] ? ' active' : '' }} library-nav" id="{{ $type_array[$i] }}-tab" data-toggle="tab" href="#{{ $type_array[$i] }}"
                               role="tab" aria-controls="{{ $type_array[$i] }}" aria-selected="{{ $file_type == $type_array[$i] ? 'true' : 'false' }}">
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="control-radio custom-control-input" id="my-{{ $type_array[$i] }}"
                                           name="library_files" {{ $file_type == $type_array[$i] ? 'checked' : '' }}/>
                                    <label class="control-label custom-control-label text-uppercase" for="my-{{ $type_array[$i] }}">My {{ $type_array1[$i] }}s</label>
                                </div>
                            </a>
                        </li>
                    @endfor
                </ul>
                <div class="tab-content" id="libraryTabContent">
                    @for($i = 0; $i < 3; $i ++)
                        <div class="tab-pane fade{{ $file_type == $type_array[$i] ? ' show active' : '' }}" id="{{ $type_array[$i] }}" role="tabpanel" aria-labelledby="{{ $type_array[$i] }}-tab">
                            @if($file_type == 'sound')
                                @if(!request()->request->has('page') || request()->request->get('page') == 1)
                                    <div class="row mt-3">
                                        <div class="col-lg-7 col-md-12">
                                            <div class="music-upload">
                                                <form action="{{ secure_routing(route('files.store')) }}" method="post" enctype="multipart/form-data" id="uploadForm">
                                                    @csrf
                                                    <input type="file" id="my-sound-upload-btn" name="files[]" multiple class="hidden" accept="audio/*"/>
                                                    <button type="button" class="btn btn-primary upload-library-btn" id="sound-upload-btn">
                                                        <i class="fas fa-cloud-upload-alt"></i> Upload
                                                    </button>
                                                    <input type="hidden" name="file_type" value="sound"/>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                @endif
                                <div class="row mt-3">
                                    <div class="col-lg-7 col-md-12">
                                        <table class="table w-100">
                                            <thead class="w-100">
                                            <tr>
                                                <th class="w-75">Title</th>
                                                <th class="w-20">Length</th>
                                                <th class="w-5"></th>
                                            </tr>
                                            </thead>
                                            <tbody class="w-100">
                                            @foreach($files as $file)
                                                <tr>
                                                    <td class="w-75">
                                                        <i class="far fa-play-circle play-icon" data-title="{{ $file->id }}" id="play-icon-{{ $file->id }}"></i>
                                                        <i class="far fa-pause-circle hide pause-icon" data-title="{{ $file->id }}" id="pause-icon-{{ $file->id }}"></i>
                                                        {{ $file->origin_file_name }}
                                                    </td>
                                                    <td class="w-20">
                                                        @if(floor(($file->duration / 1000 / 3600)) > 0)
                                                            {{ floor(($file->duration / 1000 / 3600)) . ':' . sprintf('%02d', floor((floor(($file->duration / 1000 % 3600)) / 60))) . ':' . sprintf('%02d', round((floor(($file->duration / 1000 % 3600)) % 60))) }}
                                                        @else
                                                            {{ sprintf('%02d', floor(($file->duration / 1000 / 60))) . ':' . sprintf('%02d', round(($file->duration / 1000) % 60)) }}
                                                        @endif
                                                    </td>
                                                    <td class="w-5">
                                                        <i class="far fa-trash-alt del-icon" data-title="{{ $file->id }}"></i>
                                                    </td>
                                                </tr>
                                                <tr class="hide" id="tr-{{ $file->id }}">
                                                    <td colspan="3" class="w-100 player-td">
                                                        <i class="fas fa-volume-up volume-icon" id="volume-icon-{{ $file->id }}" data-title="{{ $file->id }}"></i>
                                                        <i class="fas fa-volume-mute hide mute-icon" id="mute-icon-{{ $file->id }}" data-title="{{ $file->id }}"></i>
                                                        <div class="slider-container">
                                                            <input type="range" min="0" max="100" value="0" class="slider" data-title="{{ $file->id }}" id="audio-slider-{{ $file->id }}"/>
                                                        </div>
                                                        <audio class="hidden my-audio" id="audio-{{ $file->id }}" data-title="{{ $file->id }}">
                                                            <source
                                                                src="{{ \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $file->file_name) }}"/>
                                                        </audio>
                                                    </td>
                                                </tr>
                                            @endforeach
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="text-center w-100">
                                    {{ $files->appends(['file_type' => $file_type])->links() }}
                                </div>
                            @else
                                @if($file_type == $type_array[$i])
                                    <div class="row temp-row mt-3">
                                        @if(!request()->request->has('page') || request()->request->get('page') == 1)
                                            <div class="video-list">
                                                <div class="card">
                                                    <div class="card-body upload-card w-100 text-center">
                                                        <div class="icon-sec">
                                                            @if($type_array[$i] == 'photo')
                                                                <i class="fas fa-image"></i>
                                                            @else
                                                                <i class="fas fa-film"></i>
                                                            @endif
                                                        </div>
                                                        <div class="mt-2">
                                                            <div class="h5">Upload your own {{ $type_array1[$i] }}s</div>
                                                            <div class="accept-ext h6">
                                                                @if($type_array[$i] == 'photo')
                                                                    .JPG, .PNG, .SVG or .GIF
                                                                @else
                                                                    .mp4, .webm or .mov
                                                                @endif
                                                            </div>
                                                            <div class="limit-sec h6">
                                                                Max file size 15MB
                                                            </div>
                                                            <div class="mt-3">
                                                                <form action="{{ secure_routing(route('files.store')) }}" method="post" enctype="multipart/form-data" id="uploadForm">
                                                                    @csrf
                                                                    @if($type_array[$i] == 'photo')
                                                                        <input type="file" id="my-{{ $type_array[$i] }}-upload-file" name="files[]" multiple class="hidden" accept="image/*"/>
                                                                    @else
                                                                        <input type="file" id="my-{{ $type_array[$i] }}-upload-file" name="files[]" multiple class="hidden" accept="video/*"/>
                                                                    @endif
                                                                    <button type="button" class="btn btn-primary upload-library-btn" id="{{ $type_array[$i] }}-upload-file">
                                                                        <i class="fas fa-cloud-upload-alt"></i>
                                                                        Upload {{ $type_array1[$i] }}(s)
                                                                    </button>
                                                                    <input type="hidden" name="file_type" value="{{ $file_type }}"/>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                        @foreach($files as $file)
                                            <div class="video-list">
                                                <div class="card no-border-radius temp-card" data-id="{{ $file->id }}">
                                                    <img src="{{ \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $file->thumb_url) }}"
                                                         alt="" class="card-img-top"/>
                                                    <div class="card-body">
                                                        <p class="card-text">{{ $file->origin_file_name }}</p>
                                                        <div class="bg-control" id="bg-control-{{ $file->id }}">
                                                            <div class="control-bg"></div>
                                                            <div class="hover-control w-100">
                                                                <div class="del-control">
                                                                    <i class="far fa-trash-alt del-icon" data-title="{{ $file->id }}"></i>
                                                                </div>
                                                                <div class="view-button">
                                                                    <button type="button" class="btn btn-outline-light view-btn"
                                                                            data-thumb="{{ \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $file->thumb_url) }}"
                                                                            data-url="{{ \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'assets/' . auth()->user()->id . '/' . $file->file_name) }}">
                                                                        <i class="fas fa-eye"></i> View
                                                                    </button>
                                                                </div>
                                                                <div class="temp-info form-inline w-100">
                                                                    <div class="temp-size w-75">
                                                                        {{ $file->width }} &times; {{ $file->height }}
                                                                    </div>
                                                                    <div class="temp-length w-25 text-right">
                                                                        @if($file_type == 'photo')
                                                                            <div class="badge badge-secondary no-border-radius">PNG</div>
                                                                        @else
                                                                            <div class="badge badge-secondary no-border-radius">
                                                                                @if(floor(($file->duration / 1000 / 3600)) > 0)
                                                                                    {{ floor(($file->duration / 1000 / 3600)) . ':' . sprintf('%02d', floor((floor(($file->duration / 1000 % 3600)) / 60))) . ':' . sprintf('%02d', round((floor(($file->duration / 1000 % 3600)) % 60))) }}
                                                                                @else
                                                                                    {{ sprintf('%02d', floor(($file->duration / 1000 / 60))) . ':' . sprintf('%02d', round(($file->duration / 1000) % 60)) }}
                                                                                @endif
                                                                            </div>
                                                                        @endif
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                    <div class="text-center w-100">
                                        {{ $files->appends(['file_type' => $file_type])->links() }}
                                    </div>
                                @endif
                            @endif
                        </div>
                    @endfor
                </div>
            </div>
        </div>
        @include('layouts.users-footer')
    </div>
    <div class="bg-loading">
        <div class="show-status">
            <div class="progress">
                <div id="upload-percent" class="progress-bar progress-bar-striped bg-success" role="progressbar"
                     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div id="upload-status">0%</div>
        </div>
    </div>
    <!-- Delete Modal -->
    <div class="modal fade" id="delFileModal" tabindex="-1" role="dialog" aria-labelledby="delFileModalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="delFileModalLabel">Delete File</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">{{ trans('application.cancel') }}</button>
                    <button type="button" class="btn btn-danger" id="deleteFile">{{ trans('application.delete') }}</button>
                </div>
            </div>
        </div>
    </div>
    <!-- View Modal -->
    <div class="modal fade" id="viewFileModal" tabindex="-1" role="dialog" aria-labelledby="viewFileModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="viewFileModalCenterTitle">File Preview</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    @if($file_type == 'photo')
                        <img src="" alt="" id="previewFile" class="previewFile img-fluid"/>
                    @else
                        <div id="previewDiv">
                            <video id="previewFile" poster="" class="previewFile img-fluid" width="100%" height="100%">
                                <source src=""/>
                            </video>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection
@section('scripts')
    <script type="text/javascript" src="{{ asset('libs/jquery.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('libs/jquery.form.min.js') }}"></script>
    @if($file_type == 'video')
        <script type="text/javascript" src="{{ asset('libs/mediaelement/build/mediaelement-and-player.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('libs/mediaelement/build/renderers/vimeo.min.js') }}"></script>
        <script type="text/javascript" src="{{ asset('libs/mediaelement/build/renderers/twitch.min.js') }}"></script>
    @endif
    <script type="text/javascript">
        var delId = '', viewUrl = '', file_type = '{{ $file_type }}';
        $(function () {
            $('#my-photo-upload-file, #my-video-upload-file, #my-sound-upload-btn').on('change', function () {
                // $('#uploadForm').submit();
                $('.bg-loading').css('display', 'flex');
                var percent = $('#upload-percent');
                var status = $('#upload-status');

                $('#uploadForm').ajaxForm({
                    beforeSend: function () {
                        status.empty();
                        var percentVal = '0%';
                        percent.css('width', '0%');
                        percent.attr('aria-valuenow', 0);
                        status.html('0%');
                    },
                    uploadProgress: function (event, position, total, percentComplete) {
                        percent.css('width', percentComplete + '%');
                        percent.attr('aria-valuenow', percentComplete);
                        status.html(percentComplete + '%');
                    },
                    complete: function (xhr) {
                        status.html(xhr.responseText);
                        $('.bg-loading').css('display', 'none');
                        location.reload();
                    }
                }).submit();
            });
        });
    </script>
    <script type="text/javascript" src="{{ url(mix('js/pages/my-libraries.js'), [], config('site.ssl_tf')) }}"></script>
@endsection
