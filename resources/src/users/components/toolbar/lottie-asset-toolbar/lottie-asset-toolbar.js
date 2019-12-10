import AppHelper from './../../../../app-helper';

export default {
    name: "lottie-asset-toolbar",
    props: {
        element: {
            type: Object,
            required: true
        }
    },
    data: function () {
        let assets = [];
        this.element.content.json.assets.forEach((asset, i) => {
            if (asset.p) {
                assets.push({
                    index: i,
                    id: asset.id,
                    path: asset.p
                });
            }
        });
        return {
            assets: assets,
            selectedAsset: false,
        }
    },
    computed: {
        controlValue() {
            return this.$store.state.editor.controlValue;
        }
    },
    watch: {
        controlValue(nv, ov) {
            if (nv && nv.backgroundImage && this.selectedAsset) {
                let matches = nv.backgroundImage.match(/url\((.+)\)/);
                if (matches && matches.length > 1) {
                    this.selectedAsset.path = matches[1];
                    this.assetChange(this.selectedAsset);
                } else {
                }
            }
        }
    },
    components: {
    },
    methods: {
        toUnitVector(n) {
            return Math.round(n / 255 * 1000) / 1000;
        },
        fromUnitVector(n) {
            return Math.round(n * 255);
        },
        assetChange(asset) {
            let lottieAsset = this.element.content.json.assets[asset.index];
            lottieAsset.p = asset.path;
            this.$emit('lottieChange');
            this.$emit('onChangeStop');
        },
        selectFromSidebar(asset) {
            this.$store.commit('editor/set_sidebar', {
                controlCategory: 'background',
                controlTab: 'image'
            });
            this.$store.commit('editor/set_controlProperty', asset);
            this.selectedAsset = asset;
        }
    },
    beforeDestroy() {
        this.$store.commit('editor/set_controlProperty', false);
        this.$store.commit('editor/set_sidebar', {
            controlCategory: false,
            controlTab: false
        });
    }
}
