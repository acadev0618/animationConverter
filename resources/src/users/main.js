window.left_open = true;

function toggleButton(option) {
    if (option === 'open') {
        window.left_open = true;
    } else if (option === 'close') {
        window.left_open = false;
    } else if (option === 'toggle') {
        window.left_open = !window.left_open;
    }
    if (window.left_open) {
        $('#user-sidebar').removeClass('active');
        $('#sidebarCollapse').removeClass('active');
        $('.main-content').addClass('is-active');
    } else {
        $('#user-sidebar').addClass('active');
        $('#sidebarCollapse').addClass('active');
        $('.main-content').removeClass('is-active');
    }
}

if (document.querySelector('#preloader')) {
    document.querySelector('#preloader').remove();
}

$(function () {
    if (window._vAppConfig.page_title === 'Editor') {
        window.left_open = false;
    }
    
    if ($('body').width() < 1210) {
        window.left_open = false;
    }
    
    toggleButton('open');
    
    $('#sidebarCollapse').on('click', function () {
        toggleButton('toggle');
    });
    
    $(window, document).on('resize', function () {
        if ($('body').width() < 1210) {
            toggleButton('close');
        } else {
            if (window._vAppConfig.page_title !== 'Editor') {
                toggleButton('open');
            }
        }
    });
    
    /**
     * Footer support btn click
     */
    $('#help-btn').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('#send-support-message').addClass('active');
        } else {
            $('#send-support-message').removeClass('active');
        }
    });
    
    $('#upload-icon').on('click', function () {
        $('#attached_file').trigger('click');
    });
    
    $('#attached_file').on('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            $("#file_name").html(file.name);
        } else {
            $("#file_name").html('');
        }
    });
});
