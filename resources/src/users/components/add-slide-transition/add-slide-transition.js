export default {
    name: "add-slide-transition",
    props: {
        animationName: {
            type: [String, Boolean],
            default: false
        }
    },
    data: function () {
        return {
            transitions: [
                {
                    leave: false,
                    space: 0,
                    nextEnter: false,
                    label: 'None',
                    img: 'icon/ani-none.png',
                },
                {
                    leave: {
                        inOut: 'out',
                        name: 'slide_fade',
                        ease: 'ease-out',
                        duration: 600,
                    },
                    space: 0,
                    nextEnter: {
                        inOut: 'in',
                        name: 'slide_fade',
                        ease: 'ease-out',
                        duration: 600,
                    },
                    label: 'Fade',
                    img: 'icon/ani-fade.png'
                },
                {
                    leave: {
                        inOut: 'out',
                        name: 'slide_slide',
                        ease: 'ease-out',
                        duration: 600,
                    },
                    space: 300,
                    nextEnter: {
                        inOut: 'in',
                        name: 'slide_slide',
                        ease: 'ease-out',
                        duration: 600,
                    },
                    label: 'Slide',
                    img: 'icon/ani-slide.png'
                }
            ]
        }
    },
    methods: {
        addTransition(transition) {
            this.$emit('selectTransition', transition);
        },
    }
}
