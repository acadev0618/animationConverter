import vue from 'vue';
export default {
    namespaced: true,
    state: {
        bodymovin: {
            loaded: false,
            items: [],
        }
    },
    mutations: {
        load_bodymovin(state, payload) {
            state.bodymovin.loaded = true;
            state.bodymovin.items = payload;
        }
    },
    actions: {
        load_bodymovin({commit, state}) {
            if (state.bodymovin.loaded) {
                return Promise.resolve(state.bodymovin.items);
            } else {
                return  vue.axios.post('/users/video-element/get-template', {where: {temp_type: 'bodymovin'}}).then(res => {
                    commit('load_bodymovin', res.data.items);
                    return state.bodymovin.items;
                });
            }
        }
    }
}
