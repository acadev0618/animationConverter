import vue from 'vue';
export default {
    namespaced: true,
    state: {
        loaded: false,
        items: [],
    },
    getters: {
        filter_by_type: (state) => (type) => {
            return state.items.filter(item => item.type === type);
        }
    },
    mutations: {
        load(state, payload) {
            state.loaded = true;
            state.items = payload;
        }
    },
    actions: {
        load({commit, state}) {
            if (state.loaded) {
                return Promise.resolve(state.items);
            } else {
                return  vue.axios.post('/common/bodymovin/get-many', {where: {}}).then(res => {
                    let data = res.data.map(item => {
                        item.json = JSON.parse(item.json);
                        return item;
                    });
                    commit('load', data);
                    return state.items;
                });
            }
        }
    }
}
