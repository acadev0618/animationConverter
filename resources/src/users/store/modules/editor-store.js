export default {
    namespaced: true,
    state: {
        controlProperty: false,
        controlValue: false,
        sidebar: {
            controlCategory: false,
            controlTab: false,
        },
        zoom: 100,
    },
    mutations: {
        set_controlProperty(state, payload) {
            state.controlProperty = payload;
        },
        set_controlValue(state, payload) {
            state.controlValue = payload;
        },
        set_sidebar(state, payload) {
            state.sidebar = {
                ...state.sidebar,
                ...payload
            };
        },
        set_zoom(state, payload) {
            state.zoom = payload;
        }
    }
}
