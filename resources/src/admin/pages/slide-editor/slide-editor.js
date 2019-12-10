import vue from "vue";
import AppHelper from "../../../app-helper";

export default {
    name: "slide-editor",
    data: () => ({
        models: {
            name: '',
            data_json: '',
            thumb_url: '',
            aspect: '',
            lottieJson: false,
            lottieAssets: [],
            category: 'e-commerce',
            design_type: [],
        },
        isLoading: false,
        id: false,
        categories: [],
        designs: [],
        aspects: [],
    }),
    mounted() {
        let id = this.$route.params.id || false;
        if (id) {
            this.id = id;
            this.preload(id);
        }
        vue.axios.post('/common/video-template/get-config').then(res => {
            let config = res.data;
            this.categories = config.category;
            this.designs = config.design_type;
            this.aspects = config.aspect;
        });
    },
    methods: {
        save() {
            if (this.id) {
                this.update();
            } else {
                this.uploadSlide();
            }
        },
        uploadSlide() {
            let slides = AppHelper.createSlideFromLottie(this.lottieJson);
            let slide = slides[0];
            let sets = {
                name: this.models.name,
                data_json: JSON.stringify(slide),
                width: slide.width,
                thumb_url: this.models.thumb_url,
                height: slide.height,
                duration: slide.duration,
                aspect: slide.aspect,
                category: this.models.category,
                design_type: JSON.stringify(this.models.design_type),
            };
            this.isLoading = true;
            vue.axios.post('/common/slide/insert', {sets: sets}).then(res => {
                this.isLoading = false;
                this.$router.push({path: '/slide-manage'});
            });
        },
        update() {
            let sets = {
                name: this.models.name,
                thumb_url: this.models.thumb_url,
                category: this.models.category,
                design_type: JSON.stringify(this.models.design_type),
            };
            this.isLoading = true;
            vue.axios.post('/common/slide/update', {where: {id: this.id}, sets: sets}).then(res => {
                this.isLoading = false;
                this.$router.push({path: '/slide-manage'});
            });
        },
        onJsonInput() {
            try {
                let json = JSON.parse(this.models.data_json);

                if (!this.isJsonValid(json)) {
                    this.$dialog
                        .alert('This Bodymovin includes several slides')
                        .then((dialog) => {
                            this.models.data_json = '';
                        });
                    return ;
                }
                this.lottieJson = json;
                this.models.aspect = AppHelper.getAspect(json.w, json.h);
                if (this.models.name === '') {
                    this.models.name = json.nm;
                }
                if (json && json.assets && json.assets.length) {
                    this.models.lottieAssets = [];
                    json.assets.forEach(asset => {
                        if (asset.p) {
                            asset.u = '';
                            this.models.lottieAssets.push(asset);
                        }
                    });
                }
            } catch(e) {
            }
        },
        isJsonValid(json) {
            return !AppHelper.hasLottieSlide(json);
        },
        uploadPhoto(e, asset) {
            let files = e.target.files;
            if (files.length) {
                this.isLoading = true;
                let formData = new FormData();
                formData.append('file', files[0]);
                formData.append('path', 'libraries/backgrounds');
                return vue.axios.post('/common/file-manage/upload', formData).then(res => {
                    asset.p = res.data.abs_url;
                    if (!this.models.thumb_url) {
                        this.models.thumb_url = asset.p;
                    }
                    this.isLoading = false;
                    return res;
                });
            }
            return  false;
        },
        uploadThumb(e) {
            let files = e.target.files;
            if (files.length) {
                this.isLoading = true;
                let formData = new FormData();
                formData.append('file', files[0]);
                formData.append('path', 'libraries/backgrounds');
                return vue.axios.post('/common/file-manage/upload', formData).then(res => {
                    this.models.thumb_url = res.data.abs_url;
                    this.isLoading = false;
                    return res;
                });
            }
            return  false;
        },
        preload(id) {
            vue.axios.post('/common/slide/get', {where: {id: id}}).then(res => {
                let data = res.data;
                delete data.id;
                data.design_type = JSON.parse(data.design_type);
                Object.assign(this.models, data);
            });
        },
        test() {
        }
    }
}
