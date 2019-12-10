<template>
    <div class="login">
        <div class="container auth-form">
            <div class="login-area col-md-7 col-lg-6 m-0">
                <div class="logo h1">
                    <img src="~img/authors/logo.png" alt=""/>
                </div>
                <div class="h3 text-uppercase">Login To Your Account</div>
                <vue-form class="mt-lg-3 mt-sm-3" :state="formstate" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <validate tag="div">
                            <label for="email" class="text-left w-100 h5 text-uppercase">Email:</label>
                            <input v-model="model.email" name="email" id="email" type="email" required autofocus class="form-control login-input" placeholder="Your Email..."/>
                            <field-messages name="email" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Email is a required field</div>
                                <div slot="email">Email is not valid</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <validate tag="div">
                            <label for="pwd" class="text-left w-100 h5 text-uppercase">Password:</label>
                            <input v-model="model.password" name="password" id="pwd" type="password" required placeholder="Your Password..." class="form-control login-input" minlength="6"/>
                            <field-messages name="password" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Password is required</div>
                                <div slot="minlength">Password should be at least 6 characters long</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <input type="hidden" v-model="model.remember" name="remember">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary form-control login-btn text-uppercase">Login</button>
                    </div>
                    <div class="form-group row">
                        <div class="col-6 text-right font-weight-bold register-link">
                            <router-link tag="a" to="/register">Sign Up</router-link>
                        </div>
                        <div class="col-6 text-left font-weight-bold forgot-link">
                            <router-link tag="a" to="/forgotpassword">Forgot Password?</router-link>
                        </div>
                    </div>
                </vue-form>
            </div>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
    import VueForm from "vue-form";
    import options from "common/services/validations.js";
    import {mapMutations} from 'vuex';
    import bottom from "../../components/layouts/bottom";
    
    Vue.use(VueForm, options);
    
    export default {
        name: "login",
        components: {
            'bottom': bottom
        },
        data() {
            return {
                formstate: {},
                model: {
                    email: "",
                    password: "",
                    remember: false
                },
                types: ['error', 'warn', 'info', 'success'],
                title: 'Login',
                msg: 'Login error',
                type: 'error'
            }
        },
        created() {
            this.setMiniToaster(window.miniToastr);
        },
        mounted() {
            this.setUserMode('user');
        },
        methods: {
            ...mapMutations([
                'setMiniToaster',
                'setUserMode'
            ]),
            onSubmit() {
                if (this.formstate.$invalid) {
                    return false;
                } else {
                    axios.post(`/login`, this.model).then((r) => {
                        this.title = 'Login Success';
                        this.type = 'success';
                        this.msg = 'Authentication Success!';
                        this.dynamicMsg();
                        location.href = '/';
                    }).catch((e) => {
                        console.log(e);
                        if (e.response.status === 422) {
                            this.title = 'Login Failed';
                            this.type = 'error';
                            this.msg = e.response.data.errors.email[0];
                            this.dynamicMsg();
                        } else {
                            this.type = 'error';
                            this.msg = e.response.data.message;
                            this.dynamicMsg();
                        }
                    });
                }
            },
            dynamicMsg() {
                window.miniToastr[this.type](this.msg, this.title)
            }
        }
    }
</script>
