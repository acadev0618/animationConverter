import draggable from 'vuedraggable'

export default {
    name: "videoTstLayer",
    data: function() {
        return {
            dragOptions: {
                animation: 200,
            },
        }
    },
    computed: {
        elements: {
            get() {
                return this.$store.state.current_slide.elements.slice().reverse();
            },
            set(value) {
                return this.$store.commit('current_slide/update_element_sort', value.slice().reverse());
            }
        },
        slide_store: function () {
            return this.$store.state.current_slide;
        },
        template_store: function () {
            return this.$store.state.template;
        },
        canBackward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            return index > 0;
        },
        canForward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            return index < this.template_store.slides.length - 1;
        },
    },
    methods: {
        setSelected(element) {
            this.$store.commit('current_slide/set_selected', element.id);
        },
        slideBackward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            this.setCurrentSlide(this.template_store.slides[index - 1]);
        },
        slideForward() {
            let index = this.template_store.slides.findIndex(slide => slide.id === this.slide_store.id);
            this.setCurrentSlide(this.template_store.slides[index + 1]);
        },
        setCurrentSlide(slide) {
            if (slide.id !== this.$store.state.current_slide.id) {
                this.$store.dispatch('template/disconnect_with_current');
                this.$store.commit('current_slide/set_with', slide);
                this.$store.dispatch('template/connect_with_current');
            }
        },
    },
    components: {
        draggable
    }
}
