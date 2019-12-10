import vue from "vue";

export default {
    namespaced: true,
    state: {
        library: {
            loaded: false,
            items: [],
        },
        my_music: {
            loaded: false,
            items: []
        }
    },
    getters: {
    },
    mutations: {
        load_library(state, items) {
            state.library.loaded = true;
            state.library.items = items;
        },
        load_my_music(state, items) {
            state.my_music.loaded = true;
            state.my_music.items = items;
        },
        add_new_my_audio(state, payload) {
            state.my_music.items.push(payload);
        }
    },
    actions: {
        load_library({commit, state}) {
            if (state.library.loaded) {
                return  Promise.resolve(state.library.items);
            }
            return vue.axios.post('common/assets/get', {where: {file_type: 'sound'}}).then(function (res) {
                commit('load_library', res.data);
                return res.data;
            });
        },
        load_my_music({commit, state}) {
            if (state.my_music.loaded) {
                return  Promise.resolve(state.my_music.items);
            }
            return vue.axios.post('common/files/get', {where: {file_type: 'sound'}}).then(function (res) {
                commit('load_my_music', res.data);
                return res.data;
            });
        },
        upload_media({commit, state}, files) {
            let loader = vue.$loading.show();
            let formData = new FormData();
            for (let i = 0; i < files.length; i ++) {
                formData.append('files[]', files[i]);
            }
            return vue.axios.post('common/files/upload_sound', formData).then(res => {
                res.data.forEach(item => {
                    commit('add_new_my_audio', item);
                });
                loader.hide();
                return res.data;
            });
        }
    }
}
