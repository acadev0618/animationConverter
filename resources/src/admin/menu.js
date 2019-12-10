const menu_items = [{
    name: 'Users',
    icon: 'fas fa-users',
    child: [{
        name: 'Users List',
        link: '/',
        icon: 'fas fa-angle-double-right'
    }, {
        name: 'Create User',
        link: '/create-user',
        icon: 'fas fa-angle-double-right'
    }]
}, {
    name: 'Plans',
    icon: 'fas fa-tag',
    link: '/pricing',
    event: ''
}, {
    name: 'Roles',
    icon: 'fas fa-user-secret',
    link: '/groups',
    event: ''
}, {
    name: 'Configs',
    icon: 'fas fa-cog',
    link: '/settings',
    event: ''
}, {
    name: 'Libraries',
    icon: 'fas fa-folder-open',
    link: '/library-manage',
    event: ''
}, {
    name: 'Templates',
    icon: 'fas fa-film',
    link: '/template-manage',
    event: ''
}, {
    name: 'Slides',
    icon: 'fas fa-film',
    link: '/slide-manage',
    event: ''
}, {
    name: 'Logout',
    icon: 'fas fa-sign-out-alt',
    link: '/signin',
    event: 'logout'
}];

export default menu_items;
