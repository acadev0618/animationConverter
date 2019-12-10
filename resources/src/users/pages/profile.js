import Vue from 'vue';
import myUpload from 'vue-image-crop-upload';
import miniToastr from 'mini-toastr';

miniToastr.init();

new Vue({
    el: '#settings-panel',
    name: 'settings-panel',
    components: {
        'my-upload': myUpload
    },
    data: () => ({
        show: false,
        params: {
            _token: window._vAppConfig.Token
        },
        upload_url: '/account-photo',
        photo: ''
    }),
    mounted() {
        this.setMiniToaster();
        this.photo = window._vAppConfig.photo;
    },
    methods: {
        toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field) {
            this.photo = imgDataUrl;
            $('#user_photo').attr('src', this.photo);
        },
        cropUploadSuccess(jsonData, field) {
            if (jsonData.result === 'success') {
                this.show = false;
            }
        },
        cropUploadFail(status, field) {
            miniToastr['success'](status.code, 'Upload Error')
        },
        setMiniToaster() {
            miniToastr.setIcon('error', 'i', {
                'class': 'fas fa-times'
            });
            miniToastr.setIcon('warn', 'i', {
                'class': 'fas fa-exclamation-triangle'
            });
            miniToastr.setIcon('info', 'i', {
                'class': 'fas fa-info-circle'
            });
            miniToastr.setIcon('success', 'i', {
                'class': 'fas fa-arrow-circle-o-down'
            });
        }
    }
});
