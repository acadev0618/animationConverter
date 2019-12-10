@extends('layouts.admin-base')
@section('scripts')
    <script>
        window._vAppConfig.user_info = {
            name: '{{ auth()->user()->name }}',
            picture: '{{ auth()->user()->img_ext && !empty(auth()->user()->img_ext) ? getConfig('users_image') . '/' . auth()->user()->id . '.' . auth()->user()->img_ext : '/images/user.jpg' }}',
        };
        window._vAppConfig.countries = '{!! json_encode($countries) !!}';
    </script>
@endsection
