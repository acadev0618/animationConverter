export default {
    name: "setting-toolbar",
    props: {
        element: {
            type: Object
        }
    },
    data: function () {
        return {
            fillModeOptions: [
                {
                    label: 'Scale Crop',
                    value: 'scale_crop'
                },
                {
                    label: 'Exact Fit',
                    value: 'exact_fit'
                },
                {
                    label: 'No Scale',
                    value: 'no_scale'
                },
                {
                    label: 'Crop',
                    value: 'crop'
                },
            ],
            fillMode: this.element.fill_mode,
        }
    },
    methods: {
        onFillModeInput() {
            if (this.fillMode === 'crop') {
                this.$emit('crop');
            } else {
                this.$store.commit('current_slide/update', {id: this.element.id, sets: {fill_mode: this.fillMode}});
            }
        }
    }
}
