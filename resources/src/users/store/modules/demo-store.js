export default {
    namespaced: true,
    state: {

        sbuildings: [],
        jsonData: [],


        width: 710,
        height: 400,
        state: 'initial',
        slides: [],
        sound: false,
        timeSeek: 0,
        currentSlide: false,
        history: {
            seek: -1,
            items: [],
        }
    },

    getters: {

    },

    mutations: {
        add_slide(state, payload) {
            state.sbuildings = payload ;
        },

        set_with(state, payload) {
            if ('history' in payload) {
                delete payload.history;
            }
            for (let k in state) {
                if (k in payload) {
                    state[k] = payload[k];
                } else if (k === 'history'){
                    state[k] = {
                        seek: -1,
                        items: [],
                    };
                } else {
                    state[k] = false;
                }
            }
        }
    }
}