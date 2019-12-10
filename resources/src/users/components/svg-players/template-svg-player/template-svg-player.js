// import AudioPlayer from '../audio-player/audio-player.vue';

import SlideSvgPlayer from "../slide-svg-player/slide-svg-player.vue";
import AudioPlayer from "../../players/audio-player/audio-player";

export default {
    name: "template-svg-player",
    props: {
        controlState: {
            type: String,
            default: 'play'
        },
        template: {
            type: Object,
            required: true,
        },
        controlSeek: {
            type: Number,
            default: 0
        },
        controlVolume: {
            type: Number,
            default: 0.5
        },
        responsive: {
            type: Boolean,
            default: false
        }
    },


    data: function () {
      return {
          state: this.controlState,
          activeSlides: [],
          previewWidth: this.template.width,
          previewHeight: this.template.height,
          scaleHelper: {
              width: this.template.width + 'px',
              height: this.template.height + 'px',
          },
          ubuildings:[],
          backimgs: []
      }

    },
    computed: {
        demo(){
            return this.$store.state.demo;
        }
    },

    methods: {

        nextEnter(animation, index) {
            console.log('i am leaving!',index,'slide',animation,'animation');
            if (index + 1 < this.template.slides.length) {
                this.activeSlides.push({
                    enterAnimation: animation,
                    controlSeek: 'auto',
                    index: index + 1,
                    slide: this.template.slides[index + 1]
                });
            }
        },
        afterLeave(index) {
            console.log('i am removing!',index,'slide');
            setTimeout(() => {
                this.activeSlides.splice(index, 1);
                if (this.activeSlides.length === 0) {
                    this.stop();
                }
            });
        },
        play() {

            console.log(" i am playing! starting!");


            this.activeSlides.push({
                slide: this.template.slides[0],
                enterAnimation: false,
                controlSeek: 'auto',
                index: 0,
            });
            this.state = 'play';
            console.log(this.activeSlides,'active slides');
            // this.$emit('onPlay');

        },
        resume() {
            this.state = 'play';
            this.$emit('onPlay');
        },
        pause() {
            this.state = 'pause';
            this.$emit('onPause');
        },
        gotoAndPause(ms) {
            this.activeSlides = [];
            let timeSeek = 0;
            let enterAnimation = false;
            for (let i = 0; i < this.template.slides.length; i ++) {
                let iSlide = this.template.slides[i];
                let slideSeek = 0;

                if (enterAnimation) {
                    timeSeek += enterAnimation.duration;
                    slideSeek += enterAnimation.duration;
                }
                if (timeSeek > ms) {
                    let enterSeek = ms - (timeSeek - enterAnimation.duration);
                    this.activeSlides.push({
                        slide: iSlide,
                        enterAnimation: enterAnimation,
                        controlSeek: enterSeek,
                        index: i,
                    });

                    break;
                }
                timeSeek += iSlide.duration;
                if (timeSeek > ms) {
                    let controlSeek = ms - (timeSeek - iSlide.duration) + slideSeek;
                    this.activeSlides.push({
                        slide: iSlide,
                        enterAnimation: enterAnimation,
                        controlSeek: controlSeek,
                        index: i,
                    });

                    break;
                }
                slideSeek += iSlide.duration;
                if (iSlide.animation.leave) {
                    timeSeek += iSlide.animation.leave.duration;
                    if (timeSeek > ms) {
                        let leaveSeek = slideSeek + ms - (timeSeek - iSlide.animation.leave.duration);
                        this.activeSlides.push({
                            slide: iSlide,
                            enterAnimation: enterAnimation,
                            controlSeek: leaveSeek,
                            index: i,
                        });

                    }
                    timeSeek -= iSlide.animation.leave.duration;
                }
                if (iSlide.animation.space) {
                    timeSeek += iSlide.animation.space;
                }
                if (timeSeek > ms) {
                    break;
                }
                enterAnimation = iSlide.animation.nextEnter;
            }
            this.pause();
        },
        stop() {
            this.state = 'initial';
            this.$emit('onStop');
        },
        onElementClick(element, slide) {
            this.$emit('element_click', element, slide);
        },
        assign: function () {

            this.ubuildings=this.$store.state.demo.sbuildings;
            // console.log( this.ubuildings,'demo 111');

             // console.log(this.$store.state.demo);
        },
        makeImage: function() {  //make  backimages

            // console.log(this.$store.state.demo,'template svg make image step1');

            // let JSONObject = this.$store.state.demo.jsonData;
            let JSONObject = this.$store.state.demo;
            // console.log(this.$store.state.demo,'template svg make image step2');


            var img = [];


            let ary = JSONObject.slides;


            for (let kk in ary) {

                let element = ary[kk];

                // console.log("slide array");
                // console.log(element);

                let back = element.css.backgroundImage;
                back= back.substring(4, back.length - 1);

                img.push(back);

            }
            this.backimgs=img;
            // console.log(this.backimgs);
        },
        initCanvas: function () {

            this.buildings = this.$store.state.demo.sbuildings;

            let canvas=document.getElementById('mycanvas2');
            canvas.style.zIndex=2;
            // canvas.style.position();
            var ctx = document.getElementById("mycanvas2").getContext("2d");
            // ctx.fillStyle = "orange";
            // ctx.fillRect(0, 0, 800, 800);

            const abuildings = this.$store.state.demo.sbuildings;

            for (var i = 0; i < abuildings.length; i++) {
                var line = abuildings[i];
                ctx.fillStyle = line.bgColor;
                ctx.fillRect(line.px, line.py, line.w, line.h);
            }
        },


    },


   created(){

        // console.log("template creating!");


   },

    watch: {


        controlSeek(nv, ov) {
            this.gotoAndPause(nv);
        },
        controlState(nv, ov) {
            if (nv === 'play') {
                if (this.state === 'pause') {
                    this.resume();
                } else {
                    this.play();
                }
            } else if (nv === 'pause') {
                this.pause();
            }
        }
    },
    mounted() {
        if (this.responsive) {
            this.previewWidth = Math.round( this.$el.getBoundingClientRect().width );
            this.previewHeight = Math.round( this.template.height * this.previewWidth / this.template.width );
            this.scaleHelper.transformOrigin = 'top left';
            this.scaleHelper.transform = 'scale(' + this.previewWidth / this.template.width + ')';
        }
        if (this.controlState === 'play') {
            this.play();
        } else if (this.controlState === 'pause') {
            this.gotoAndPause(this.controlSeek);
        }
        // console.log("template has mounted time! 2");
        this.assign();
        // console.log("template has mounted time! 3");
        this.makeImage();
    },
    components: {
        SlideSvgPlayer,
        AudioPlayer,
    },

}