import RangeSlider from "vue-range-slider";
import AppHelper from "../../../../app-helper";
import AudioPlayer from './../../players/audio-player/audio-player.vue'

export default {
    name: "my-file-element-container",
    data: function () {
        return {
            library: [
                {
                    play_status: 'pause',
                    title: 'Curb Stomp',
                    progress: 0
                },
                {
                    play_status: 'pause',
                    title: 'In The Distance',
                    progress: 0
                },
                {
                    play_status: 'pause',
                    title: 'Only Farwell',
                    progress: 0
                },
                {
                    play_status: 'pause',
                    title: 'Dusk',
                    progress: 0
                },
            ],
            my_image: {
                query: '',
                page: 1,
                items: [],
                boxes: [
                    {
                        height: 0,
                        items: []
                    },
                    {
                        height: 0,
                        items: []
                    },
                    {
                        height: 0,
                        items: []
                    }
                ]
            },
            my_video: {
                query: '',
                page: 1,
                items: [],
                boxes: [
                    {
                        height: 0,
                        items: []
                    },
                    {
                        height: 0,
                        items: []
                    },
                    {
                        height: 0,
                        items: []
                    }
                ]
            },
            myMusic: []
        }
    },
    components: {
        RangeSlider,
        AudioPlayer
    },
    computed: {
        usedSound() {
            return this.$store.state.template.sound ? this.$store.state.template.sound : false;
        }
    },
    methods: {
        itemPlay: function (item) {
            item.play_status = 'play';
        },
        itemPause: function (item) {
            item.play_status = 'pause';
        },
        addMyImage(item) {
            this.$store.dispatch('current_slide/add_new', {
                type: 'image',
                width: item.width,
                height: item.height,
                content: {
                    src: item.thumb_url,
                }
            });
        },
        setBackgroundVideoWithMyVideo(item) {
            let element = {
                realWidth: item.width,
                realHeight: item.height,
                width: this.$store.state.template.width,
                height: this.$store.state.template.height,
                content: {
                    thumb_url: item.thumb_url,
                    src: item.abs_url
                }
            };
            this.$store.commit('current_slide/set_background_video', element);
            this.$store.commit('template/insert_history');
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
        uploadPhoto() {
            let files = this.$refs.photoInput.files;
            if (files.length) {
                this.$store.dispatch('image/upload_image', files[0]).then((item) => {
                    AppHelper.fillItemsInBoxes(this.my_image.boxes, [item], 85, 10, 'width', 'height');
                });
            }
        },
        uploadVideo() {
            let files = this.$refs.videoInput.files;
            if (files.length) {
                this.$store.dispatch('video/upload_video', files[0]).then((item) => {
                    AppHelper.fillItemsInBoxes(this.my_video.boxes, [item], 85, 10, 'width', 'height');
                });
            }
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
    mounted() {
        this.$store.dispatch('image/load_my_image').then((items) => {
            this.my_image.items = items;
            AppHelper.fillItemsInBoxes(this.my_image.boxes, items, 85, 10, 'width', 'height');
        });
        this.$store.dispatch('video/load_my_video').then((items) => {
            this.my_video.items = items;
            AppHelper.fillItemsInBoxes(this.my_video.boxes, items, 85, 10, 'width', 'height');
        });
        this.$store.dispatch('audio/load_my_music').then(() => {
            this.myMusic = this.$store.state.audio.my_music.items.map(item => {
                let iItem = {...item};
                iItem.play_status = 'pause';
                iItem.title = 'My Music';
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
