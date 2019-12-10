import vue from "vue";

export default {
    namespaced: true,
    state: {
        stock: {
            loaded: false,
            items: [],
        },
        my_video: {
            loaded: false,
            items: []
        }
    },
    getters: {
        stockSearch: () => (query) => {
            return vue.axios.post('common/assets/get_stock_video', query).then(function (res) {
                return res.data;
            });
        }
    },
    mutations: {
        load_my_video(state, items) {
            state.my_video.loaded = true;
            state.my_video.items = items;
        },
        add_my_video(state, item) {
            state.my_video.items.push(item);
        }
    },
    actions: {
        load_my_video({commit, state}) {
            if (state.my_video.loaded) {
                return  Promise.resolve(state.my_video.items);
            }
            return vue.axios.post('common/files/get', {where: {file_type: 'video'}}).then(function (res) {
                commit('load_my_video', res.data);
                return res.data;
            });
        },
        upload_video({commit, state}, file) {
            let formData = new FormData();
            formData.append('video', file);
            let loader = vue.$loading.show();
            return vue.axios.post('common/files/upload_video', formData).then(res => {
                commit('add_my_video', res.data);
                loader.hide();
                return res.data;
            });
        }
    }
}
