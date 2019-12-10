import PrettyCheck from 'pretty-checkbox-vue/check';

export default {
    name: "layer-toolbar",
    data: function () {
        let elements = this.$store.state.current_slide.elements;
        let index = elements.findIndex(element => element.id === this.element.id);

        return {
            showOnAllSlide: false,
            index: index,
        }
    },
    props: {
        element: {
            type: Object,
        }
    },
    components: {
        PrettyCheck
    },
    methods: {
        alignLeft() {
            this.$store.dispatch('current_slide/align_left', this.element.id);
            this.$emit('onChangeStop');
        },
        alignHCenter() {
            this.$store.dispatch('current_slide/align_horizon_center', this.element.id);
            this.$emit('onChangeStop');
        },
        alignRight() {
            this.$store.dispatch('current_slide/align_right', this.element.id);
            this.$emit('onChangeStop');
        },
        alignTop() {
            this.$store.dispatch('current_slide/align_top', this.element.id);
            this.$emit('onChangeStop');
        },
        alignVCenter() {
            this.$store.dispatch('current_slide/align_vertical_center', this.element.id);
            this.$emit('onChangeStop');
        },
        alignBottom() {
            this.$store.dispatch('current_slide/align_bottom', this.element.id);
            this.$emit('onChangeStop');
        },
        orderUp() {
            let elements = this.$store.state.current_slide.elements;
            let index = elements.findIndex(element => element.id === this.element.id);
            elements.splice(index, 1);
            elements.splice(index + 1, 0, this.element);
            this.$emit('onChangeStop');
        },
        isOrderUpAvailable() {
            let elements = this.$store.state.current_slide.elements;
            let index = elements.findIndex(element => element.id === this.element.id);
            return index < elements.length - 1;
        },
        orderDown() {
            let elements = this.$store.state.current_slide.elements;
            let index = elements.findIndex(element => element.id === this.element.id);
            elements.splice(index, 1);
            elements.splice(index - 1, 0, this.element);
            this.$emit('onChangeStop');
        },
        isOrderDownAvailable() {
            let elements = this.$store.state.current_slide.elements;
            let index = elements.findIndex(element => element.id === this.element.id);
            if ( elements[0].type === 'lottie' && elements[0].width === this.$store.state.template.width) {
                return  index > 1;
            } else {
                return  index > 0;
            }
        },
        orderBottom() {
            let elements = this.$store.state.current_slide.elements;
            let index = elements.findIndex(element => element.id === this.element.id);
            elements.splice(index, 1);
            if ( elements[0].type === 'lottie' && elements[0].width === this.$store.state.template.width) {
                elements.splice(1, 0, this.element);
            } else {
                elements.splice(0, 0, this.element);
            }
            this.$emit('onChangeStop');
        },
        orderTop() {
            let elements = this.$store.state.current_slide.elements;
            let index = elements.findIndex(element => element.id === this.element.id);
            elements.splice(index, 1);
            elements.splice(elements.length, 0, this.element);
            this.$emit('onChangeStop');
        },
    }
}
