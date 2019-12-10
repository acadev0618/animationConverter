import AppHelper from "../../../../app-helper";

export default {
    name: "image-element-container",
    data: function () {
        return {
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
            }
        };
    },
    methods: {
        searchStockImage(query = this.stock.query) {
            if (query !== this.stock.query) {
                this.stock.page = 0;
                this.stock.query = query;
                this.stock.items = [];
                this.stock.boxes.forEach(function (box) {
                    box.height = 0;
                    box.items = [];
                });
            }
            this.stock.page++;
            this.stock.isLoading = true;
            this.$store.getters['image/stockSearch']({query: query, page: this.stock.page, per_page: 50}).then((res) => {
                this.stock.isLoading = false;
                this.stock.items = this.stock.items.concat(res);
                AppHelper.fillItemsInBoxes(this.stock.boxes, res, 85, 10, 'previewWidth', 'previewHeight');
            });
        },
        uploadPhoto() {
            let files = this.$refs.photoInput.files;
            if (files.length) {
                this.$store.dispatch('image/upload_image', files[0]).then((item) => {
                    AppHelper.fillItemsInBoxes(this.my_image.boxes, [item], 85, 10, 'width', 'height');
                });
            }
        },
        addStock(item) {
            this.$store.dispatch('current_slide/add_new', {
                type: 'image',
                width: item.webformatWidth,
                height: item.webformatHeight,
                fill_mode: 'scale_crop',
                content: {
                    src: item.webformatURL,
                    width: item.webformatWidth,
                    height: item.webformatHeight,
                }
            });
        },
        addMyImage(item) {
            this.$store.dispatch('current_slide/add_new', {
                type: 'image',
                width: item.width,
                height: item.height,
                fill_mode: 'scale_crop',
                content: {
                    src: item.abs_url,
                    width: item.width,
                    height: item.height,
                }
            });
        },
        onStockPhotoScroll(event) {
            if (!this.stock.isLoading) {
                let el = event.target;
                if ( $(el).scrollTop() + $(el).innerHeight() + 30 >= $(el)[0].scrollHeight ) {
                    this.searchStockImage();
                }
            }
        }
    },
    created() {
        this.searchStockImage();
        this.$store.dispatch('image/load_my_image').then((items) => {
            this.my_image.items = items;
            AppHelper.fillItemsInBoxes(this.my_image.boxes, items, 85, 10, 'width', 'height');
        });
    }
}
