import vue from "vue";

export default {
    namespaced: true,
    state: {
        loaded: false,
        items: [],
    },
    getters: {
        filter: (state) => (payload) => {

            return state.items.filter(item => {
                for (let k in payload) {
                    if (_.isArray(payload[k])) {
                        if (payload[k].length === 0) {
                            continue;
                        }
                        if (k === 'design_type') {
                            let a = payload[k];
                            let b = item[k];
                            console.log(a, b);
                            if(_.intersection(a, b).length === 0) {
                                return false;
                            }
                        } else {
                            if (payload[k].indexOf(item[k]) == -1) {
                                return  false;
                            }
                        }
                    } else {
                        if (payload[k] === '') {
                            continue;
                        }
                        if (k === 'q') {
                            if (item.name.indexOf(payload[k]) === -1) {
                                return false;
                            }
                        } else if (payload[k] !== item[k]) {
                            return  false;
                        }
                    }
                }
                return true;
            });
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
                return  vue.axios.post('/common/slide/get-many', {where: {}}).then(res => {
                    res.data = res.data.map(item => {
                        item.design_type = JSON.parse(item.design_type);
                        item.data_json = JSON.parse(item.data_json);
                        return item;
                    });
                    commit('load', res.data);
                    return state.items;
                });
            }
        }
    }
}
