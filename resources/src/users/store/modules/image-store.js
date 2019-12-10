import vue from 'vue';

export default {
    namespaced: true,
    state: {
        stock: {
            query: '',
            page: 0,
            items: [],
        },
        my_image: {
            loaded: false,
            items: []
        },
    },
    getters: {
        stockSearch: () => (query) => {
            return vue.axios.post('common/assets/get_stock_image', query).then(function (res) {
                return res.data;
            });
        }
    },
    mutations: {
        load_my_image(state, items) {
            state.my_image.loaded = true;
            state.my_image.items = items;
        },
        add_my_image(state, item) {
            state.my_image.items.push(item);
        }
    },
    actions: {
        load_my_image({commit, state}) {
            if (state.my_image.loaded) {
                return  Promise.resolve(state.my_image.items);
            }
            return vue.axios.post('common/files/get', {where: {file_type: 'photo'}}).then(function (res) {
                commit('load_my_image', res.data);
                return res.data;
            });
        },
        upload_image({commit, state}, file) {
            let formData = new FormData();
            formData.append('photo', file);
            let loader = vue.$loading.show();
            return vue.axios.post('common/files/upload_photo', formData).then(res => {
                commit('add_my_image', res.data);
                loader.hide();
                return res.data;
            });
        }
    }
}
