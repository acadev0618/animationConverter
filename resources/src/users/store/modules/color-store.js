export default {
    namespaced: true,
    state: {
        solid: {
            recent: [
                '#ff0000',
            ],
            default_presets: [
                '#da2727',
                '#ff5722',
                '#ff9800',
                '#ffc107',
                '#cddc39',
                '#8bc34a',
                '#4caf50',
                '#009688',
                '#00bcd4',
                '#2196f3',
                '#3f51b5',
                '#673ab7',
                '#9c27b0',
                '#e91e63',
                '#7d8c93',
                '#905945',
            ],
        },
        gradient: [
            'linear-gradient(rgb(255, 255, 255) 0%, rgb(225, 230, 236) 100%)',
            'linear-gradient(rgb(216, 223, 227) 0%, rgb(174, 184, 189) 100%)',
            'linear-gradient(rgb(42, 42, 42) 0%, rgb(0, 0, 0) 100%)',
            'linear-gradient(rgb(255, 180, 61) 0%, rgb(255, 142, 61) 100%)',
            'linear-gradient(rgb(255, 230, 93) 0%, rgb(247, 195, 74) 100%)',
            'linear-gradient(rgb(203, 255, 90) 0%, rgb(129, 213, 69) 100%)',
            'linear-gradient(rgb(81, 189, 73) 0%, rgb(55, 134, 49) 100%)',
            'linear-gradient(rgb(115, 229, 220) 0%, rgb(52, 224, 210) 100%)',
            'linear-gradient(rgb(96, 204, 255) 0%, rgb(0, 156, 255) 100%)',
            'linear-gradient(rgb(0, 132, 255) 0%, rgb(13, 85, 185) 100%)',
            'linear-gradient(rgb(29, 62, 89) 0%, rgb(11, 37, 61) 100%)',
        ],
    },
    mutations: {
        add_new_recent (state, new_recent) {
            state.solid.recent.unshift(new_recent);
        }
    }
}
