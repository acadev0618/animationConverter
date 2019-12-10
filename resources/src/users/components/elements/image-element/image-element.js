import FreeTransform from "./../../FreeTransform";
import Toolbar from './../../toolbar/toolbar';
import AnimationMaker from './../../animation-maker';
import TimerService from './../../../services/timer-service';
import CropImagePreview from './../../previews/crop-image-preview';

export default {
    name: "image-element",
    props: {
        element: {
            type: Object,
        },
        offsetX: {
            type: Number,
            required: true,
        },
        offsetY: {
            type: Number,
            required: true,
        },
        parentZoom: {
            type: Number,
            default: 100,
        }
    },
    computed: {
        slide_store() {
            return this.$store.state.current_slide;
        },
        slideState() {
            return this.$store.state.current_slide.state;
        },
        cropperWrapperStyle() {
            if (this.element.fill_mode === 'crop') {
                const scale = this.element.width * this.element.scaleX / this.element.crop_data.width;
                return {
                    width: this.element.content.width * scale + 'px',
                    height: this.element.content.height * scale + 'px',
                    marginLeft: -this.element.crop_data.x * scale + 'px',
                    marginTop: -this.element.crop_data.y * scale + 'px',
                };
            } else {
                const scale = Math.max(this.element.scaleX, this.element.scaleY);
                return  {
                    width: this.element.width * scale + 'px',
                    height: this.element.height * scale + 'px',
                    marginLeft: this.element.width * (this.element.scaleX - scale) / 2 + 'px',
                    marginTop: this.element.height * (this.element.scaleY - scale) / 2 + 'px',
                }
            }
        },
        cropperData() {
            if (this.element.fill_mode === 'crop') {
                return  this.element.crop_data;
            } else {
                const scale = Math.max(this.element.scaleX, this.element.scaleY);
                const data =  {
                    width: Math.round(this.element.content.width * this.element.scaleX / scale),
                    height: Math.round(this.element.content.height * this.element.scaleY / scale),
                    x: Math.round(this.element.content.width * (scale - this.element.scaleX) / scale / 2),
                    y: Math.round(this.element.content.height * (scale - this.element.scaleY) / scale / 2),
                    scaleX: 1,
                    scaleY: 1,
                    rotate: 0,
                };
                return  data;
            }
        }
    },
    watch: {
        slideState(nv, ov) {
            if (nv === 'play') {
                if (ov === 'pause') {
                    this.resume();
                } else {
                    this.play();
                }
            } else if (nv === 'edit') {
                this.stop();
            } else if (nv === 'pause') {
                this.pause();
            }
        },
    },
    data: function() {
        return {
            animation: false,
            animationStyle: {},
            state: this.$store.state.current_slide.state,
            visible: true,
            timer: new TimerService(this.element.duration, this.element.delay),
            cropping: false,
        }
    },
    components: {
        FreeTransform,
        Toolbar,
        AnimationMaker,
        CropImagePreview
    },
    methods: {
        setSelected() {
            this.$store.commit('current_slide/set_selected', this.element.id);
        },
        update(payload) {
            if (this.element.fill_mode === 'crop') {
                this.applyToCrop(payload);
            }
            this.$store.commit('current_slide/update', {id: this.element.id, sets: payload});
        },
        applyToCrop(payload) {
            if (payload.x === this.element.x && payload.y === this.element.y && payload.scaleX !== this.element.scaleX && payload.scaleY === this.element.scaleY) {
                const offset = this.element.width * (payload.scaleX - this.element.scaleX) * this.element.crop_data.width / (this.element.width * this.element.scaleX);
                const sets = {
                    x: this.element.crop_data.x - offset,
                    width: this.element.crop_data.width + offset,
                };
                this.$store.commit('current_slide/update_cropData', {id: this.element.id, sets: sets});
            } else if (payload.x !== this.element.x && payload.y === this.element.y && payload.scaleX !== this.element.scaleX && payload.scaleY === this.element.scaleY) {
                const offset = this.element.width * (payload.scaleX - this.element.scaleX) * this.element.crop_data.width / (this.element.width * this.element.scaleX);
                const sets = {
                    width: this.element.crop_data.width + offset,
                };
                this.$store.commit('current_slide/update_cropData', {id: this.element.id, sets: sets});
            } else if (payload.x === this.element.x && payload.y === this.element.y && payload.scaleX === this.element.scaleX && payload.scaleY !== this.element.scaleY) {
                const offset = this.element.height * (payload.scaleY - this.element.scaleY) * this.element.crop_data.height / (this.element.height * this.element.scaleY);
                const sets = {
                    y: this.element.crop_data.y - offset,
                    height: this.element.crop_data.height + offset,
                };
                this.$store.commit('current_slide/update_cropData', {id: this.element.id, sets: sets});
            } else if (payload.x === this.element.x && payload.y !== this.element.y && payload.scaleX === this.element.scaleX && payload.scaleY !== this.element.scaleY) {
                const offset = this.element.height * (payload.scaleY - this.element.scaleY) * this.element.crop_data.height / (this.element.height * this.element.scaleY);
                const sets = {
                    height: this.element.crop_data.height + offset,
                };
                this.$store.commit('current_slide/update_cropData', {id: this.element.id, sets: sets});
            }
        },
        getElementStyles(element) {
            const styles = element.styles ? element.styles : {};
            return {
                width: `${element.width}px`,
                height: `${element.height}px`,
                ...styles
            }
        },
        deleteElement() {
            this.$store.dispatch('current_slide/delete_element', this.element.id);
        },
        playAnimation(animation) {
            this.animation = animation;
        },
        animationMade(keyframe) {
            this.animationStyle = {
                animationName: keyframe,
                animationDuration: this.animation.duration + 'ms',
                animationTimingFunction: this.animation.ease,
                animationPlayState: this.state === 'pause' ? 'paused' : 'running'
            };
        },
        styleChange(payload) {
        },
        play() {
            this.visible = false;
            this.timer.emptyCallback();
            this.prepare();
            this.state = 'play';
            this.timer.play();
            if (this.animation) {
                this.animationStyle.animationPlayState = 'running';
            }
        },
        pause() {
            this.state = 'pause';
            this.timer.pause();
            if (this.animation) {
                this.animationStyle.animationPlayState = 'paused';
            }
        },
        resume() {
            this.state = 'play';
            this.timer.resume();
        },
        stop() {
            this.animation = false;
            this.state = this.slideState;
            this.timer.stop();
            this.visible = true;
        },
        prepare() {
            if (this.element.animation.in) {
                this.timer.applyAt(0, () => {
                    this.visible = true;
                    this.playAnimation(this.element.animation.in);
                });
            } else {
                if (this.element.delay === 0) {
                    this.visible = true;
                } else {
                    this.timer.applyAt(0, () => {
                        this.visible = true;
                    });
                }
            }
            if (this.element.animation.out) {
                this.timer.applyAt(this.element.duration - this.element.animation.out.duration, () => {
                    this.playAnimation(this.element.animation.out);
                });
            }
            this.timer.afterEnd(() => {
                // this.visible = false;
            });
        },
        onChangeStop() {
            this.$store.commit('template/insert_history');
        },
        cropImage() {
            let cropData = this.$refs.cropper.getData(true);
            let rightOffset = cropData.x + cropData.width - this.cropperData.x - this.cropperData.width;
            let bottomOffset = cropData.y + cropData.height - this.cropperData.y - this.cropperData.height;
            let scale = 1;
            if (this.element.fill_mode === 'crop') {
                const rate = this.element.width * this.element.scaleX / this.element.crop_data.width;
                scale = this.element.content.width * rate / this.element.width;
            } else {
                scale = Math.max(this.element.scaleX, this.element.scaleY);
            }
            let sets = {
                crop_data: cropData,
                scaleX: scale  * cropData.width / this.element.content.width,
                scaleY: scale * cropData.height / this.element.content.height,
                x: this.element.x + rightOffset * this.element.width * scale / this.element.content.width,
                y: this.element.y + bottomOffset * this.element.height * scale / this.element.content.height,
                fill_mode: 'crop'
            };
            this.$store.commit('current_slide/update', {id: this.element.id, sets: sets});
            this.cropping = false;
        }
    },
    mounted() {
        if (this.state === 'play') {
            this.play();
        }
    },
}
