import vue from "vue";
import AppHelper from './../../../app-helper';

export default {
    namespaced: true,
    state: {
        loaded: false,
        elements: [
        ]
    },
    mutations: {
        load_elements(state, items) {
            state.loaded = true;
            state.elements = items;
        },
        add_new(state, item) {
            state.elements.push(item);
        }
    },
    actions: {
        load_elements({commit, state}) {
            if (state.loaded) {
                return  Promise.resolve(state.elements);
            }
            return vue.axios.post('common/assets/get', {where: {file_type: 'shapes'}}).then(function (res) {
                res.data.forEach(item => {
                    AppHelper.getImageSize(item.thumb_url).then(size => {
                        Object.assign(item, size);
                    });
                });
                commit('load_elements', res.data);
                return res.data;
            });
        },
        upload_element({commit, state}, file) {
            let formData = new FormData();
            formData.append('photo', file);
            return vue.axios.post('common/assets/upload_photo', formData).then(res => {
                commit('add_my_image', res.data);
                return res.data;
            });
        }
    }
}
