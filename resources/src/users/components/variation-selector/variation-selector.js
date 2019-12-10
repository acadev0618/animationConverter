export default {
    name: "variation-selector",
    data() {
        return {
            custom: {
                width: '',
                height: ''
            },
            items: [
                {
                    width: 600,
                    height: 600,
                    thumb: './../../../assets/icon/facebook-square.svg',
                    design: 'Facebook'
                },
                {
                    width: 1200,
                    height: 628,
                    thumb: './../../../assets/icon/facebook-1200-628.svg',
                    design: 'Facebook'
                },
                {
                    width: 1080,
                    height: 1920,
                    thumb: './../../../assets/icon/facebook-square.svg',
                    design: 'Facebook'
                },
                {
                    width: 1080,
                    height: 1080,
                    thumb: './../../../assets/icon/instagram-square.svg',
                    design: 'Instagram'
                },
                {
                    width: 1080,
                    height: 608,
                    thumb: './../../../assets/icon/instagram-square.svg',
                    design: 'Instagram'
                },
            ]
        }
    },
    methods: {
        checkClose($event) {
            if ( !this.$refs.modalContent.contains($event.target) ) {
                this.onHidden();
            }
        },
        onHidden() {
            this.$emit('hidden');
        },
        selectVariation(item) {
            this.$emit('select', {
                width: item.width,
                height: item.height,
                design_type: item.design.toLowerCase()
            });
        },
        createCustom() {
            this.$emit('select', {
                width: this.custom.width,
                height: this.custom.height
            });
        }
    }
}
