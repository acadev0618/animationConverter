let state = {
    left_open: true,
    preloader: true,
    site_name: "Video",
    page_title: null,
    user: {
        name: "User",
        last_name: "",
        picture: require("img/authors/user.jpg"),
        job: "Administrator",
        email: ""
    },
    forgot_email: ''
};



if (window._vAppConfig) {
    state.app_config = window._vAppConfig;
    if (state.app_config.user_info) {
        state.user.name = state.app_config.user_info.name;
        state.user.last_name = state.app_config.user_info.last_name;
        state.user.email = state.app_config.user_info.email;
        state.user.profile_key = state.app_config.user_info.profile_key;
        state.user.picture = `${state.app_config.user_info.picture}`;
    }
}

export default state
