<template>
    <div class="forgot-password">
        <div class="container auth-form">
            <div class="login-area col-md-7 col-lg-6 m-0">
                <div class="logo h1">
                    <img src="~img/authors/logo.png" alt=""/>
                </div>
                <div class="h3">Send Confirmation Email</div>
                <vue-form class="mt-lg-3 mt-sm-3" :state="formstate" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <validate tag="div">
                            <input v-model="model.email" name="email" type="email" required placeholder="Email Address" class="form-control"/>
                            <field-messages name="email" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Email is a required field</div>
                                <div slot="email">Email is not valid</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success form-control login-btn text-uppercase">Send</button>
                    </div>
                    <div class="form-group row">
                        <div class="col-12 text-right font-weight-bold register-link">
                            <router-link tag="a" to="/signin">Log in now</router-link>
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
    import {mapMutations} from 'vuex';
    import options from "common/services/validations.js";
    import bottom from "../../components/layouts/bottom";
    
    Vue.use(VueForm, options);
    export default {
        name: "forgotpassword",
        components: {
            'bottom': bottom
        },
        data() {
            return {
                formstate: {},
                model: {
                    email: ""
                },
                types: ['error', 'warn', 'info', 'success'],
                title: 'Forgot Password',
                msg: 'Forgot password error',
                type: 'error'
            }
        },
        created() {
            this.setMiniToaster(window.miniToastr);
        },
        methods: {
            ...mapMutations([
                'setMiniToaster'
            ]),
            onSubmit() {
                if (this.formstate.$invalid) {
                    return false;
                } else {
                    this.$http.post(`/password/email`, {
                        email: this.model.email,
                        _token: window._vAppConfig.Token
                    }).then((r) => {
                        if (r.data.result === 'success') {
                            this.title = 'Forgot password';
                            this.type = 'success';
                            this.msg = 'Sent the email successfully. Please check your mail inbox.';
                            this.dynamicMsg();
                        } else {
                            this.title = 'Forgot password';
                            this.type = 'error';
                            this.msg = e.response.data.email;
                            this.dynamicMsg();
                        }
                    }).catch((e) => {
                        if (e.response.status === 422) {
                            this.title = 'Forgot password';
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
