const routes = [{
    path: '/',
    component: resolve => require(['common/pages/auth/login'], resolve),
    meta: {
        title: "Log In",
    }
}, {
    path: '/signin',
    component: resolve => require(['common/pages/auth/login'], resolve),
    meta: {
        title: "Log In",
    }
},  {
    path: '/register',
    component: resolve => require(['common/pages/auth/register'], resolve),
    meta: {
        title: "Sign Up",
    }
}, {
    path: '/forgotpassword',
    component: resolve => require(['common/pages/auth/forgotpassword'], resolve),
    meta: {
        title: "Forgot Password",
    }
}, {
    path: '/reset_password/:token',
    component: resolve => require(['common/pages/auth/reset-password'], resolve),
    meta: {
        title: "Reset Password",
    }
}, {
    path: '/password/reset/:token',
    component: resolve => require(['common/pages/auth/reset-password'], resolve),
    meta: {
        title: "Reset Password",
    }
}];

export default routes
