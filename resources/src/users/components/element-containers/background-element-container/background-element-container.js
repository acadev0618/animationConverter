import { Chrome } from 'vue-color'
import AppHelper from '../../../../app-helper';
import AlignDirection from '../../shared/align-direction';

export default {
    name: "background-element-container",
    components: {
        'chrome-picker': Chrome,
        AlignDirection
    },
    data: function () {
        return {
            color: {
                solid: {
                    displayChrome: false,
                    plusColor: '#ff0000',
                },
                gradient: {},
            },
            image: {
                stock_image: {
                    query: '',
                    page: 0,
                    items: [],
                    isLoading: false,
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
                alignDirection: 'center_center',
                fillMode: 'Scale crop',
            },
            video: {
                stock: {
                    query: '',
                    page: 0,
                    items: [],
                    isLoading: false,
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
                }
            },
            options: [
                'Exact fit',
                'Scale crop',
                'No Scale',
            ],
            tab: this.$store.state.editor.sidebar.controlTab ? this.$store.state.editor.sidebar.controlTab : 'color',
            settings: {
                maxScrollbarLength: 60
            }
        };
    },
    methods: {
        imageAlignChange: function() {
            const align = this.image.alignDirection;
            const css = AppHelper.backgroundAlign(align);
            switch (this.image.fillMode) {
                case "Scale crop":
                    css.backgroundSize = 'cover';
                    break;
                case 'No scale':
                    css.backgroundSize = 'auto';
                    break;
                case 'Exact fit':
                    css.backgroundSize = '100% 100%';
                    break;
            }
            this.$store.commit('current_slide/update_css', css);
            this.$store.commit('template/insert_history');
        },
        showColorSolidPicker: function () {
            this.color.solid.displayChrome = true;
            setTimeout(() => {
                document.addEventListener('click', this.documentClick);
            });
        },
        hideColorSolidPicker: function () {
            // this.color.solid.recent.unshift({backgroundColor: this.color.solid.plusColor.hex});
            this.$store.commit('color/add_new_recent', this.color.solid.plusColor.hex);
            document.removeEventListener('click', this.documentClick);
            this.color.solid.displayChrome = false;
        },
        documentClick(e) {
            e.preventDefault();
            var el = this.$refs.colorpicker ? this.$refs.colorpicker.$el : false,
                target = e.target;
            if(!el || (el !== target && !el.contains(target))) {
                this.hideColorSolidPicker()
            }
            return false;
        },
        searchStockImage(query = this.image.stock_image.query) {
            if (query !== this.image.stock_image.query) {
                this.image.stock_image.page = 0;
                this.image.stock_image.query = query;
                this.image.stock_image.items = [];
                this.image.stock_image.boxes.forEach(function (box) {
                    box.height = 0;
                    box.items = [];
                });
            }
            this.image.stock_image.page++;
            this.image.stock_image.isLoading = true;
            this.$store.getters['image/stockSearch']({query: query, page: this.image.stock_image.page, per_page: 50}).then((res) => {
                this.image.stock_image.isLoading = false;
                this.image.stock_image.items = this.image.stock_image.items.concat(res);
                AppHelper.fillItemsInBoxes(this.image.stock_image.boxes, res, 85, 10, 'previewWidth', 'previewHeight');
            });
        },
        uploadPhoto() {
            let files = this.$refs.photoInput.files;
            this.$store.dispatch('image/upload_image', files[0]).then((item) => {
                AppHelper.fillItemsInBoxes(this.image.my_image.boxes, [item], 85, 10, 'width', 'height');
            });
        },
        searchStockVideo(query = this.video.stock.query) {
            if (query !== this.video.stock.query) {
                this.video.stock.page = 0;
                this.video.stock.query = query;
                this.video.stock.items = [];
                this.video.stock.boxes.forEach(function (box) {
                    box.height = 0;
                    box.items = [];
                });
            }
            this.video.stock.page++;
            this.video.stock.isLoading = true;
            this.$store.getters['video/stockSearch']({query: query, page: this.video.stock.page, per_page: 50}).then((res) => {
                this.video.stock.isLoading = false;
                this.video.stock.items = this.video.stock.items.concat(res);
                AppHelper.fillItemsInBoxes(this.video.stock.boxes, res, 85, 10, 'thumb_width', 'thumb_height');
            });
        },
        uploadVideo() {
            let files = this.$refs.videoInput.files;
            this.$store.dispatch('video/upload_video', files[0]).then((item) => {
                AppHelper.fillItemsInBoxes(this.video.my_video.boxes, [item], 85, 10, 'width', 'height');
            });
        },
        setBackground(css) {
            if (this.controlCategory === 'background') {
                this.$store.commit('editor/set_controlValue', css);
            } else {
                this.$store.commit('current_slide/set_css', css);
            }
            this.$store.commit('template/insert_history');
        },
        setBackgroundVideoWithStock(item) {
            let element = {
                realWidth: item.videos.tiny.width,
                realHeight: item.videos.tiny.height,
                size: item.videos.tiny.size,
                width: this.$store.state.template.width,
                height: this.$store.state.template.height,
                content: {
                    thumb_url: item.thumb_url,
                    src: item.videos.tiny.url
                }
            }
            this.$store.commit('current_slide/set_background_video', element);
            this.$store.commit('template/insert_history');
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
        onStockPhotoScroll(event) {
            if (!this.image.stock_image.isLoading) {
                let el = event.target;
                if ( $(el).scrollTop() + $(el).innerHeight() + 30 >= $(el)[0].scrollHeight ) {
                    this.searchStockImage();
                }
            }
        },
        onStockVideoScroll(event) {
            if (!this.video.stock.isLoading) {
                let el = event.target;
                if ( $(el).scrollTop() + $(el).innerHeight() + 30 >= $(el)[0].scrollHeight ) {
                    this.searchStockVideo();
                }
            }
        }
    },
    computed: {
        color_store: function () {
            return  this.$store.state.color;
        },
        graphic_store: function () {
            return this.$store.state.graphic;
        },
        controlCategory() {
            return this.$store.state.editor.sidebar.controlCategory;
        },
        controlTab() {
            return this.$store.state.editor.sidebar.controlTab;
        }
    },
    watch: {
        controlTab(nv, ov) {
            if (nv) {
                $(this.$refs['pane-' + nv]).tab('show');
                this.tab = nv;
            }
        }
    },
    created() {
        this.searchStockImage();
        this.searchStockVideo();
        this.$store.dispatch('image/load_my_image').then((items) => {
            this.image.my_image.items = items;
            AppHelper.fillItemsInBoxes(this.image.my_image.boxes, items, 85, 10, 'width', 'height');
        });
        this.$store.dispatch('video/load_my_video').then((items) => {
            this.video.my_video.items = items;
            AppHelper.fillItemsInBoxes(this.video.my_video.boxes, items, 85, 10, 'width', 'height');
        });
    }
}
