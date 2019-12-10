const layout = [{
    path: '/',
    component: resolve => require(['admin/pages/user_list'], resolve),
    meta: {
        title: "Members",
    }
}, {
    path: '/create-user',
    component: resolve => require(['admin/pages/user_create'], resolve),
    meta: {
        title: "Create Member",
    }
}, {
    path: '/edit-user/:id',
    component: resolve => require(['admin/pages/user_edit'], resolve),
    meta: {
        title: "Edit Member",
    }
}, {
    path: '/pricing',
    component: resolve => require(['admin/pages/plans'], resolve),
    meta: {
        title: "Plans",
    }
}, {
    path: '/pricing/edit/:id',
    component: resolve => require(['admin/pages/plan_create'], resolve),
    meta: {
        title: "Plans Form",
    }
}, {
    path: '/groups',
    component: resolve => require(['admin/pages/roles'], resolve),
    meta: {
        title: "Roles",
    }
}, {
    path: '/groups/edit/:id',
    component: resolve => require(['admin/pages/role_edit'], resolve),
    meta: {
        title: "Roles Form",
    }
}, {
    path: '/settings',
    component: resolve => require(['admin/pages/configs'], resolve),
    meta: {
        title: "Configs Management",
    }
}, {
    path: '/library-manage',
    component: resolve => require(['admin/pages/libraries-list'], resolve),
    meta: {
        title: "Library Files",
    }
}, {
    path: '/library-upload/:flag',
    component: resolve => require(['admin/pages/library-upload'], resolve),
    meta: {
        title: "Library Upload",
    }
}, {
    path: '/libraries/edit/:id',
    component: resolve => require(['admin/pages/library-edit'], resolve),
    meta: {
        title: "Library Edit",
    }
}, {
    path: '/template-manage',
    component: resolve => require(['admin/pages/template-list/template-list.vue'], resolve),
    meta: {
        title: "Template Files",
    }
}, {
    path: '/template-manage/:tab',
    component: resolve => require(['admin/pages/template-list/template-list.vue'], resolve),
    meta: {
        title: "Template Files",
    }
}, {
    path: '/video-template-editor',
    component: resolve => require(['admin/pages/video-template-editor/video-template-editor.vue'], resolve),
    meta: {
        title: "Upload Video Template",
    }
}, {
    path: '/video-template-editor/:id',
    component: resolve => require(['admin/pages/video-template-editor/video-template-editor.vue'], resolve),
    meta: {
        title: "Update Video Template",
    }
}, {
    path: '/slide-manage',
    component: resolve => require(['admin/pages/slide-list/slide-list.vue'], resolve),
    meta: {
        title: "Veasy Slides",
    }
}, {
    path: '/slide-editor',
    component: resolve => require(['admin/pages/slide-editor/slide-editor.vue'], resolve),
    meta: {
        title: "Upload Slide",
    }
}, {
    path: '/slide-editor/:id',
    component: resolve => require(['admin/pages/slide-editor/slide-editor.vue'], resolve),
    meta: {
        title: "Update Slide",
    }
}, {
    path: '/bodymovin-editor/:id',
    component: resolve => require(['admin/pages/bodymovin-editor/bodymovin-editor.vue'], resolve),
    meta: {
        title: "Bodymovin Template",
    }
}, {
    path: '/bodymovin-editor/0/:type',
    component: resolve => require(['admin/pages/bodymovin-editor/bodymovin-editor.vue'], resolve),
    meta: {
        title: "Bodymovin Template",
    }
}, {
    path: '/template/edit/:id',
    component: resolve => require(['admin/pages/template-edit'], resolve),
    meta: {
        title: "Template Edit",
    }
}];

export default layout
