export default {
    name: "add-element-container",
    data: function () {
        return {
            graphicCategoryOptions: [
                {value: "Animals", label: "Animals"},
                {value: "Arrows", label: "Arrows"},
                {value: "Beauty", label: "Beauty"},
                {value: "Fashion", label: "Fashion"},
                {value: "Buildings", label: "Buildings"},
                {value: "Business", label: "Business"},
                {value: "cinema", label: "Cinema"},
                {value: "cooking", label: "Cooking"},
                {value: "education", label: "Education"},
                {value: "emoji", label: "Emoji"},
                {value: "Food", label: "Food"},
                {value: "Gym", label: "Gym"},
                {value: "Health", label: "Health"},
                {value: "Love", label: "Love Dating"},
                {value: "Flags", label: "Flags"},
                {value: "Maps", label: "Maps"},
                {value: "Music", label: "Music Arts"},
                {value: "Nature", label: "Nature"},
                {value: "Occasions", label: "Occasions"},
                {value: "People", label: "People"},
                {value: "Social Logo", label: "Social Logo"},
                {value: "Sports", label: "Sports"},
                {value: "Technology", label: "Technology"},
                {value: "People", label: "People"},
                {value: "Travel", label: "Travel"},
                {value: "Weapons", label: "Weapons"},
                {value: "Weather", label: "Weather"},
            ],
            graphicCategory: {value: "Animals", label: "Animals"},
        }
    },
    computed: {
        graphicElements() {
            return this.$store.getters['element_graphic/filterByTag'](this.graphicCategory.value);
        },
        shapeElements() {
            return this.$store.state.element_shape.elements;
        },
        lineElements() {
            return this.$store.state.element_line.elements;
        }
    },
    methods: {
        addElement(element) {
            this.$store.dispatch('current_slide/add_new', {
                type: 'shape',
                width: element.width,
                height: element.height,
                content: {
                    src: element.thumb_url,
                }
            });
        }
    },
    created() {
        this.$store.dispatch('element_graphic/load_elements');
        this.$store.dispatch('element_shape/load_elements');
        this.$store.dispatch('element_line/load_elements');
    }
}
