import AppHelper from './../../../../app-helper';

export default {
    name: "lottie-text-toolbar",
    props: {
        element: {
            type: Object,
            required: true
        }
    },
    data: function () {
        let textLayers = [];
        let layerGroup = this.element.content.json.layers[0].ty === 0 ? this.element.content.json.layers[0] : false;
        let layers = [];
        if (layerGroup) {
            layers = this.element.content.json.assets.find(asset => asset.id === layerGroup.refId).layers;
        } else {
            layers = this.element.content.json.layers;
        }
        layers.forEach((layer, li) => {
            if (layer.ty === 5) {
                let t_val = layer.t.d.k;
                t_val.forEach( (val, ki) => {
                    if (val.s.t) {
                        let [r, g, b] = val.s.fc;
                        r = this.fromUnitVector(r);
                        g = this.fromUnitVector(g);
                        b = this.fromUnitVector(b);
                        const data = {
                            lIndex: li,
                            kIndex: ki,
                            text: val.s.t.replace(//g, '\n'),
                            color: AppHelper.rgbToHex(r, g, b),
                            fontSize: Math.round(AppHelper.ptToPx(val.s.s)),
                            lineHeight: Math.round(val.s.lh * 10 / val.s.s)
                        };

                        textLayers.push(data);
                    }
                });
            }
        });
        return {
            lottieLayers: layers,
            isGroup: layerGroup,
            textLayers: textLayers
        }
    },
    components: {
    },
    methods: {
        styleChange(payload) {
            this.$emit('styleChange', payload);
        },
        toUnitVector(n) {
            return Math.round(n / 255 * 1000) / 1000;
        },
        fromUnitVector(n) {
            return Math.round(n * 255);
        },
        layerChange(textLayer) {
            let layer = this.lottieLayers[textLayer.lIndex];
            let val = layer.t.d.k[textLayer.kIndex];
            layer.nm = textLayer.text.replace(/\n/g, ' ');
            val.s.t = textLayer.text.replace(/\n/g, '');
            val.s.s = Math.round(AppHelper.pxToPt(textLayer.fontSize));
            val.s.lh = Math.round(val.s.s * textLayer.lineHeight / 10);
            this.$emit('lottieChange');
        }
    }
}
