(function ($) {
    $('.library-nav').click(function () {
        let id = $(this).attr('id'),
            idSplit = id.split('-');
        location.href = 'files?file_type=' + idSplit[0];
    });
    
    $('.upload-library-btn').on('click', function () {
        $('#my-' + $(this).attr('id')).trigger('click');
    });
    
    $('.temp-card').hover(function () {
        $('#bg-control-' + $(this).data('id')).show();
    }, function () {
        $('#bg-control-' + $(this).data('id')).hide();
    });
    
    $('.del-icon').on('click', function () {
        delId = $(this).data('title');
        $('#delFileModal').modal('show');
    });
    
    $('#deleteFile').on('click', function () {
        $.ajax({
            url: '/files/' + delId,
            data: '_token=' + window._vAppConfig.Token,
            method: 'DELETE',
            success: function (re) {
                if (re.status === 'success') {
                    $('#delFileModal').modal('hide');
                    location.reload();
                }
            }
        })
    });
    
    $('.view-btn').on('click', function () {
        viewUrl = $(this).data('url');
        $('#previewFile').attr('src', viewUrl);
        $('#viewFileModal').modal('show');
        if (file_type === 'video') {
            $('#previewDiv').html('');
            var vid = document.createElement('video');
            vid.setAttribute('id', 'previewFile');
            vid.setAttribute('class', 'previewFile img-fluid');
            vid.setAttribute('poster', $(this).data('thumb'));
            vid.setAttribute('src', viewUrl);
            vid.setAttribute('width', '100%');
            vid.setAttribute('height', '400px');
            $('#previewDiv').append(vid);
            window.$('#previewFile').mediaelementplayer({
                pluginPath: "{{ asset('libs/mediaelement/build/') }}",
                shimScriptAccess: 'always'
            });
        }
    });
    
    $('#viewFileModal').on('hide.bs.modal', function () {
        viewUrl = '';
        $('#previewFile').attr('src', '');
        if (file_type === 'video') {
            var vid = document.querySelector('#previewFile');
            if (vid) {
                vid.pause();
            }
        }
    });
    
    $('#delFileModal').on('hide.bs.modal', function () {
        delId = '';
    });
    
    $('.slider').on('change', changeSlider).on('mouseup', clickSlider);
    
    function changeSlider() {
        var v = $(this).val();
        var input = document.createElement('input');
        input.type = 'range';
        input.min = '0';
        input.max = '100';
        input.setAttribute('id', $(this).attr('id'));
        input.setAttribute('class', 'slider');
        input.setAttribute('value', v);
        input.setAttribute('data-title', $(this).data('title'));
        input.addEventListener('change', changeSlider);
        input.addEventListener('mouseup', clickSlider);
        $(this).replaceWith(input);
    }
    
    function clickSlider() {
        var v = $(this).val();
        var music_id = $(this).data('title');
        var audio = document.querySelector('#audio-' + music_id);
        if (audio && audio.readyState > 3) {
            if (!audio.paused) {
                audio.pause();
            }
            audio.currentTime = Math.round(((audio.duration * v) / 100) * 100) / 100;
            audio.play();
            $('i#play-icon-' + music_id).hide();
            $('i#pause-icon-' + music_id).show();
        }
    }
    
    $('.play-icon').on('click', function () {
        var music_id = $(this).data('title');
        $('i#pause-icon-' + music_id).show();
        $(this).hide();
        $('tr#tr-' + music_id).show();
        var audio = document.querySelector('#audio-' + music_id);
        if (audio) {
            audio.play();
        }
    });
    
    $('.pause-icon').on('click', function () {
        var music_id = $(this).data('title');
        $('i#play-icon-' + music_id).show();
        $(this).hide();
        var audio = document.querySelector('#audio-' + music_id);
        if (audio && audio.duration > 0 && !audio.paused) {
            audio.pause();
        }
        $('tr#tr-' + music_id).hide();
    });
    
    $('.volume-icon').on('click', function () {
        var music_id = $(this).data('title');
        $('i#mute-icon-' + music_id).show();
        $(this).hide();
        var audio = document.querySelector('#audio-' + music_id);
        if (audio && audio.duration > 0) {
            audio.muted = true;
        }
    });
    
    $('.mute-icon').on('click', function () {
        var music_id = $(this).data('title');
        $('i#volume-icon-' + music_id).show();
        $(this).hide();
        var audio = document.querySelector('#audio-' + music_id);
        if (audio && audio.duration > 0) {
            audio.muted = false;
        }
    });
    
    $('.my-audio').on('timeupdate', function () {
        var audio = $(this).get(0);
        if (audio && audio.readyState > 3 && !audio.paused && audio.duration > 0) {
            var s_val = Math.round((audio.currentTime * 100) / audio.duration);
            var music_id = $(this).data('title');
            $('input#audio-slider-' + music_id).attr('value', s_val).val(s_val);
            if (s_val >= 100) {
                audio.pause();
                audio.currentTime = 0;
                $('input#audio-slider-' + music_id).attr('value', 0).val(0);
                $('i#play-icon-' + music_id).show();
                $('i#pause-icon-' + music_id).hide();
            }
        }
    });
})(jQuery);
