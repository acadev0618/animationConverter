const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
/*
 * npm i jquery --save or yarn add jquery
 * commentout below code to enable juery autoloading
 * this allows you to use $() in all files.
 */

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
});
//====set alias for isotope
mix.webpackConfig({
    resolve: {
        alias: {
            'src': path.resolve(__dirname, 'resources/src/'),
            'admin': path.resolve(__dirname, 'resources/src/admin/'),
            'common': path.resolve(__dirname, 'resources/src/common/'),
            'assets': path.resolve(__dirname, 'resources/src/assets/'),
            'img': path.resolve(__dirname, 'resources/src/assets/img/'),
            'icon': path.resolve(__dirname, 'resources/src/assets/icon/'),
            'vue-all': path.resolve(__dirname, 'node_modules/vue/dist/vue.min.js')
        }
    },
    // https://github.com/JeffreyWay/laravel-mix/issues/936#issuecomment-331418769
    output: {
        publicPath: '/',
        chunkFilename: mix.inProduction() ? 'js/[name].[chunkhash].js' : 'js/[name].js'
    }
});

// Setup Autoprefixer
mix.options({
    postCss: [
        require('autoprefixer')()
    ],
    clearConsole: true
});

// Styles.
mix.sass('./resources/src/common/sass/main.scss', 'public/css/app.css');
mix.sass('./resources/src/admin/index.scss', 'public/css/admin.css');
mix.sass('./resources/src/users/index.scss', 'public/css/users.css');
mix.sass('./resources/src/users/scss/browse-video-template.scss', 'public/css/pages/users/browse-video-template.css');
mix.sass('./resources/src/users/scss/browse-my-template.scss', 'public/css/pages/users/browse-my-template.css');
mix.sass('./resources/src/users/scss/my-library-page.scss', 'public/css/pages/users/my-library-page.css');
mix.sass('./resources/src/users/scss/customize-video.scss', 'public/css/users/customize-video.css');
mix.sass('./resources/src/users/scss/view-template.scss', 'public/css/users/view-template.css');

// Users area.
// Users pages.
mix.js('./resources/src/users/pages/support.js', 'public/js/pages/support.js');
mix.js('./resources/src/users/pages/my-libraries.js', 'public/js/pages/my-libraries.js');
mix.js('./resources/src/users/pages/choose-templates.js', 'public/js/pages/choose-templates.js');
mix.js('./resources/src/users/pages/browse-video-template.js', 'public/js/pages/users/browse-video-template.js');
mix.js('./resources/src/users/pages/browse-my-template.js', 'public/js/pages/users/browse-my-template.js');
mix.js('./resources/src/users/pages/profile.js', 'public/js/pages/profile.js');
mix.js('./resources/src/users/main.js', 'public/js/users-main.js');

// Customize Video
mix.js('./resources/src/users/pages/customize-video.js', 'public/js/customize-video.js');
mix.js('./resources/src/users/pages/customize-test-video.js', 'public/js/customize-test-video.js');
mix.js('./resources/src/users/pages/view-template.js', 'public/js/view-template.js');
mix.js('./resources/src/users/pages/test-video.js', 'public/js/test-video.js');


mix.js('./resources/src/common/app.js', 'public/js/')
    .js('./resources/src/admin/index.js', 'public/js/admin.js')
    .js('./resources/src/users/index.js', 'public/js/users.js')
    .extract(['vue', 'jquery', 'axios', 'vuex', 'vue-axios', 'bootstrap']);

mix.copyDirectory('./resources/src/assets', 'public/assets');

// set path for production link
mix.setResourceRoot('/');
mix.disableSuccessNotifications();

// if (mix.inProduction()) {
//     mix.version();
// } else {
//     mix.sourceMaps();
//     mix.browserSync('127.0.0.2');
// }
