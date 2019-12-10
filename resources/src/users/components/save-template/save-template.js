import _ from "lodash";
import Vue from "vue";
import AppHelper from './../../../app-helper';
import VueSelect from 'vue-select'

export default {
    name: "save-template",
    props: {
        videoTemplate: {
            type: Object,
            required: true
        },
        createFrom: {
            type: Boolean,
            default: true,
        },
        templateEditable: {
            type: Boolean,
            default: false,
        }
    },
    data: function () {
        let template = Object.assign({}, this.videoTemplate.data_json);
        delete template.history;
        template = _.cloneDeep(template);
        template.timeSeek = 0;
        template.slides.forEach(slide => {
            slide.state = 'initial';
            if (this.videoTemplate.media_type === 'image') {
                slide.animation.in = false;
                slide.animation.space = 0;
                slide.animation.nextEnter = false;
            }
            slide.elements.forEach(element => {
                element.state = 'initial';
                if (this.videoTemplate.media_type === 'image') {
                    element.animation.in = false;
                    element.animation.out = false;
                    element.animation.play = false;
                }
            });
        });
        let sets = {
            temp_name: this.videoTemplate.temp_name ? videoTemplate.temp_name : '',
            temp_description: this.videoTemplate.temp_description ? videoTemplate.temp_description : '',
            data_json: JSON.stringify(template),
            sound_url: template.sound ? template.sound.content.src : '',
            width: template.width,
            height: template.height,
            duration: AppHelper.getTemplateDuration(template),
            media_type: this.videoTemplate.media_type,
            is_model: this.templateEditable ? 1 : 0,
            category: this.videoTemplate.category,
            design_type: this.videoTemplate.design_type,
            aspect: this.videoTemplate.aspect ? this.videoTemplate.aspect : AppHelper.getAspect(this.videoTemplate.width, this.videoTemplate.height),
        };
        if (this.videoTemplate.thumb_url) {
            sets.thumb_url = this.videoTemplate.thumb_url;
        }
        return {
            sets: sets,
            template: template,
            isLoading: false
        }
    },
    computed: {
        categories() {
            return this.$store.state.config.template.categories;
        },
        designTypes() {
            return this.$store.state.config.template.designTypes;
        }
    },
    methods: {
        insert() {
            this.isLoading = true;
            let sets = _.cloneDeep(this.sets);
            sets.design_type = JSON.stringify( sets.design_type );
            Vue.axios.post('common/video-template/insert', {sets: sets}).then(res => {
                this.isLoading = false;
                this.$emit('after-save', res.data);
            });
        },
        update() {
            this.isLoading = true;
            const where = {id: this.videoTemplate.id};
            let sets = _.cloneDeep(this.sets);
            sets.design_type = JSON.stringify( sets.design_type );
            Vue.axios.post('common/video-template/update', {where: where, sets: sets}).then(res => {
                this.isLoading = false;
                this.$emit('after-save', this.sets);
            });
        },
        save() {
            if (this.createFrom) {
                this.insert();
            } else {
                if (this.videoTemplate.id) {
                    this.update();
                } else {
                    this.insert();
                }
            }
        },
        templateNameInput() {
            this.template.name = this.sets.temp_name;
            this.sets.data_json = JSON.stringify(this.template);
        },
        templateDescriptionInput() {
            this.template.description = this.sets.temp_description;
            this.sets.data_json = JSON.stringify(this.template);
        }
    },
    components: {
        VueSelect
    },
    mounted() {
        this.$store.dispatch('config/load_template_config');
    }
}
