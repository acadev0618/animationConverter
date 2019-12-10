@extends('layouts.app')
@section('scripts')
    <script>
        window._vAppConfig.resetInfo = {
            email: '{{ $email }}',
            token: '{{ $token }}'
        };
    </script>
@endsection
