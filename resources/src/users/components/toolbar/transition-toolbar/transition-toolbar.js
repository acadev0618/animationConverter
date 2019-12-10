import VueSelect from 'vue-select'
export default {
    name: "transition-toolbar",
    data: function () {
        let easeOptions = [
            {
                label: 'Ease Out',
                value: 'ease-out'
            },
            {
                label: 'Ease In',
                value: 'ease-in'
            },
            {
                label: 'Ease In Out',
                value: 'ease-in-out'
            },
            {
                label: 'Linear',
                value: 'linear'
            },
        ];
        let ease = this.element.animation.in ? easeOptions.find(ease => ease.value === this.element.animation.in.ease) : easeOptions[0];
        return {
            inOut: 'in',
            animations: [
                'none',
                'slide',
                'rotate'
            ],
            animation: this.element.animation.in ? this.element.animation.in.name : 'none',
            easeOptions: easeOptions,
            ease: ease
        }
    },
    watch: {
        inOut(nv, ov) {
            this.animation = this.element.animation[nv] ? this.element.animation[nv].name : 'none';
            this.ease = this.element.animation[nv] ? this.easeOptions.find(ease => ease.value === this.element.animation[nv].ease) : this.easeOptions[0];
        }
    },
    computed: {
    },
    components: {
        VueSelect
    },
    props: {
        element: {
            type: Object,
            required: true,
        }
    },
    methods: {
        animationChange() {
            let animation = {};
            if (this.inOut === 'in') {
                animation.in = this.animation !== 'none' ? {
                    inOut: this.inOut,
                    name: this.animation,
                    ease: this.ease.value,
                    duration: 800,
                } : false;
            } else {
                animation.out = this.animation !== 'none' ? {
                    inOut: this.inOut,
                    name: this.animation,
                    ease: this.ease.value,
                    duration: 800,
                } : false;
            }
            this.$store.commit('current_slide/update_animation', {id: this.element.id, sets: animation});
            this.$emit('onChangeStop');
        },
        playAnimation() {
            this.$store.dispatch('current_slide/play_animation', this.element.id);
            let animation = {
                inOut: this.inOut,
                name: this.animation,
                ease: this.ease.value,
                duration: 800,
            };
            this.$emit('playAnimation', animation);
        }
    }
}
