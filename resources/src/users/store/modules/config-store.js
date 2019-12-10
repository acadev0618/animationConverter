import vue from 'vue';
export default {
    namespaced: true,
    state: {
        template: {
            loaded: false,
            categories: [],
            designTypes: [],
            aspects: [],
        }
    },
    mutations: {
        load_template_config(state, payload) {
            state.template.loaded = true;
            state.template.categories = Object.keys(payload.category).map((k) => { return {value: k, label: payload.category[k]} });
            state.template.designTypes = Object.keys(payload.design_type).map((k) => { return {value: k, label: payload.design_type[k]} });
            state.template.aspects = Object.keys(payload.aspect).map((k) => { return {value: k, label: payload.aspect[k]} });
        }
    },
    actions: {
        load_template_config({commit, state}) {
            if (state.template.loaded) {
                return  Promise.resolve(state.template);
            } else {
                return vue.axios.post('/common/video-template/get-config').then(res => {
                    commit('load_template_config', res.data);
                    return state.template;
                });
            }
        }
    }
}
