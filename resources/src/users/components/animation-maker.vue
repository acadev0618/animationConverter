<template>
    <div class="component-animation-maker">
        <v-style v-if="animation.name === 'slide' && animation.inOut === 'in'">
            @keyframes {{keyframeName}} {
                from {transform: translateX(-50px); opacity: 0;}
                to {transform: translate(0px); opacity: 1;}
            }
        </v-style>
        <v-style v-if="animation.name === 'slide' && animation.inOut === 'out'">
            @keyframes {{keyframeName}} {
                from {transform: translateX(0px); opacity: 1;}
                to {transform: translate(50px); opacity: 0;}
            }
        </v-style>
        <v-style v-if="animation.name === 'rotate' && animation.inOut === 'in'">
            @keyframes {{keyframeName}} {
                from {transform: rotate(-45deg); opacity: 0;}
                to {transform: rotate(0deg); opacity: 1;}
            }
        </v-style>
        <v-style v-if="animation.name === 'rotate' && animation.inOut === 'out'">
            @keyframes {{keyframeName}} {
                from {transform: rotate(0deg); opacity: 1;}
                to {transform: rotate(45deg); opacity: 0;}
            }
        </v-style>
        <v-style v-if="animation.name === 'slide_fade' && animation.inOut === 'in'">
            @keyframes {{keyframeName}} {
            from {opacity: 0;}
            to {opacity: 1;}
            }
        </v-style>
        <v-style v-if="animation.name === 'slide_fade' && animation.inOut === 'out'">
            @keyframes {{keyframeName}} {
            from {opacity: 1;}
            to {opacity: 0;}
            }
        </v-style>
        <v-style v-if="animation.name === 'slide_slide' && animation.inOut === 'in'">
            @keyframes {{keyframeName}} {
            from {transform: translateX(400px); opacity: 0;}
            to {transform: translateX(0px); opacity: 1;}
            }
        </v-style>
        <v-style v-if="animation.name === 'slide_slide' && animation.inOut === 'out'">
            @keyframes {{keyframeName}} {
            from {transform: translateX(0px); opacity: 1;}
            to {transform: translateX(-400px); opacity: 0;}
            }
        </v-style>
    </div>
</template>

<script>
    import Vue from 'vue';
    Vue.component('v-style', {
        render: function (createElement) {
            return createElement('style', this.$slots.default)
        }
    });
    export default {
        name: "animation-maker",
        props: {
            animation: {
                type: Object,
                required: true
            }
        },
        watch: {
            animation: function(nv, ov) {
                this.keyframeName = this.animation.name + '_' + this.animation.inOut + '_ani_' + new Date().getTime();
                this.$emit('renderKeyframe', this.keyframeName);
            }
        },
        data: function () {
            return {
                keyframeName: this.animation.name + '_ani_' + new Date().getTime(),
            }
        },
        mounted() {
            this.$emit('renderKeyframe', this.keyframeName);
        }
    }
</script>

<style scoped>
</style>
