<aside class="left-aside">
    <nav id="user-sidebar">
        <div class="sidebar-header text-center pt-4">
            <a href="{{ secure_routing(route('browse-template')) }}" class="btn btn-outline-info">{{ trans('application.create_new') }}</a>
        </div>
        <ul class="list-unstyled components">
            <li class="{{ isActiveRoute(['dashboard']) }}">
                <a href="{{ secure_routing(route('dashboard')) }}">{{ trans('application.home') }}</a>
            </li>
            <li class="{{ isActiveRoute('browse-template') }}">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="{{ isExpendRoute('browse-template') }}" class="dropdown-toggle">
                    {{ trans('application.browse_template') }}
                </a>
                <ul class="collapse list-unstyled {{ isActiveRoute('browse-template', 'show') }}" id="homeSubmenu">
                    <li class="sub-list {{ request()->request->get('temp_type') == 'video' ? 'active' : '' }}">
                        <a class="sub-item" href="{{ secure_routing(route('browse-template', ['media_type' => 'video'])) }}">
                            {{ trans('application.video_template') }}
                        </a>
                    </li>
                    <li class="sub-list {{ request()->request->get('temp_type') == 'image' ? 'active' : '' }}">
                        <a class="sub-item" href="{{ secure_routing(route('browse-template', ['media_type' => 'image'])) }}">
                            {{ trans('application.image_template') }}
                        </a>
                    </li>
                </ul>
            </li>
{{--            <li>--}}
{{--                <a href="#projectSubmenu" data-toggle="collapse" aria-expanded="true" class="dropdown-toggle">{{ trans('application.my_project') }}</a>--}}
{{--                <ul class="collapse list-unstyled" id="projectSubmenu">--}}
{{--                    <li class="sub-list">--}}
{{--                        <a class="sub-item" href="{{ secure_routing(route('browse-my-template', ['media_type' => 'video'])) }}">--}}
{{--                            {{ trans('application.created_video') }}--}}
{{--                        </a>--}}
{{--                    </li>--}}
{{--                    <li class="sub-list">--}}
{{--                        <a class="sub-item" href="{{ secure_routing(route('browse-my-template', ['media_type' => 'image'])) }}">--}}
{{--                            {{ trans('application.created_image') }}--}}
{{--                        </a>--}}
{{--                    </li>--}}
{{--                </ul>--}}
{{--            </li>--}}
{{--            <li class="{{ isActiveResource('files') }}">--}}
{{--                <a href="#librarySubmenu" data-toggle="collapse" aria-expanded="{{ isExpendRoute('files') }}" class="dropdown-toggle">--}}
{{--                    {{ trans('application.my_library') }}--}}
{{--                </a>--}}
{{--                <ul class="collapse list-unstyled {{ isActiveRoute('files', 'show') }}" id="librarySubmenu">--}}
{{--                    <li class="sub-list {{ request()->request->get('file_type') == 'photo' ? 'active' : '' }}">--}}
{{--                        <a class="sub-item" href="{{ secure_routing(route('files', ['file_type' => 'photo'])) }}">--}}
{{--                            {{ trans('application.my_images') }}--}}
{{--                        </a>--}}
{{--                    </li>--}}
{{--                    <li class="sub-list {{ request()->request->get('file_type') == 'video' ? 'active' : '' }}">--}}
{{--                        <a class="sub-item" href="{{ secure_routing(route('files', ['file_type' => 'video'])) }}">--}}
{{--                            {{ trans('application.my_videos') }}--}}
{{--                        </a>--}}
{{--                    </li>--}}
{{--                    <li class="sub-list {{ request()->request->get('file_type') == 'sound' ? 'active' : '' }}">--}}
{{--                        <a class="sub-item" href="{{ secure_routing(route('files', ['file_type' => 'sound'])) }}">--}}
{{--                            {{ trans('application.my_musics') }}--}}
{{--                        </a>--}}
{{--                    </li>--}}
{{--                </ul>--}}
{{--            </li>--}}
{{--            <li class="divider">--}}
{{--                <span class="line"></span>--}}
{{--            </li>--}}
{{--            <li class="{{ isActiveResource('messages') }}">--}}
{{--                <a href="{{ secure_routing(route('messages')) }}">{{ trans('application.support') }}</a>--}}
{{--            </li>--}}
{{--            <li class="{{ isActiveRoute(['tutorial']) }}">--}}
{{--                <a href="{{ secure_routing(route('tutorial')) }}">{{ trans('application.tutorial') }}</a>--}}
{{--            </li>--}}
{{--            <li class="{{ isActiveRoute(['account-settings', 'change-passwords', 'change-credit-card']) }}">--}}
{{--                <a href="{{ secure_routing(route('account-settings')) }}">{{ trans('application.account_setting') }}</a>--}}
{{--            </li>--}}
{{--            <li>--}}
{{--                <a href="{{ secure_routing(route('login')) }}">{{ trans('application.log_out') }}</a>--}}
{{--            </li>--}}

            <li>
                <a href="{{ secure_routing(route('testPage')) }}">{{ trans('application.test_by') }}</a>
            </li>
        </ul>
    </nav>
</aside>
