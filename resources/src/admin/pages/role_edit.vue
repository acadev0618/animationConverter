<template>
    <div class="role-edit row">
        <div class="col-lg-12">
            <vue-form class="form-horizontal form-validation" :state="formstate" @submit.prevent="onSubmit">
                <div class="card bg-primary-card">
                    <h4 class="card-header">
                        <div><i class="fas fa-edit"></i> {{ $route.params.id === '0' ? `Create Role` : `Update Role` }}</div>
                    </h4>
                    <div class="card-body">
                        <div role="group" class="form-group form-inline">
                            <label for="name" class="d-block">Role Name*</label>
                            <validate tag="div">
                                <input id="name" name="name" type="text" class="form-control" v-model="model.name" required autofocus minlength="2"/>
                                <field-messages name="name" show="$invalid && $submitted" class="text-danger">
                                    <div slot="required">Role name is a required</div>
                                    <div slot="minlength">Role name should be at least 2 characters long</div>
                                </field-messages>
                            </validate>
                        </div>
                        <div role="group" class="form-group form-inline">
                            <label for="is_template" class="d-block">Admin Access*</label>
                            <toggle-button v-model="model.is_admin" id="is_template" :sync="true"
                                           :labels="{checked: 'Yes', unchecked: 'No'}" :color="{checked: '#09BD8F', unchecked: '#dc6460'}"/>
                        </div>
                        <div role="group" class="form-group form-inline">
                            <label for="is_template_editable" class="d-block">Template Editable*</label>
                            <toggle-button v-model="model.template_editable" id="is_template_editable" :sync="true"
                                           :labels="{checked: 'Yes', unchecked: 'No'}" :color="{checked: '#09BD8F', unchecked: '#dc6460'}"/>
                        </div>
                        <div class="row">
                            <div class="col-lg-10 offset-lg-2">
                                <button type="submit" v-if="$route.params.id === '0'" class="btn btn-success">Create</button>
                                <button type="submit" v-else class="btn btn-success">Update</button>
                                <router-link to="/groups" class="btn btn-light">Cancel</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </vue-form>
        </div>
    </div>
</template>

<script>
    import VueForm from "vue-form";
    import options from "common/services/validations.js";
    import {mapMutations} from 'vuex';

    Vue.use(VueForm, options);

    export default {
        name: "role_edit",
        data: () => ({
            formstate: {},
            model: {
                name: '',
                is_admin: false,
                template_editable: false,
            },
            types: ['error', 'warn', 'info', 'success'],
            title: 'Roles',
            msg: '',
            type: 'error'
        }),
        created() {
            this.setMiniToaster(window.miniToastr);
        },
        mounted() {
            if (this.$route.params.id !== '0') {
                this.getData();
            }
        },
        methods: {
            ...mapMutations([
                'setMiniToaster'
            ]),
            getData() {
                this.$http.get(`/admin/roles/${this.$route.params.id}/edit`).then((r) => {
                    r.data.is_admin = r.data.is_admin ? r.data.is_admin === 1 : false;
                    r.data.template_editable = r.data.template_editable ? r.data.template_editable === 1 : false;
                    this.model = r.data;
                }).catch((e) => {

                });
            },
            onSubmit() {
                if (this.formstate.$invalid) {
                    return false;
                } else {
                    if (this.$route.params.id === '0') {
                        this.$http.post(`/admin/roles`, this.model).then((r) => {
                            this.$router.push('/groups');
                        }).catch((e) => {
                            this.errorHandle(e);
                        });
                    } else {
                        this.$http.put(`/admin/roles/${this.$route.params.id}`, this.model).then((r) => {
                            this.$router.push('/groups');
                        }).catch((e) => {
                            this.errorHandle(e);
                        });
                    }
                }
            },
            dynamicMsg() {
                window.miniToastr[this.type](this.msg, this.title)
            },
            errorHandle(e) {
                this.type = 'error';
                if (e.response.data.name) {
                    this.msg = e.response.data.name;
                } else {
                    this.msg = e.response.data;
                }
                this.dynamicMsg();
            }
        }
    }
</script>
