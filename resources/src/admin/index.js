require('../bootstrap');
import Vuex from 'vuex'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import ToggleButton from 'vue-js-toggle-button';
import miniToastr from 'mini-toastr';
import mutations from './store/mutations'
import state from './store/state';
import auth_routes from './routes/auth';
import error_routes from './routes/error';
import layouts from './routes/layouts';
import VEvent from 'common/services/VEvent';
import Main from 'common/Main';

miniToastr.init();
window.Vue = require('vue');
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ToggleButton);
Vue.use(VueAxios, window.axios);
window.vEvent = new VEvent();
window.miniToastr = miniToastr;

//=======vuex store start===========
const store = new Vuex.Store({
    state: state,
    mutations
});

const routes = auth_routes.concat(error_routes);
if (store.state.app_config.mode === 'user') {
    routes.push({
        path: '/',
        component: resolve => require(['common/pages/auth/login'], resolve),
        meta: {
            title: "Login",
        }
    });
} else {
    routes.push({
        path: '/',
        component: resolve => require(['admin/layout'], resolve),
        children: layouts
    });
}

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

    next()
});

//====change page title after route change
router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title + " - " + store.site_name;
        // set pageTitle to null if it is set manually elsewhere
        store.commit('changePageTitle', to.meta.title);
        store.commit("routeChange", "end");
        if (window.innerWidth <= 992) {
            store.commit('left_menu', "close")
        } else {
            store.commit('left_menu', "open")
        }
    }
});

// Remove the productionTip in dev tool console
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('loading', Loading);
Vue.use(Loading);

import VuejsDialog from 'vuejs-dialog';
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
Vue.use(VuejsDialog);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main)
});
