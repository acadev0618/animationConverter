require('../bootstrap');
import Vuex from 'vuex'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import miniToastr from 'mini-toastr';
import mutations from './store/mutations'
import state from './store/state';
import routes from './router'
import Main from './Main'
import VEvent from './services/VEvent';
import BootstrapVue from 'bootstrap-vue';

window.Vue = require('vue');
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, window.axios);
Vue.use(BootstrapVue);
miniToastr.init();
window.vEvent = new VEvent();
window.miniToastr = miniToastr;

//=======vuex store start===========
const store = new Vuex.Store({
    state: state,
    mutations
});

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: "active"
});

router.beforeEach((to, from, next) => {
    store.commit("routeChange", "start");
    // scroll to top when changing pages
    if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0
    } else if (document.documentElement) {
        document.documentElement.scrollTop = 0
    }
    if (store.state.app_config.mode === 'user') {
        if (to.path !== '/' && to.path !== '/signin' && to.path !== '/register' && to.path !== '/forgotpassword' && to.path.indexOf('reset_password') < 0) {
            next('/signin')
        } else {
            next()
        }
    } else {
        next()
    }
});

//====change page title after route change

router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title + " - " + store.site_name;
        // set pageTitle to null if it is set manually elsewhere
        store.commit('changePageTitle', to.meta.title);
        store.commit("routeChange", "end")
    }
});

// Remove the productionTip in dev tool console
Vue.config.productionTip = false;
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main)
});
