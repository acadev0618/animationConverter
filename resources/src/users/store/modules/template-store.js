import _ from 'lodash';

export default {
    namespaced: true,
    state: {
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
        duration: (state) => () => {
            let duration = 0;
            let enterAnimation = false;
            state.slides.forEach(slide => {
                if (enterAnimation) {
                    duration += enterAnimation.duration;
                }
                duration += slide.duration;
                if (slide.animation.space) {
                    duration += slide.animation.space;
                }
                enterAnimation = slide.animation.nextEnter;
            });
            return duration;
        },
        get_template: (state) => () => {
            let template = Object.assign({}, state);
            delete template.history;
            return template;
        }
    },
    mutations: {
        add_slide(state, payload) {
            let slide = {
                ...{
                    name: 'Custom Slide',
                    aspect: 'custom',
                    animation: {
                        leave: false,
                        space: 0,
                        nextEnter: false
                    },
                    timer: {
                        timeFlag: false,
                        flagSeek: false,
                    },
                },
                ...payload,
                ...{
                    id: 'slide_' + new Date().getTime()
                },
            };
            slide = _.cloneDeep(slide);
            slide.elements.forEach((element, i) => {
                element.id = 'element_' + i + '_' + new Date().getTime()
            });
            state.slides.push(slide);
        },
        replace_slide(state, payload) {
            state.slides = state.slides.map(slide => slide.id === payload.id ? payload : slide);
        },
        set_current(state, payload) {
            state.currentSlide = payload;
        },
        delete_slide(state, payload) {
            state.slides = state.slides.filter(slide => slide.id !== payload);
        },
        duplicate_slide(state, payload) {
            const index = state.slides.findIndex(slide => slide.id === payload.id);
            payload = {
                ...{
                    animation: {
                        leave: false,
                        nextEnter: false
                    }
                },
                ...payload,
                ...{
                    id: 'slide_' + new Date().getTime()
                },
            };
            payload.elements = payload.elements.map(element => {
                element = {...element};
                element.id = element.id + '_' + new Date().getTime();
                element.selected = false;
                return element;
            });
            payload = _.cloneDeep(payload);
            state.slides.splice(index + 1, 0, payload);
        },
        set_slideDuration(state, payload) {
            let slide = state.slides.find(slide => slide.id === payload.id);
            slide.elements.forEach(element => {
                if (element.duration === slide.duration) {
                    element.duration = payload.duration;
                }
            });
            slide.duration = payload.duration;
        },

        set_state(state, payload) {
            state.state = payload;

            console.log( state.state,'stgore state');
        },

        set_timeSeek(state, payload) {
            state.timeSeek = payload;
        },
        set_sound(state, payload) {
            if (payload) {
                let defaultSet = {
                    volume: 0.5,
                };
                payload = {
                    ...defaultSet,
                    ...payload
                }
            }
            state.sound = payload;
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
        },
        set_with_history(state, payload) {
            state.history.seek = payload;
            let historyItem = _.cloneDeep(state.history.items[payload]);
            for (let k in state) {
                if (k in historyItem) {
                    state[k] = historyItem[k];
                } else if (k === 'history'){
                } else {
                    state[k] = false;
                }
            }
        },
        insert_history(state) {
            state.history.items.splice(state.history.seek + 1);
            let template = Object.assign({}, state);
            delete template.history;
            template = _.cloneDeep(template);
            state.history.items.push(template);
            state.history.seek++;
        },
    },
    actions: {
        connect_with_current({commit, rootState}) {
            commit('replace_slide', rootState.current_slide);
            commit('set_current', rootState.current_slide.id);
        },
        disconnect_with_current({commit, rootState}) {
            commit('replace_slide', {...rootState.current_slide})
        },
        delete_slide({commit, rootState, dispatch, state}, payload) {
            if (state.slides.length === 1) {
                alert('There should be at least 1 slide');
                return false;
            }
            commit('delete_slide', payload);
            if (rootState.current_slide.id === payload) {
                dispatch('disconnect_with_current');
                commit('current_slide/set_with', state.slides[0], { root: true });
                dispatch('connect_with_current');
            }
        },
        duplicate_slide({commit, state}, payload) {
            commit('duplicate_slide', payload);
        },
        set_with({commit, state, dispatch}, payload) {
            dispatch('disconnect_with_current');
            commit('set_with', payload);
            commit('current_slide/set_with', state.slides[0], { root: true });
            dispatch('connect_with_current');
            commit('insert_history');
        },
        history_back({commit, state, dispatch}) {
            if (state.history.seek <= 0) {
                return false;
            }
            dispatch('disconnect_with_current');
            const seek = state.history.seek - 1;
            commit('set_with_history', seek);
            const currentSlide = state.slides.find(slide => slide.id === state.currentSlide);
            commit('current_slide/set_with', currentSlide, { root: true });
            dispatch('connect_with_current');
        },
        history_forward({commit, state, dispatch}) {
            if (state.history.seek >= state.history.items.length - 1) {
                return false;
            }
            dispatch('disconnect_with_current');
            const seek = state.history.seek + 1;
            commit('set_with_history', seek);
            const currentSlide = state.slides.find(slide => slide.id === state.currentSlide);
            commit('current_slide/set_with', currentSlide, { root: true });
            dispatch('connect_with_current');
        },
    }
}
