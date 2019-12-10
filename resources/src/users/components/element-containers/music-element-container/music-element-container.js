import AudioPlayer from './../../players/audio-player/audio-player.vue'
import AppHelper from "../../../../app-helper";
export default {
    name: "music-element-container",
    data: function () {
        return {
            library: [],
            myMusic: [],
        }
    },
    computed: {
        usedSound() {
            return this.$store.state.template.sound ? this.$store.state.template.sound : false;
        },
    },
    methods: {
        itemPlay: function (item) {
            item.play_status = 'play';
        },
        itemPause: function (item) {
            item.play_status = 'pause';
        },
        useSound(item) {
            item.used = true;
            this.$store.commit('template/set_sound', item.element);
            this.$store.commit('template/insert_history');
        },
        unUseSound(item) {
            item.used = false;
            this.$store.commit('template/set_sound', false);
            this.$store.commit('template/insert_history');
        },
        uploadSound() {
            let files = this.$refs.audioInput.files;
            if (files.length) {
                this.$store.dispatch('audio/upload_media', files).then((data) => {
                    data.forEach(item => {
                        let iItem = {...item};
                        iItem.play_status = 'pause';
                        iItem.title = item.origin_file_name;
                        iItem.used = false;
                        iItem.element = {
                            content: {
                                src: item.abs_url
                            }
                        };
                        this.myMusic.push(iItem);
                    });
                });
            }
        },
    },
    components: {
        AudioPlayer
    },
    created() {
        this.$store.dispatch('audio/load_library').then(() => {
            this.library = this.$store.state.audio.library.items.map(item => {
                let iItem = {...item};
                iItem.play_status = 'pause';
                iItem.used = false;
                iItem.element = {
                    content: {
                        src: item.abs_url
                    }
                };
                return iItem;
            });
        });
        this.$store.dispatch('audio/load_my_music').then(res => {
            this.myMusic = this.$store.state.audio.my_music.items.map(item => {
                let iItem = {...item};
                iItem.play_status = 'pause';
                iItem.title = item.origin_file_name;
                iItem.used = false;
                iItem.element = {
                    content: {
                        src: item.abs_url
                    }
                };
                return iItem;
            });
        });
    }
}
