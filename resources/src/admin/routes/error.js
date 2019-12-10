const error_routes = [
    {
        path: '/401',
        component: resolve => require(['common/pages/errors/401'], resolve),
        meta: {
            title: "401 Error",
        }
    }, {
        path: '/500',
        component: resolve => require(['common/pages/errors/500'], resolve),
        meta: {
            title: "500 Error",
        }
    }, {
        path: '*',
        component: resolve => require(['common/pages/errors/404'], resolve),
        meta: {
            title: "404 Error",
        }
    }
];

export default error_routes;
