import Vue from 'vue';
import Vuex from 'vuex';
import Color from './modules/color-store';
import Graphic from './modules/graphic-store';
import Image from './modules/image-store';
import Video from './modules/video-store';
import CurrentSlide from './modules/current-slide-store';
import Text from './modules/text-store';
import Template from './modules/template-store';
import ElementGraphic from './modules/element-graphic-store';
import ElementShape from './modules/element-shape-store';
import ElementLine from './modules/element-line-store';
import Audio from './modules/audio-store';
import Editor from './modules/editor-store';
import ElementTemplate from './modules/element-template-store';
import Config from './modules/config-store';
import Bodymovin from './modules/bodymovin-store';
import Slide from './modules/slide-store';
import Demo from './modules/demo-store';

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    modules: {
        color: Color,
        graphic: Graphic,
        image: Image,
        video: Video,
        current_slide: CurrentSlide,
        text: Text,
        template: Template,
        element_graphic: ElementGraphic,
        element_shape: ElementShape,
        element_line: ElementLine,
        audio: Audio,
        editor: Editor,
        element_template: ElementTemplate,
        config: Config,
        bodymovin: Bodymovin,
        slide: Slide,
        demo: Demo
    }
});
