import TemplatePlayer from './../../components/players/template-player/template-player.vue';
import AppHelper from './../../../app-helper';
import TemplatePreview from './../../components/previews/template-preview';
import vue from "vue";

export default {
    name: "light-preview-template",
    props: {
        videoTemplate: {
            type: [Object, Boolean],
            default: false
        },
        createFrom: {
            type: Boolean,
            default: false,
        }
    },
    components: {
        TemplatePlayer,
        TemplatePreview
    },
    data: function() {
        let previewWidth = this.videoTemplate.width <= 850 ? this.videoTemplate.width : 850;
        if (this.videoTemplate.height * previewWidth / this.videoTemplate.width > 450) {
            previewWidth = this.videoTemplate.width * 450 / this.videoTemplate.height;
        }
        return {
            playerState: 'play',
            playerSeek: 0,
            dialogWidth: 850,
            dialogHeight: 450,
            previewWidth: previewWidth,
            createdAt: AppHelper.dateFormat(this.videoTemplate.created_at),
        }
    },
    methods: {
        onStop() {
            this.playerState = 'pause';
            this.playerSeek = 3000;
            this.$refs.templatePlayer.gotoAndPause(3000);
        },
        onHidden() {
            this.playerState = 'play';
            this.playerSeek = 0;
            this.$emit('hidden');
        },
        formatDuration(ms) {
            return AppHelper.msToHMS(ms);
        },
        checkClose($event) {
            if ( !this.$refs.modalContent.contains($event.target) ) {
                this.onHidden();
            }
        },
        confirmDelete() {
            this.$dialog
                .confirm('Are you sure you want to delete this?')
                .then((dialog) => {
                    this.deleteTemplate();
                })
                .catch(function() {
                });
        },
        deleteTemplate() {
            let id = this.videoTemplate.id;
            let loader = this.$loading.show();
            vue.axios.post('common/video-template/delete', {where: {id: id}}).then(res => {
                loader.hide();
                this.$emit('after-delete', id);
                return res.data;
            });
        },
    },
    mounted() {
        jQuery('body').addClass('modal-open');
    },
    beforeDestroy() {
        jQuery('body').removeClass('modal-open');
    }
}
