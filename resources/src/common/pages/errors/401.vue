<template>
    <div class="bg-color">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 col-xs-10 offset-xs-1 text-center error_content">
                    <div>
                        <div class="error"><span>401</span></div>
                        <div class="error-type"><span>Authentication Failure.</span></div>
                        <div>
                            <p class="error-msg">Sorry but you are not authorized to display this resource. Please re-login.</p>
                        </div>
                    </div>
                    <hr class="seperator">
                    <router-link to="/signin" class="btn btn-primary link-home" exact>Go Login</router-link>
                    <a href="/" class="btn btn-primary link-home" @click.prevent.stop="go_back">Go Back</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    
    export default {
        name: "err401",
        mounted: function () {
            this.setUserMode('user');
        },
        destroyed: function () {
        
        },
        methods: {
            ...mapMutations([
                'setUserMode'
            ]),
            go_back() {
                this.$router.go(-1)
            }
        }
    }
</script>
<style scoped>
    .bg-color {
        background-color: #EEE;
    }
    
    .container {
        min-height: 100vh;
        color: #FFF;
    }
    
    .error_content {
        margin-top: 7%;
    }
    
    .error {
        font-size: 150px;
        line-height: 160px;
        color: #555;
    }
    
    .error-type {
        font-size: 28px;
        color: #999;
    }
    
    .error-msg {
        font-size: 18px;
        margin: 45px 0;
        color: #333;
    }
    
    .seperator {
        border: 0;
        height: 2px;
        margin: 20px 0;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
    }
</style>
