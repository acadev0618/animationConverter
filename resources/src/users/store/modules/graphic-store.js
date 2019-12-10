import vue from 'vue';
export default {
    namespaced: true,
    state: {
        texture: [
            '//cdn.bannersnack.com/textures/thumbs/texture_1',
            '//cdn.bannersnack.com/textures/thumbs/texture_2',
            '//cdn.bannersnack.com/textures/thumbs/texture_3',
            '//cdn.bannersnack.com/textures/thumbs/texture_4',
            '//cdn.bannersnack.com/textures/thumbs/texture_5',
            '//cdn.bannersnack.com/textures/thumbs/texture_6',
            '//cdn.bannersnack.com/textures/thumbs/texture_7',
            '//cdn.bannersnack.com/textures/thumbs/texture_8',
            '//cdn.bannersnack.com/textures/thumbs/texture_9',
            '//cdn.bannersnack.com/textures/thumbs/texture_10',
        ],
        pattern: [],
        texture_loaded: false,
        pattern_loaded: false,
    },
    getters: {
    },
    mutations: {
        load_texture(state, items) {
            state.pattern_loaded = true;
            state.texture = items;
        },
        load_pattern(state, items) {
            state.pattern_loaded = true;
            state.pattern = items;
        }
    },
    actions: {
        load_texture({commit, state}) {
            if (state.texture_loaded) {
                return Promise.resolve(state.texture);
            }
            return vue.axios.post('common/assets/get', {where: {file_type: 'texture'}}).then((res) => {
                commit('load_texture', res.data);
                return res.data;
            });
        },
        load_pattern({commit, state}) {
            if (state.pattern_loaded) {
                return Promise.resolve(state.pattern);
            }
            return vue.axios.post('common/assets/get', {where: {file_type: 'pattern'}}).then((res) => {
                let items = res.data.map(item => item.thumb_url);
                commit('load_pattern', items);
                return items;
            });
        }
    }
}
