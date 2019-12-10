<template>
    <div class="register">
        <div class="container auth-form">
            <div class="login-area col-md-7 col-lg-6 m-0">
                <div class="logo h1">
                    <img src="~img/authors/logo.png" alt=""/>
                </div>
                <div class="h3 text-black-50">Create Account</div>
                <vue-form class="mt-lg-3 mt-sm-3" :state="formstate" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <validate tag="div">
                            <label for="name" class="text-left w-100 h5">Name:</label>
                            <input v-model="model.name" name="name" id="name" type="text" required autofocus class="form-control login-input" placeholder="Your Name..."/>
                            <field-messages name="email" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Name is a required field</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <validate tag="div">
                            <label for="email" class="text-left w-100 h5">Email Address:</label>
                            <input v-model="model.email" name="email" id="email" type="email" required autofocus class="form-control login-input" placeholder="Your Email..."/>
                            <field-messages name="email" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Email is a required field</div>
                                <div slot="email">Email is not valid</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <validate tag="div">
                            <label for="pwd" class="text-left w-100 h5">Password:</label>
                            <input v-model="model.password" name="password" id="pwd" type="password" required placeholder="Your Password..." class="form-control login-input" minlength="8"/>
                            <field-messages name="password" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Password is required</div>
                                <div slot="minlength">Password should be at least 8 characters long</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <validate tag="div">
                            <label for="pwd" class="text-left w-100 h5">Confirm Password:</label>
                            <input v-model="model.password_confirmation" name="password_confirmation" type="password" required placeholder="Confirm Password..." class="form-control login-input"
                                   :sameas="model.password">
                            <field-messages name="password_confirmation" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Password confirmation is required</div>
                                <div slot="sameas">Password and Confirm password should match</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success form-control login-btn">Sign up free</button>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 register-link">
                            Already have an account?
                            <router-link tag="a" to="/signin" class="font-weight-bold">Log in now</router-link>
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
        name: "register",
        components: {
            'bottom': bottom
        },
        data() {
            return {
                formstate: {},
                model: {
                    name: "",
                    email: "",
                    password: "",
                    password_confirmation: ""
                },
                types: ['error', 'warn', 'info', 'success'],
                title: 'Register',
                msg: 'Register error',
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
                    axios.post(`/register`, this.model).then((r) => {
                        this.title = 'Register Success';
                        this.type = 'success';
                        this.msg = 'Your account successfully created!';
                        this.dynamicMsg();
                        this.$router.push('/signin');
                    }).catch((e) => {
                        if (e.response.status === 422) {
                            this.title = 'Register Failed';
                            this.type = 'error';
                            this.msg = e.response.data.email;
                            this.dynamicMsg();
                        } else {
                            this.type = 'error';
                            this.msg = e.response.data;
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
