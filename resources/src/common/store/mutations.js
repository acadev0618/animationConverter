let mutations = {
    routeChange(state, loader) {
        if (loader === "start") {
            state.preloader = true
        } else if (loader === "end") {
            state.preloader = false
        }
    },
    changePageTitle(state, title) {
        state.page_title = title;
        document.title = state.site_name + " | " + title
    },
    setMiniToaster(state, miniToastr) {
        miniToastr.setIcon('error', 'i', {
            'class': 'fas fa-times'
        });
        miniToastr.setIcon('warn', 'i', {
            'class': 'fas fa-exclamation-triangle'
        });
        miniToastr.setIcon('info', 'i', {
            'class': 'fas fa-info-circle'
        });
        miniToastr.setIcon('success', 'i', {
            'class': 'fas fa-arrow-circle-o-down'
        });
    },
    deleteMessage(state, miniToastr) {
        miniToastr['success']('Successfully Deleted!', 'Delete Success')
    },
    saveMessage(state, miniToastr) {
        miniToastr['success']('Successfully Saved!', 'Save Success')
    },
    setUserMode(state, mode) {
        state.app_config.mode = mode;
    }
};

export default mutations
