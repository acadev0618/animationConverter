@if($successMessage = session('success'))
    <div class="alert alert-success alert-block font-weight-bold">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {!! $successMessage !!}
        {!! session(['success' => '']) !!}
    </div>
@endif
@if($successMessage = session('info'))
    <div class="alert alert-info alert-block font-weight-bold">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {!! $successMessage !!}
        {!! session(['info' => '']) !!}
    </div>
@endif
@if($errorMessage = session('error'))
    <div class="alert alert-danger alert-block font-weight-bold">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        {!! $errorMessage !!}
        {!! session(['error' => '']) !!}
    </div>
@endif
@if($errors->all())
    <div class="alert alert-danger alert-block font-weight-bold">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        @foreach($errors->all() as $error)
            {{ $error }}
        @endforeach
    </div>
@endif
