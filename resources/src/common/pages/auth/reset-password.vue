<template>
    <div class="forgot-password">
        <div class="container auth-form">
            <div class="login-area col-md-7 col-lg-6 m-0">
                <div class="logo h1">
                    <img src="~img/authors/logo.png" alt=""/>
                </div>
                <div class="h3">Reset Your Password</div>
                <vue-form class="mt-lg-3 mt-sm-3" :state="formstate" @submit.prevent="onSubmit">
                    <div class="form-group">
                        <validate tag="div">
                            <input v-model="model.password" name="password" type="password" required placeholder="New Password" class="form-control" minlength="6"/>
                            <field-messages name="email" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Password is required</div>
                                <div slot="minlength">Password should be at least 6 characters long</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <validate tag="div">
                            <input v-model="model.repeatPassword" name="repeatpassword" type="password" required placeholder="Confirm Password" class="form-control"
                                   :sameas="model.password">
                            <field-messages name="repeatpassword" show="$invalid && $submitted" class="text-danger">
                                <div slot="required">Password confirmation is required</div>
                                <div slot="sameas">Password and Confirm password should match</div>
                            </field-messages>
                        </validate>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success form-control login-btn text-uppercase">Reset Password</button>
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
    import options from "common/services/validations.js";
    import bottom from "../../components/layouts/bottom";
    
    Vue.use(VueForm, options);
	export default {
		name: "reset-password",
        components: {
            'bottom': bottom
        },
        data() {
            return {
                formstate: {},
                model: {
                    password: "",
                    repeatPassword: "",
                    email: '',
                    token: '',
                }
            }
        },
        mounted: function () {
            if (window._vAppConfig.resetInfo) {
                this.model.email = window._vAppConfig.resetInfo.email;
                this.model.token = this.$route.params.token;
            }
        },
        methods: {
            onSubmit: function () {
                if (this.formstate.$invalid) {
                    return false;
                } else {
                    this.$http.post(`/password/reset`, {
                        token: this.model.token,
                        email: this.model.email,
                        password: this.model.password,
                        password_confirmation: this.model.repeatPassword,
                        _token: window._vAppConfig.Token,
                    }).then((r) => {
                        window.location.href = '/';
                    }).catch((e) => {
                        console.log(e);
                    });
                }
            }
        }
	}
</script>
