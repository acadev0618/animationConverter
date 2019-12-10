@extends('layouts.users-base')
@section('content')
    <div class="main-content is-active p-lg-4 p-md-3 p-sm-2" id="templates-page">
        @include('layouts.alerts')
        <div class="breadcrumb-line">
            <ul class="breadcrumb">
                <li><a href="{{ secure_routing(route('dashboard')) }}"><i class="icon-home2 position-left"></i> {{ config('app.name') | 'Video' }}</a>/</li>
                <li class="active">{{ trans('application.browse_template') }}</li>
            </ul>
        </div>
        <div class="mt-2 step-section">
            <div class="step-description selected-step">
                <div>Step1</div>
                <div><span class="text-underline font-weight-bold">Choose</span> your</div>
                <div>{{ $type_array1[array_search($temp_type, $type_array)] }} template</div>
            </div>
            <div class="step-line"></div>
            <div class="step-description">
                <div>Step2</div>
                <div><span class="text-underline font-weight-bold">Customize</span></div>
                <div>Video, Image, Text and Music</div>
            </div>
            <div class="step-line"></div>
            <div class="step-description">
                <div>Step3</div>
                <div><span class="text-underline font-weight-bold">Export it!</span></div>
                <div>Done</div>
            </div>
        </div>
        <div class="page">
            <div class="page-body mt-lg-3">
                <ul class="nav nav-tabs" id="libraryTab" role="tablist">
                    @for($i = 0; $i < 2; $i ++)
                        <li class="nav-item">
                            <a class="nav-link{{ $temp_type == $type_array[$i] ? ' active' : '' }} library-nav" id="{{ $type_array[$i] }}-tab" data-toggle="tab" href="#{{ $type_array[$i] }}"
                               role="tab" aria-controls="{{ $type_array[$i] }}" aria-selected="{{ $temp_type == $type_array[$i] ? 'true' : 'false' }}">
                                <div class="custom-control custom-radio custom-control-inline">
                                    <input type="radio" class="control-radio custom-control-input" id="my-{{ $type_array[$i] }}"
                                           name="library_files" {{ $temp_type == $type_array[$i] ? 'checked' : '' }}/>
                                    <label class="control-label custom-control-label text-uppercase" for="my-{{ $type_array[$i] }}">{{ $type_array1[$i] }} Templates</label>
                                </div>
                            </a>
                        </li>
                    @endfor
                </ul>
                <div class="tab-content" id="libraryTabContent">
                    @if($temp_type == 'video')
                        <div class="tab-pane fade show active" id="video" role="tabpanel" aria-labelledby="video-tab">
                            <form action="{{ secure_routing(route('choose-templates')) }}" method="get" id="tempForm">
                                <div class="row mt-3">
                                    <div class="col-md-9 col-sm-12">
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="categoryMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.category') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="categoryMenu">
                                                @for($j = 0; $j < count(config('site.category-type')); $j ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ $j }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="category" value="{{ $j }}"
                                                                   id="category-{{ $j }}"{{ request()->request->has('category') ? (request()->request->get('category') == $j ? ' checked' : '') : '' }}/>
                                                            <label class="custom-control-label" for="category-{{ $j }}">
                                                                {{ config('site.category-type')[$j] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                                <div class="dropdown-divider m-0"></div>
                                                <div class="text-right">
                                                    <button type="button" class="btn btn-sm btn-light reset-btn" data-id="category" data-title="{{ $temp_type }}">&times; Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="aspectMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.aspect_ratio') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="aspectMenu">
                                                @for($k = 0; $k < count(config('site.aspect-type')); $k ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ config('site.aspect-type')[$k] }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="aspect" id="aspect-{{ config('site.aspect-type')[$k] }}"
                                                                   value="{{ $k }}"{{ request()->request->has('aspect') ? (request()->request->get('aspect') == $k ? ' checked' : '') : '' }}>
                                                            <label class="custom-control-label" for="aspect-{{ config('site.aspect-type')[$k] }}">
                                                                {{ config('site.aspect-type')[$k] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                                <div class="dropdown-divider m-0"></div>
                                                <div class="text-right">
                                                    <button type="button" class="btn btn-sm btn-light reset-btn" data-id="aspect" data-title="{{ $temp_type }}">&times; Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="assetMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.customize_for') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="assetMenu">
                                                @for($l = 0; $l < count(config('site.asset-type')); $l ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ config('site.asset-type')[$l] }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="assets-sel" id="asset-{{ $l }}"
                                                                   value="{{ $l }}"{{ request()->request->has('assets-sel') ? (request()->request->get('assets-sel') == $l ? ' checked' : '') : '' }}/>
                                                            <label class="custom-control-label" for="asset-{{ $l }}">
                                                                {{ config('site.asset-type')[$l] }}
                                                                <span class="ml-3">
                                                                            @if($l == 0)
                                                                        <i class="fas fa-video"></i> + <i class="far fa-image"></i>
                                                                    @elseif($l == 1)
                                                                        <i class="far fa-image"></i>
                                                                    @else
                                                                        <i class="fas fa-video"></i>
                                                                    @endif
                                                                        </span>
                                                                <div class="small">{{ config('site.asset-desc')[$l] }}</div>
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                                <div class="dropdown-divider m-0"></div>
                                                <div class="text-right">
                                                    <button type="button" class="btn btn-sm btn-light reset-btn" data-id="asset" data-title="{{ $temp_type }}">&times; Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="designMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.design_type') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="designMenu">
                                                @for($m = 0; $m < count(config('site.design-type')); $m ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ config('site.design-type')[$m] }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="design" id="design-{{ config('site.design-type')[$m] }}"
                                                                   value="{{ $m }}"{{ request()->request->has('design') ? (request()->request->get('design') == $m ? ' checked' : '') : '' }}/>
                                                            <label class="custom-control-label" for="design-{{ config('site.design-type')[$m] }}">
                                                                {{ config('site.design-type')[$m] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                                <div class="dropdown-divider m-0"></div>
                                                <div class="text-right">
                                                    <button type="button" class="btn btn-sm btn-light reset-btn" data-id="design" data-title="{{ $temp_type }}">&times; Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right col-md-3">
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="sortMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.sort_by') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="sortMenu">
                                                @for($n = 0; $n < count(config('site.sort-by')); $n ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ config('site.sort-by')[$n] }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="sort" id="sort-{{ config('site.sort-by')[$n] }}"
                                                                   value="{{ $n }}"{{ request()->request->has('sort') ? (request()->request->get('sort') == $n ? ' checked' : '') : '' }}/>
                                                            <label class="custom-control-label" for="sort-{{ config('site.sort-by')[$n] }}">
                                                                {{ config('site.sort-by')[$n] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="temp-type" name="temp_type" value="{{ $temp_type }}"/>
                            </form>
                            <div class="mt-2 ml-3">
                                {{ count($templates) }} Video Templates designs
                            </div>
                            <div class="mt-3 row temp-row">
                                @foreach($templates as $temp)
                                    <div class="video-list">
                                        <div class="card no-border-radius temp-card" data-id="{{ $temp->id }}" v-on:click="openCVideoModal({{ $temp->id }})">
                                            @if($temp->project_id == '0')
                                                <img src="{{ \Illuminate\Support\Facades\Storage::url('libraries/backgrounds/' . $temp->thumb_url) }}"
                                                     alt="" class="card-img-top"/>
                                            @else
                                                <img alt="" class="card-img-top"
                                                     src="{{ \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'projects/' . auth()->user()->id . '/' . $temp->project_id . '_thumb.png') }}"/>
                                            @endif
                                            <div class="card-body">
                                                <p class="card-text">
                                                    <span class="card-title font-weight-bold">{{ $temp->temp_name }}</span> - {{ $temp->aspect_type }}
                                                </p>
                                                <div class="row">
                                                    <div class="col-7 text-black-50">
                                                        @if($temp->project_id != '0')
                                                            {{ $temp->name }}
                                                        @else
                                                            Template Designer
                                                        @endif
                                                    </div>
                                                    <div class="col-5 text-right">
                                                        <span class="mr-1"><i class="far fa-image"></i> {{ $temp->image_len }}</span>
                                                        <span><i class="fas fa-video"></i> {{ $temp->video_len }}</span>
                                                    </div>
                                                </div>
                                                <div class="bg-control" id="bg-control-{{ $temp->id }}">
                                                    <div class="control-bg"></div>
                                                    <div class="hover-control w-100">
                                                        <div class="view-button">
                                                            <button type="button" class="btn btn-outline-light view-btn" data-title="{{ $temp->id }}">
                                                                @if($temp->temp_type == 'template')
                                                                    <i class="fas fa-check"></i> Customize
                                                                @else
                                                                    <i class="fas fa-eye"></i> View
                                                                @endif
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <div class="text-center w-100">
                                {{ $templates->appends(['temp_type' => $temp_type, 'category' => $category, 'aspect' => $aspect, 'assets-sel' => $asset, 'design' => $design, 'sort' => $sort])->links() }}
                            </div>
                        </div>
                    @elseif($temp_type === 'image')
                        <div class="tab-pane fade show active" id="image" role="tabpanel" aria-labelledby="image-tab">
                            <form action="{{ secure_routing(route('choose-templates')) }}" method="get" id="tempForm">
                                <div class="row mt-3">
                                    <div class="col-md-9 col-sm-12">
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="categoryMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.category') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="categoryMenu">
                                                @for($j = 0; $j < count(config('site.category-type')); $j ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ $j }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="category" value="{{ $j }}"
                                                                   id="category-{{ $j }}"{{ request()->request->has('category') ? (request()->request->get('category') == $j ? ' checked' : '') : '' }}/>
                                                            <label class="custom-control-label" for="category-{{ $j }}">
                                                                {{ config('site.category-type')[$j] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                                <div class="dropdown-divider m-0"></div>
                                                <div class="text-right">
                                                    <button type="button" class="btn btn-sm btn-light reset-btn" data-id="category" data-title="{{ $temp_type }}">&times; Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="aspectMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.aspect_ratio') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="aspectMenu">
                                                @for($k = 0; $k < count(config('site.aspect-type')); $k ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ config('site.aspect-type')[$k] }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="aspect" id="aspect-{{ config('site.aspect-type')[$k] }}"
                                                                   value="{{ $k }}"{{ request()->request->has('aspect') ? (request()->request->get('aspect') == $k ? ' checked' : '') : '' }}>
                                                            <label class="custom-control-label" for="aspect-{{ config('site.aspect-type')[$k] }}">
                                                                {{ config('site.aspect-type')[$k] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                                <div class="dropdown-divider m-0"></div>
                                                <div class="text-right">
                                                    <button type="button" class="btn btn-sm btn-light reset-btn" data-id="aspect" data-title="{{ $temp_type }}">&times; Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                        @if($temp_type == 'video')
                                            <div class="dropdown btn-group">
                                                <a class="btn dropdown-toggle" href="#" role="button" id="assetMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    {{ trans('application.customize_for') }}
                                                </a>
                                                <div class="dropdown-menu" aria-labelledby="assetMenu">
                                                    @for($l = 0; $l < count(config('site.asset-type')); $l ++)
                                                        <button type="submit" class="dropdown-item" data-id="{{ config('site.asset-type')[$l] }}" data-title="{{ $temp_type }}">
                                                            <div class="custom-control custom-radio custom-control-inline">
                                                                <input class="custom-control-input" type="radio" name="assets-sel" id="asset-{{ $l }}"
                                                                       value="{{ $l }}"{{ request()->request->has('assets-sel') ? (request()->request->get('assets-sel') == $l ? ' checked' : '') : '' }}/>
                                                                <label class="custom-control-label" for="asset-{{ $l }}">
                                                                    {{ config('site.asset-type')[$l] }}
                                                                    <span class="ml-3">
                                                                            @if($l == 0)
                                                                            <i class="fas fa-video"></i> + <i class="far fa-image"></i>
                                                                        @elseif($l == 1)
                                                                            <i class="far fa-image"></i>
                                                                        @else
                                                                            <i class="fas fa-video"></i>
                                                                        @endif
                                                                        </span>
                                                                    <div class="small">{{ config('site.asset-desc')[$l] }}</div>
                                                                </label>
                                                            </div>
                                                        </button>
                                                    @endfor
                                                    <div class="dropdown-divider m-0"></div>
                                                    <div class="text-right">
                                                        <button type="button" class="btn btn-sm btn-light reset-btn" data-id="asset" data-title="{{ $temp_type }}">&times; Reset</button>
                                                    </div>
                                                </div>
                                            </div>
                                        @endif
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="designMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.design_type') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="designMenu">
                                                @for($m = 0; $m < count(config('site.design-type')); $m ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ config('site.design-type')[$m] }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="design" id="design-{{ config('site.design-type')[$m] }}"
                                                                   value="{{ $m }}"{{ request()->request->has('design') ? (request()->request->get('design') == $m ? ' checked' : '') : '' }}/>
                                                            <label class="custom-control-label" for="design-{{ config('site.design-type')[$m] }}">
                                                                {{ config('site.design-type')[$m] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                                <div class="dropdown-divider m-0"></div>
                                                <div class="text-right">
                                                    <button type="button" class="btn btn-sm btn-light reset-btn" data-id="design" data-title="{{ $temp_type }}">&times; Reset</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-right col-md-3">
                                        <div class="dropdown btn-group">
                                            <a class="btn dropdown-toggle" href="#" role="button" id="sortMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {{ trans('application.sort_by') }}
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="sortMenu">
                                                @for($n = 0; $n < count(config('site.sort-by')); $n ++)
                                                    <button type="submit" class="dropdown-item" data-id="{{ config('site.sort-by')[$n] }}" data-title="{{ $temp_type }}">
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <input class="custom-control-input" type="radio" name="sort" id="sort-{{ config('site.sort-by')[$n] }}"
                                                                   value="{{ $n }}"{{ request()->request->has('sort') ? (request()->request->get('sort') == $n ? ' checked' : '') : '' }}/>
                                                            <label class="custom-control-label" for="sort-{{ config('site.sort-by')[$n] }}">
                                                                {{ config('site.sort-by')[$n] }}
                                                            </label>
                                                        </div>
                                                    </button>
                                                @endfor
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input type="hidden" id="temp-type" name="temp_type" value="{{ $temp_type }}"/>
                            </form>
                            <div class="mt-2 ml-3">
                                {{ count($templates) }} Image Templates designs
                            </div>
                            <div class="mt-3 row temp-row">
                                @foreach($templates as $temp)
                                    <div class="video-list">
                                        <div class="card no-border-radius temp-card" data-id="{{ $temp->id }}" v-on:click="openCVideoModal({{ $temp->id }})">
                                            @if($temp->project_id == '0')
                                                <img src="{{ \Illuminate\Support\Facades\Storage::url('libraries/backgrounds/' . $temp->thumb_url) }}"
                                                     alt="" class="card-img-top"/>
                                            @else
                                                <img alt="" class="card-img-top"
                                                     src="{{ \Illuminate\Support\Facades\Storage::url(config('site.users-path') . 'projects/' . auth()->user()->id . '/' . $temp->project_id . '_thumb.png') }}"/>
                                            @endif
                                            <div class="card-body">
                                                <p class="card-text">
                                                    <span class="card-title font-weight-bold">{{ $temp->temp_name }}</span> - {{ $temp->aspect_type }}
                                                </p>
                                                <div class="row">
                                                    <div class="col-7 text-black-50">
                                                        @if($temp->project_id != '0')
                                                            {{ $temp->name }}
                                                        @else
                                                            Template Designer
                                                        @endif
                                                    </div>
                                                    <div class="col-5 text-right">
                                                        <span class="mr-1"><i class="far fa-image"></i> {{ $temp->image_len }}</span>
                                                        <span><i class="fas fa-video"></i> {{ $temp->video_len }}</span>
                                                    </div>
                                                </div>
                                                <div class="bg-control" id="bg-control-{{ $temp->id }}">
                                                    <div class="control-bg"></div>
                                                    <div class="hover-control w-100">
                                                        <div class="view-button">
                                                            <button type="button" class="btn btn-outline-light view-btn" data-title="{{ $temp->id }}">
                                                                @if($temp->temp_type == 'template')
                                                                    <i class="fas fa-check"></i> Customize
                                                                @else
                                                                    <i class="fas fa-eye"></i> View
                                                                @endif
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                            <div class="text-center w-100">
                                {{ $templates->appends(['temp_type' => $temp_type, 'category' => $category, 'aspect' => $aspect, 'assets-sel' => $asset, 'design' => $design, 'sort' => $sort])->links() }}
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
        @include('layouts.users-footer')
        <customize-video-modal ref="customizeVideoModal"></customize-video-modal>
    </div>
@endsection
@section('scripts')
    <script type="text/javascript">
        let pageTemplates = @json($templates);
    </script>
    <script type="text/javascript" src="{{ url(mix('js/pages/choose-templates.js'), [], config('site.ssl_tf')) }}"></script>
@endsection
