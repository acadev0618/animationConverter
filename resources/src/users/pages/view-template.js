import vue from 'vue';
import TemplatePlayer from './../components/players/template-player/template-player.vue';
import html2canvas from "html2canvas";
import AppHelper from './../../app-helper';

let vm = new vue({
    el: '#view-template',
    data: function() {
        videoTemplate.data_json = JSON.parse(videoTemplate.data_json);
        return {
            videoTemplate: videoTemplate,
            playerState: 'pause',
            playerSeek: 0,
            canvas: false,
            interval: false,
            renderCount: 0,
        }
    },
    watch: {
        playerSeek(nv, ov) {
            setTimeout(() => {
                this.canvasRender();
            });
        }
    },
    components: {
        TemplatePlayer
    },
    methods: {
        canvasRender() {
            if (this.canvas) {
                this.canvas.parentNode.removeChild(this.canvas);
            };
            $(this.$refs.templateCanvas).empty();
            let player = $(this.$refs.templatePlayer.$el).clone().appendTo('.template-canvas');
            const svgs = player.get(0).querySelectorAll('svg');
            let promiseAll = [];
            svgs.forEach(svg => {
                let p = new Promise(resolve => {
                    AppHelper.exportInlineSVG(svg, (data, canvas) => {
                        svg.parentNode.replaceChild(canvas, svg);
                        resolve(canvas);
                    });
                });
                promiseAll.push(p);
            });
            return new Promise(resolve => {
                Promise.all(promiseAll).then(() => {
                    html2canvas(player.get(0)).then((canvas) => {
                        player.remove();
                        $('.template-canvas').append(canvas);
                        this.canvas = canvas;
                        resolve(canvas);
                        this.playerSeek += 20;
                    });
                });
            });
        }
    },
    mounted() {
        this.playerState = 'pause';
        setTimeout(() => {
            this.canvasRender();
        }, 100);
    }
});
