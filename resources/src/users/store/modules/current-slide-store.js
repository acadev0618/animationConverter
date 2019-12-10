import AppHelper from './../../../app-helper';
export default {
    namespaced: true,
    state: {
        name: 'Custom Slide',
        aspect: 'custom',
        id: 'slide-1',
        width: false,
        height: false,
        css: {
            backgroundColor: 'white'
        },
        backgroundVideo: false,
        backgroundLottie: false,
        selectedElement: false,
        elements: [
        ],
        duration: 5000,
        state: 'edit',
        timer: {
            timeFlag: false,
            flagSeek: false,
        },
        animation: {
            leave: false,
            nextEnter: false
        },
    },
    mutations: {
        set_with(state, payload) {
            let element = state.elements.find(e => e.id === state.selectedElement);
            if (element) {
                element.selected = false;
            }
            state.selectedElement = false;
            for (let k in state) {
                if (k in payload) {
                    state[k] = payload[k];
                } else {
                    state[k] = false;
                }
            }
        },
        set_css(state, css) {
            let defaultCss = {
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            };
            state.css = {...defaultCss, ...css};
        },
        update_css(state, payload) {
            Object.assign(state.css, payload);
        },
        update(state, payload) {
            state.elements = state.elements.map(item => {
                if (item.id === payload.id) {
                    item.changeNumber = item.changeNumber ? item.changeNumber + 1 : 0;
                    return {
                        ...item,
                        ...payload.sets
                    }
                }
                return item
            });
        },
        update_animation(state, payload) {
            let element = state.elements.find(elem => elem.id === payload.id);
            element.animation = {
                ...element.animation,
                ...payload.sets
            };
        },
        update_cropData(state, payload) {
            let element = state.elements.find(elem => elem.id === payload.id);
            element.crop_data = {
                ...element.crop_data,
                ...payload.sets
            };
        },
        update_style(state, payload) {
            let element = state.elements.find(elem => elem.id === payload.id);
            if (element) {
                element.styles = {
                    ...element.styles,
                    ...payload.sets
                };
            }
        },
        element_merge(state, payload) {
            let element = state.elements.find(elem => elem.id === payload.id);
            if (element) {
                _.merge(element, payload.sets);
            }
        },
        update_timer(state, payload) {
            state.timer = {
                ...state.timer,
                ...payload
            };
        },
        add_new(state, payload) {
            let typeCnt = state.elements.filter(element => element.type === payload.type).length + 1;
            let defaultE = {
                id: 'element-' + new Date().getTime(),
                x: 100,
                y: 100,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                classPrefix: "tr2",
                selectOn: 'mousedown',
                selected: false,
                changeNumber: 0,
                styles: {
                    width: "100%",
                    height: "100%",
                },
                disableScale: true,
                animation: {
                    play: false,
                    in: false,
                    out: false
                },
                duration: state.duration,
                delay: 0,
                visible: true,
                label: payload.type.toUpperCase() + ' ' + typeCnt,
            };
            if (payload.type !== 'lottie' && payload.type !== 'text' && payload.width > 250) {
                payload.height = payload.height * 250 / payload.width;
                payload.width = 250;
            }
            if (payload.type !== 'lottie' && payload.type !== 'text' && payload.height > 250) {
                payload.width = payload.width * 250 / payload.height;
                payload.height = 250;
            }
            if (payload.type === 'lottie') {
                payload.lottieChangeNumber = 0;
            }
            let element = {
                ...defaultE,
                ...payload
            };
            state.elements.push(element);
        },
        delete_element(state, payload) {
            state.selectedElement = false;
            state.elements = state.elements.filter(elem => elem.id !== payload);
        },
        set_selected(state, payload) {
            if (state.selectedElement) {
                if (state.selectedElement === 'background_video') {
                    state.backgroundVideo.selected = false;
                } else if (state.selectedElement === 'background_lottie') {
                    state.backgroundLottie.selected = false;
                } else {
                    let element = state.elements.find(e => e.id === state.selectedElement);
                    if (element) {
                        element.selected = false;
                    }
                }
            }
            if (payload) {
                if (payload === 'background_video') {
                    state.backgroundVideo.selected = true;
                } else if (payload === 'background_lottie') {
                    state.backgroundLottie.selected = true;
                } else {
                    let element = state.elements.find(e => e.id === payload);
                    element.selected = true;
                }
            }
            state.selectedElement = payload;
        },
        set_state(state, payload) {
            state.state = payload;
        },
        update_content(state, payload) {
            let element = state.elements.find(elem => elem.id === payload.id);
            element.content = {
                ...element.content,
                ...payload.sets
            };
            element.changeNumber = element.changeNumber ? element.changeNumber + 1 : 0;
        },
        set_background_video(state, payload) {
            let defaultSet = {
                type: 'video',
                x: 0,
                y:0,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                selected: false,
                styles: {
                },
            };
            if (payload) {
                state.backgroundVideo = {
                    ...defaultSet,
                    ...payload
                };
            } else {
                state.backgroundVideo = false;
                if (state.selectedElement === 'background_video') {
                    state.selectedElement = false;
                }
            }
        },
        update_backgroundVideo_style(state, payload) {
            state.backgroundVideo.styles = {
                ...state.backgroundVideo.styles,
                ...payload
            };
        },
        set_background_lottie(state, payload) {
            let defaultSet = {
                type: 'lottie',
                x: 0,
                y:0,
                scaleX: 1,
                scaleY: 1,
                angle: 0,
                selected: false,
                styles: {
                },
            };
            if (payload) {
                state.backgroundLottie = {
                    ...defaultSet,
                    ...payload
                };
            } else {
                state.backgroundLottie = false;
                if (state.selectedElement === 'background_lottie') {
                    state.selectedElement = false;
                }
            }
        },
        update_backgroundLottie_style(state, payload) {
            state.backgroundLottie.styles = {
                ...state.backgroundLottie.styles,
                ...payload
            };
        },
        update_element_sort(state, payload) {
            state.elements = payload;
        },
        element_change_plus(state, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            element.changeNumber = 'changeNumber' in element ? (element.changeNumber + 1) : 0;
        },
        lottie_change_plus(state, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            element.lottieChangeNumber = 'lottieChangeNumber' in element ? (element.lottieChangeNumber + 1) : 0;
        }

    },
    getters: {
        timeSeek: (state) => (now = new Date().getTime()) => {
            if (state.timer.timeFlag === false) {
                return state.timer.flagSeek;
            } else {
                return state.timer.flagSeek + new Date().getTime() - state.timer.timeFlag;
            }
        },
    },
    actions: {
        align_left({commit, state, rootState}, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            let x = (element.scaleX - 1) * element.width;
            commit('update', {id: payload, sets: {x: x}});
        },
        align_horizon_center({commit, state, rootState}, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            let x = (rootState.template.width - element.width * element.scaleX) / 2 + (element.scaleX - 1) * element.width;
            commit('update', {id: payload, sets: {x: x}});
        },
        align_right({commit, state, rootState}, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            let x = rootState.template.width - element.width;
            commit('update', {id: payload, sets: {x: x}});
        },
        align_top({commit, state, rootState}, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            let y = (element.scaleY - 1) * element.height;
            commit('update', {id: payload, sets: {y: y}});
        },
        align_vertical_center({commit, state, rootState}, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            let y = (rootState.template.height - element.height * element.scaleY) / 2 + (element.scaleY - 1) * element.height;
            commit('update', {id: payload, sets: {y: y}});
        },
        align_bottom({commit, state, rootState}, payload) {
            let element = state.elements.find(elem => elem.id === payload);
            let y = rootState.template.height - element.height;
            commit('update', {id: payload, sets: {y: y}});
        },
        play_animation({commit, state}, payload) {
            commit('update_animation', {id: payload, sets: {play: true}});
        },
        play_slide({commit, state, getters, dispatch}) {
            commit('set_state', 'play');
            commit('update_timer', {
                timeFlag: new Date().getTime(),
                flagSeek: 0,
            });
            setTimeout(() => {
                if (getters.timeSeek() > state.duration) {
                    dispatch('stop_slide');
                }
            }, state.duration + 100);
        },
        pause_slide({commit, state}) {
            commit('update_timer', {
                flagSeek: state.timer.flagSeek + new Date().getTime() - state.timer.timeFlag,
                timeFlag: false
            });
            commit('set_state', 'pause');
        },
        resume_slide({commit, state, getters, dispatch}) {
            commit('update_timer', {
                timeFlag: new Date().getTime()
            });
            commit('set_state', 'play');
            setTimeout(() => {
                if (getters.timeSeek() > state.duration) {
                    dispatch('stop_slide');
                }
            }, state.duration - getters.timeSeek() + 100);
        },
        stop_slide({commit, state, getters}) {
            commit('set_state', 'edit');
            commit('update_timer', {
                flagSeek: false,
                timeFlag: false,
            });
        },
        add_new({commit, state, dispatch}, payload) {
            commit('add_new', payload);
            commit('template/insert_history', {}, { root: true });
        },
        delete_element({commit, state, dispatch}, payload) {
            commit('delete_element', payload);
            commit('template/insert_history', {}, { root: true });
        }
    }
}
