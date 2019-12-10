import CustomizeVideoModal from "../components/preview-video-template-modal";
import Vue from 'vue';
new Vue({
    el: '#templates-page',
    name: 'templates-page',
    data: {
        templates: pageTemplates.data,
    },
    components: {
        CustomizeVideoModal
    },
    methods: {
        openCVideoModal: function(id){
            var temp = this.templates.find((t) => {
                return parseInt(t.id) === parseInt(id);
            });
            this.$refs.customizeVideoModal.setVideo(temp);
            this.$refs.customizeVideoModal.open();
        }
    }
});

(function ($) {
    $('.library-nav').click(function () {
        let id = $(this).attr('id'),
            idSplit = id.split('-');
        location.href = 'choose-templates?temp_type=' + idSplit[0];
    });

    $('.temp-card').hover(function () {
        $('#bg-control-' + $(this).data('id')).show();
    }, function () {
        $('#bg-control-' + $(this).data('id')).hide();
    });
})(jQuery);
