import AppHelper from './../../../app-helper';
import SlidePreview from './../previews/slide-preview';

export default {
    name: "add-new-slide",
    data: function () {
        let slideBoxes = [
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
            },
            {
                height: 0,
                items: []
            },
            {
                height: 0,
                items: []
            }
        ];
        let slides = [
            {
                width: this.$store.state.template.width,
                height: this.$store.state.template.height,
                css: {
                    backgroundColor: 'transparent'
                },
                selectedElement: false,
                elements: [],
                duration: 5000,
                state: 'edit',
                timer: {
                    timeFlag: false,
                    flagSeek: false,
                },
            },
        ];
        AppHelper.fillItemsInBoxes(slideBoxes, slides, 200, 10);
        return {
            emptySlideBoxes: slideBoxes,
            size: 'same',
            filter: {
                category: [],
                design_type: [],
                q: '',
                width: this.$store.state.template.width,
                height: this.$store.state.template.height,
            }
        }
    },
    watch: {
        size(nv, ov) {
            switch (nv) {
                case 'same':
                    this.filter.width = this.$store.state.template.width;
                    this.filter.height = this.$store.state.template.height;
                    break;
                case 'all':
                    this.filter.width = '';
                    this.filter.height = '';
                    break;
            }
        }
    },
    computed: {
        slideBoxes() {
            let slideBoxes = _.cloneDeep(this.emptySlideBoxes);
            let slides = this.$store.getters['slide/filter'](this.filter);
            AppHelper.fillItemsInBoxes(slideBoxes, slides, 200, 10);
            return slideBoxes;
        },
        categories() {
            return this.$store.state.config.template.categories;
        },
        designTypes() {
            return this.$store.state.config.template.designTypes;
        }
    },
    components: {
        SlidePreview
    },
    methods: {
        addSlide(slide) {
            this.matchSlideToTemplate(slide);
            this.$store.commit('template/add_slide', slide);

            let nSlide = this.$store.state.template.slides[this.$store.state.template.slides.length - 1];
            this.$store.dispatch('template/disconnect_with_current');
            this.$store.commit('current_slide/set_with', nSlide);
            this.$store.dispatch('template/connect_with_current');
            this.$store.commit('template/insert_history');
            this.$emit('click_close');
        },
        matchSlideToTemplate(slide) {
            const scaleX = this.$store.state.template.width / slide.width;
            const scaleY = this.$store.state.template.height / slide.height;
            slide.width *= scaleX;
            slide.height *= scaleY;
            slide.elements.map(element => {
                element.width *= scaleX;
                element.height *= scaleY;
                element.x *= scaleX;
                element.y *= scaleY;
            });
            return slide;
        },
        durationFormat(ms) {
            return AppHelper.msToHMS(ms);
        }
    },
    mounted() {
        this.$store.dispatch('slide/load');
        this.$store.dispatch('config/load_template_config');
    },
}
