import Lottie from 'vue-lottie';
import AppHelper from './../../../../app-helper';

export default {
    name: "text-element-container",
    components: {
        Lottie
    },
    data: function () {
        return {
            customText: this.$store.state.text.custom,
            staticText: this.$store.state.text.static,
            options: [
                'Exact fit',
                'Tile',
                'Scale crop',
                'No Scale',
            ]
        }
    },
    computed: {
        animatedText() {
            return this.$store.getters['bodymovin/filter_by_type']('text_effect');
        }
    },
    methods: {
        addCustom(item) {
            this.$store.dispatch('current_slide/add_new', {
                type: 'text',
                width: 300,
                height: 200,
                content: {
                    style: item.style,
                    text: item.text,
                    html: item.html
                }
            });
        },
        addStatic(item) {
            this.$store.dispatch('current_slide/add_new', {
                type: 'text',
                width: item.width,
                height: 200,
                content: {
                    previewImage: '//cdn.bannersnack.com/banners/bciqb5aak/images/png',
                    style: item.style,
                    html: item.html
                }
            });
        },
        addBodymovinText(item) {
            let size = AppHelper.getLottieSizeByMax(item.json, 200);
            this.$store.dispatch('current_slide/add_new', {
                type: 'lottie',
                width: size.width,
                height: size.height,
                content: {
                    json: item.json
                }
            });
        },
        getLottieOption(json) {
            return {
                animationData: json,
                autoplay: true,
                loop: true,
            }
        }
    },
    mounted() {
        this.$store.dispatch('bodymovin/load');
    }
}
