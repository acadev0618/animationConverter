<template>
    <div class="members-edit">
        <vue-form :state="formstate" @submit.prevent="onSubmit">
            <div class="card bg-primary-card">
                <h4 class="card-header">
                    <div><i class="fas fa-user-plus"></i> Create User Account</div>
                </h4>
                <div class="card-body">
                    <div class="tabs">
                        <div>
                            <ul role="tablist" class="nav nav-tabs" id="user_create_tab_controls">
                                <li role="presentation" class="nav-item">
                                    <a class="nav-link active member-tab-title" id="base-info-tab" data-toggle="tab" href="#base-info" role="tab" aria-controls="base_information"
                                       aria-selected="true">Base Information</a>
                                </li>
                                <li role="presentation" class="nav-item">
                                    <a class="nav-link member-tab-title" id="personal-info-tab" data-toggle="tab" href="#personal-info" role="tab" aria-controls="personal_information"
                                       aria-selected="false">Personal Information</a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content" id="user_create_tab_content">
                            <div class="tab-pane fade show active" id="base-info" role="tabpanel" aria-labelledby="base-info-tab">
                                <div class="row mt-5">
                                    <div class="col-md-6">
                                        <div role="group" class="form-group form-inline">
                                            <label for="name" class="d-block">Name*</label>
                                            <validate tag="div">
                                                <input type="text" id="name" name="name" v-model="model.name" class="form-control" required autofocus minlength="2"/>
                                                <field-messages name="name" show="$invalid && $submitted" class="text-danger">
                                                    <div slot="required">First name is a required</div>
                                                    <div slot="minlength">First name should be at least 2 characters long</div>
                                                </field-messages>
                                            </validate>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="email" class="d-block">Email Address*</label>
                                            <validate tag="div">
                                                <input type="email" id="email" name="email" v-model="model.email" class="form-control"
                                                       pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,30}$" required/>
                                                <field-messages name="email" show="$invalid && $submitted" class="text-danger">
                                                    <div slot="required">Email is a required</div>
                                                    <div slot="pattern">Please insert a valid email address</div>
                                                </field-messages>
                                            </validate>
                                        </div>
                                        
                                    </div>
                                    <div class="col-md-6">
                                        <div role="group" class="form-group form-inline">
                                            <label for="password" class="d-block">Password</label>
                                            <validate tag="div">
                                                <input type="password" id="password" name="password" class="form-control" v-model="model.password" minlength="6"/>
                                                <field-messages name="password" show="$invalid && $submitted" class="text-danger">
                                                    <div slot="minlength">Password should be at least 6 characters long</div>
                                                </field-messages>
                                            </validate>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="password_confirmation" class="d-block">Confirm Password</label>
                                            <validate tag="div">
                                                <input type="password" id="password_confirmation" name="password_confirmation" class="form-control" v-model="model.password_confirmation"
                                                       :sameas="model.password"/>
                                                <field-messages name="password_confirmation" show="$invalid && $submitted" class="text-danger">
                                                    <div slot="sameas">Password and Confirm Password should match</div>
                                                </field-messages>
                                            </validate>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="role" class="d-block">Role*</label>
                                            <validate tag="div">
                                                <multiselect v-model="model.role" :options="groups" placeholder="~~ Select a role ~~"
                                                             label="name" id="role" name="role" track-by="id" required></multiselect>
                                                <field-messages name="role" show="$invalid && $submitted" class="text-danger">
                                                    <div slot="required">User role is a required</div>
                                                </field-messages>
                                            </validate>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="personal-info" role="tabpanel" aria-labelledby="personal-info-tab">
                                <div class="row mt-5">
                                    <div class="col-md-6">
                                        <div role="group" class="form-group form-inline">
                                            <label for="company" class="d-block">Company</label>
                                            <div>
                                                <input type="text" id="company" name="company" class="form-control" v-model="model.company"/>
                                            </div>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="address" class="d-block">Address</label>
                                            <div>
                                                <textarea id="address" name="address" class="form-control" v-model="model.address" :rows="3" :max-rows="6"></textarea>
                                            </div>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="city" class="d-block">City</label>
                                            <div>
                                                <input type="text" id="city" name="city" class="form-control" v-model="model.city"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div role="group" class="form-group form-inline">
                                            <label for="postal_code" class="d-block">Zip / Postal Code</label>
                                            <div>
                                                <input type="text" id="postal_code" name="postal_code" class="form-control" v-model="model.postal_code"/>
                                            </div>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="country" class="d-block">Country</label>
                                            <div>
                                                <multiselect v-model="model.country" :options="countries" placeholder="~~ Select a country ~~"
                                                             label="name" id="country" name="country" track-by="code"></multiselect>
                                            </div>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="state_code" class="d-block">State / province / region</label>
                                            <div>
                                                <input type="text" id="state_code" name="state_code" class="form-control" v-model="model.state_code"/>
                                            </div>
                                        </div>
                                        <div role="group" class="form-group form-inline">
                                            <label for="phone" class="d-block">Phone number</label>
                                            <div>
                                                <input type="tel" id="phone" name="phone" class="form-control" v-model="model.phone"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-lg-10 offset-lg-2">
                            <button type="submit" class="btn btn-primary">Create User</button>
                            <router-link to="/" class="btn btn-light">Cancel</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </vue-form>
    </div>
</template>

<script>
    import VueForm from "vue-form";
    import options from "common/services/validations.js";
    import Multiselect from 'vue-multiselect';
    import {mapMutations} from 'vuex';
    
    Vue.use(VueForm, options);
    export default {
        name: "user_create",
        components: {
            'multiselect': Multiselect
        },
        data: () => ({
            formstate: {},
            model: {
                name: "",
                email: "",
                password: '',
                password_confirmation: '',
                role: null,
                company: '',
                address: '',
                city: '',
                postal_code: '',
                country: '',
                state_code: '',
                phone: ''
            },
            types: ['error', 'warn', 'info', 'success'],
            title: 'User Create',
            msg: '',
            type: 'error',
            countries: [],
            groups: []
        }),
        created() {
            this.setMiniToaster(miniToastr);
        },
        mounted() {
            if (this.$store.state.app_config.countries) {
                this.countries = JSON.parse(this.$store.state.app_config.countries);
            }
            this.getRoles();
        },
        methods: {
            ...mapMutations([
                'setMiniToaster'
            ]),
            getRoles() {
                this.$http.get(`/admin/roles`).then((r) => {
                    this.groups = r.data;
                    this.groups = r.data.filter(function (item) {
                        return item.id !== 1;
                    });
                });
            },
            onSubmit() {
                if (this.formstate.$invalid) {
                    return false;
                } else {
                    this.$http.post(`/admin/users`, this.model).then((r) => {
                        this.$router.push('/');
                    }).catch((e) => {
                        this.errorHandle(e);
                    });
                }
            },
            dynamicMsg() {
                miniToastr[this.type](this.msg, this.title)
            },
            errorHandle(e) {
                this.type = 'error';
                if (e.response.data.name) {
                    this.msg = e.response.data.name;
                } else if (e.response.data.email) {
                    this.msg = e.response.data.email;
                } else if (e.response.data.password) {
                    this.msg = e.response.data.password;
                } else {
                    this.msg = e.response.data;
                }
                this.dynamicMsg();
            }
        }
    }
</script>

<style scoped>

</style>
