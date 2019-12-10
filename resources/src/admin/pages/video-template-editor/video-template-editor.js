import vue from "vue";
import AppHelper from './../../../app-helper';

export default {
    name: "template-upload",
    data: () => ({
        models: {
            temp_name: '',
            data_json: '',
            temp_description: '',
            bg_image_url: 'img_01.png',
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
                this.uploadTemplate();
            }
        },
        uploadTemplate() {
            let template = AppHelper.createTemplateFromLottie(this.lottieJson);
            let sets = {
                temp_name: this.models.temp_name,
                temp_description: this.models.temp_description,
                data_json: JSON.stringify(template),
                width: template.width,
                thumb_url: this.models.thumb_url,
                height: template.height,
                duration: template.duration,
                is_model: 1,
                aspect: template.aspect,
                category: this.models.category,
                design_type: JSON.stringify(this.models.design_type),
            };
            this.isLoading = true;
            vue.axios.post('/common/video-template/insert', {sets: sets}).then(res => {
                this.isLoading = false;
                this.$router.push({path: '/template-manage'});
            });
        },
        update() {
            let sets = {
                temp_name: this.models.temp_name,
                temp_description: this.models.temp_description,
                thumb_url: this.models.thumb_url,
                category: this.models.category,
                design_type: JSON.stringify(this.models.design_type),
            };
            this.isLoading = true;
            vue.axios.post('/common/video-template/update', {where: {id: this.id}, sets: sets}).then(res => {
                this.isLoading = false;
                this.$router.push({path: '/template-manage'});
            });
        },
        onJsonInput() {
            try {
                let json = JSON.parse(this.models.data_json);
                this.lottieJson = json;
                this.models.aspect = AppHelper.getAspect(json.w, json.h);
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
            vue.axios.post('/common/video-template/get', {where: {id: id}}).then(res => {
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
