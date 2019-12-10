import Vue from 'vue';


import TestVideo from './../components/testvideo';
import RangeSlider from 'vue-range-slider';
import store from './../store/index';


new Vue({
    el: '#customize-video1',
    name: 'test-video',
    components: {
        TestVideo,
    },
    computed: {
        zoom: {
            get() {
                return this.$store.state.editor.zoom;
            },
            set(v) {
                this.$store.commit('editor/set_zoom', v);
            }
        }
    },
    mounted() {

        // this.$store.commit('demo/set_with', JSON.parse(videoTemplate.data_json));
    },
    store
});