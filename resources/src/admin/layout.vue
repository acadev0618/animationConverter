<template>
    <div>
        <preloader v-show="this.$store.state.preloader"></preloader>
        <vueadmin_header></vueadmin_header>
        <div class="wrapper row-offcanvas">
            <left_side v-show="this.$store.state.left_open"></left_side>
            <right_side>
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </right_side>
        </div>
    </div>
</template>
<script>
    /**
     * These are the files that enable you to change layouts and other options
     */
    
    /**
     * import preloader
     * choose from preloader and bounce
     */
    import preloader from 'common/components/layouts/preloader/preloader'
    /**
     * The right side content
     */
    import right_side from './layouts/right-side'
    /**
     * import left-side from default or horizontal-menu
     * eg: import left_side from 'layouts/left-side/horizontal-menu/left-side'
     */
    import left_side from './layouts/left-side/default/left-side'
    /**
     * import from header or fixed-header or no-header
     */
    import vueadmin_header from './layouts/header/fixed-header'
    
    export default {
        name: 'layout',
        components: {
            preloader,
            vueadmin_header,
            left_side,
            right_side
        },
        data() {
            return {
                showtopbtn: false
            }
        },
        mounted() {
            if (window.innerWidth <= 992) {
                this.$store.commit('left_menu', 'close')
            }
        }
    }
</script>
