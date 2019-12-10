<template>
    <div class="user-list row">
        <div class="col-lg-12">
            <div class="card bg-primary-card">
                <h4 role="tab" class="card-header">
                    <div class="d-block">
                        <span class="pull-left ml-1"><i class="fas fa-search"></i> Search User</span>
                        <span class="pull-right mr-1">
                            <a target="_self" href="#searchable" class="btn btn-no-border" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="searchable">
                                <i class="fas fa-angle-up text-white font-weight-bold"></i>
                                <i class="fas fa-angle-down text-white font-weight-bold"></i>
                            </a>
                        </span>
                    </div>
                </h4>
                <div id="searchable" class="collapse show">
                    <div class="card-body">
                        <vue-form :state="formstate" @submit.prevent="onSubmit" id="searchForm">
                            <div class="row ml-1 mr-1">
                                <div class="col-md-6">
                                    <div role="group" class="form-group form-inline">
                                        <label for="name" class="d-block">Name</label>
                                        <div><input type="text" id="name" name="name" class="form-control" v-model="model.name"/></div>
                                    </div>
                                    <div role="group" class="form-group form-inline">
                                        <label for="email" class="d-block">Email</label>
                                        <validate tag="div">
                                            <input id="email" name="email" type="email" v-model="model.email" class="form-control"
                                                   pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,30}$"/>
                                            <field-messages name="email" show="$invalid && $submitted" class="text-danger">
                                                <div slot="pattern">Please insert a valid email address</div>
                                            </field-messages>
                                        </validate>
                                    </div>
                                    <div role="group" class="form-group form-inline">
                                        <label for="role" class="d-block">Role Name</label>
                                        <div>
                                            <multiselect v-model="model.role" :options="groups" placeholder="~~ Select a role ~~"
                                                         id="role" name="role" label="name" track-by="id"></multiselect>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div role="group" class="form-group form-inline">
                                        <label for="plan" class="d-block">Plan Status</label>
                                        <div>
                                            <multiselect v-model="model.plan" :options="plans" placeholder="~~ Select a plan ~~"
                                                         label="plan_name" id="plan" name="plan" track-by="id"></multiselect>
                                        </div>
                                    </div>
                                    <div role="group" class="form-group form-inline">
                                        <label for="banned" class="d-block">Banned Status</label>
                                        <div>
                                            <multiselect v-model="model.banned" :options="banned" placeholder="~~ Select a status ~~"
                                                         label="name" id="banned" name="banned" track-by="id"></multiselect>
                                        </div>
                                    </div>
                                    <div role="group" class="form-group form-inline">
                                        <label for="subscription" class="d-block">Subscription</label>
                                        <div>
                                            <multiselect v-model="model.subscription" :options="subscription" placeholder="~~ Select a status ~~"
                                                         label="name" id="subscription" name="subscription" track-by="name"></multiselect>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-10 offset-lg-2">
                                    <button type="submit" class="btn btn-primary">Search</button>
                                    <button type="reset" class="btn btn-outline-secondary" @click="resetSearch">Reset</button>
                                </div>
                            </div>
                        </vue-form>
                    </div>
                </div>
            </div>
            <div class="card bg-primary-card mt-3">
                <h4 class="card-header">
                    <div><i class="fas fa-users"></i> All Users</div>
                </h4>
                <div class="card-body">
                    <v-client-table :data="members" :columns="columns" :options="options">
                        <span slot="id" slot-scope="props"></span>
                        <span slot="name" slot-scope="props">
						<p class="font-weight-bold">
							<router-link :to="`/edit-user/${props.row.id}`" class="hover-link">{{ props.row.name }} <i class="fas fa-pen"></i></router-link>
						</p>
						<p>
							<a href="#" class="hover-link" @click="loginAsUser(props.row.id)">
								<i class="fas fa-hand-o-right"></i> Login with user's own privileges
							</a>
						</p>
					</span>
                        <span slot="email" slot-scope="props">
                            <p>
                                Email: <code class="bg-primary text-white h5 p-1">{{ props.row.email }}</code>
                            </p>
                            <p>
                                Role: <code class="bg-primary text-white h5 p-1">{{ props.row.roles[0].name }}</code>
                            </p>
                        </span>
                        <span slot="status" slot-scope="props">
                            <code class="bg-warning text-white p-1" v-if="props.row.user_profile.banned">Banned</code>
                            <code class="bg-warning text-white p-1" v-else-if="!props.row.user_profile.activated">Not Activated</code>
                            <code class="bg-warning text-white p-1" v-else-if="!props.row.user_profile.current_plan">Expired</code>
                            <code class="bg-success text-white p-1" v-else>Activated</code>
                        </span>
                        <span slot="action" slot-scope="props">
                            <a class="btn fa fa-retweet btn-success mr-2 btn-sm" v-if="!props.row.user_profile.activated" @click=""></a>
                            <a class="btn btn-success mr-2 btn-sm" v-else-if="props.row.user_profile.banned" @click="unBan(props.row)">UnBan</a>
                            <a class="btn btn-warning fa fa-ban mr-2 btn-sm" v-else data-toggle="modal" data-target="#user_ban_modal" @click="banMember(props.row)"></a>
                            <a class="btn btn-danger fa fa-trash-alt btn-sm" data-toggle="modal" data-target="#user_delete_modal" @click="deleteMember(props.row)"></a>
                        </span>
                        <span slot="subscription" slot-scope="props">
                            <template v-if="props.row.user_profile.current_plan">
                                <div>Payment Plan: <code class="bg-primary text-white p-1">{{ props.row.plans[0].plan_name }}</code></div>
                                <div>Status: <code class="bg-success text-white p-1">{{ props.row.user_plan.status }}</code></div>
                                <div>Activated on: <code class="bg-success text-white p-1">{{ props.row.user_plan.activated_on }}</code></div>
                                <div v-if="!props.row.user_plan.free_flag">Expire on: <code class="bg-success text-white p-1">{{ props.row.user_plan.expiry_on }}</code></div>
                                <div>Payment Method: <code class="bg-success text-white p-1">{{ props.row.user_plan.payment_method }}</code></div>
                            </template>
                            <template v-else>
                                <p>No Active Subscription</p>
                            </template>
                        </span>
                    </v-client-table>
                </div>
            </div>
        </div>
        <confirm modalId="user_ban_modal" labelledBy="userBanModalLabel" modalLabel="Ban User"
                 okMethod="ok-ban-user" okString="Ban" confirmString="Are you sure?" :okMethodParam="{data: ''}" okBtnClass="btn btn-primary"></confirm>
        <confirm modalId="user_delete_modal" labelledBy="userDeleteModalLabel" modalLabel="User Delete"
                 okMethod="ok-delete-user" :okMethodParam="{data: 'banned'}" okString="Delete" confirmString="Are you sure?" okBtnClass="btn btn-danger"></confirm>
    </div>
</template>

<script>
    import VueForm from "vue-form";
    import options from "common/services/validations.js";
    import Multiselect from 'vue-multiselect';
    import {mapMutations} from 'vuex';
    import {ClientTable} from 'vue-tables-2';
    import Confirm from '../components/Confirm'
    
    Vue.use(ClientTable);
    Vue.use(VueForm, options);
    
    export default {
        name: "user_list",
        components: {
            'multiselect': Multiselect, 'confirm': Confirm
        },
        data: () => ({
            formstate: {},
            model: {
                name: "",
                email: "",
                role: null,
                banned: null,
                subscription: null,
                plan: null
            },
            types: ['error', 'warn', 'info', 'success'],
            title: 'Roles',
            msg: '',
            type: 'error',
            groups: [],
            plans: [],
            banned: [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}],
            subscription: [{name: 'Active'}, {name: 'Expired'}, {name: 'Cancelled'}],
            members: [],
            columns: ['id', 'name', 'email', 'status', 'action', 'subscription'],
            options: {},
            deleteId: '',
            banId: '',
        }),
        created() {
            this.setMiniToaster(miniToastr);
        },
        beforeDestroy() {
            window.vEvent.stop('ok-delete-user', this.okDelete);
            window.vEvent.stop('ok-ban-user', this.okBan);
        },
        mounted() {
            window.vEvent.listen('ok-delete-user', this.okDelete);
            window.vEvent.listen('ok-ban-user', this.okBan);
            this.getRoles();
            this.getPlans();
            this.options = this.$store.state.table_options;
            this.options.headings = {
                id: '',
                name: 'Name',
                email: 'Email',
                status: 'Status',
                action: 'Action',
                subscription: 'Subscription Details',
            };
            this.options.sortable = ['name', 'email'];
            this.options.filterable = false;
            this.getMembers();
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
                }).catch((e) => {
                    this.errorHandle(e);
                });
            },
            getPlans() {
                this.$http.get(`/admin/plans`).then((r) => {
                    this.plans = r.data;
                }).catch((e) => {
                    this.errorHandle(e);
                });
            },
            getMembers() {
                this.$http.get(`/admin/users/create`).then((r) => {
                    this.members = r.data;
                }).catch((e) => {
                    this.errorHandle(e);
                });
            },
            okDelete() {
                $('#user_delete_modal').modal('hide');
                this.$http.delete(`/admin/users/${this.deleteId}`).then((r) => {
                    this.getMembers();
                }).catch((e) => {
                    this.errorHandle(e);
                });
            },
            deleteMember(item) {
                this.deleteId = item.id;
            },
            okBan(flag) {
                $('#user_ban_modal').modal('hide');
                this.$http.put(`/admin/users/${this.banId}`, {
                    flag: flag
                }).then((r) => {
                    this.getMembers();
                }).catch((e) => {
                    this.errorHandle(e);
                });
            },
            unBan(item) {
                this.banId = item.id;
                this.okBan('no-ban');
            },
            banMember(item) {
                this.banId = item.id;
            },
            onSubmit() {
                if (this.formstate.$invalid) {
                    return false;
                } else {
                    let param = `?name=${this.model.name}&email=${this.model.email}`;
                    param += this.model.role !== null ? `&role=${this.model.role.id}` : `&role=`;
                    param += this.model.banned !== null ? `&banned=${this.model.banned.id}` : `&banned=`;
                    param += this.model.plan !== null ? `&plan=${this.model.plan.id}` : `&plan=`;
                    param += this.model.subscription !== null ? `&subscription=${this.model.subscription.name}` : `&subscription=`;
                    this.$http.get(`/admin/users/create${param}`).then((r) => {
                        this.members = r.data;
                    }).catch((e) => {
                        this.errorHandle(e);
                    });
                }
            },
            loginAsUser(id) {
                window.location.href = `/login-as/${id}`;
            },
            dynamicMsg() {
                miniToastr[this.type](this.msg, this.title)
            },
            errorHandle(e) {
                this.type = 'error';
                this.msg = e.response.data;
                this.dynamicMsg();
            },
            resetSearch() {
                this.model = {
                    name: "",
                    email: "",
                    role: null,
                    banned: null,
                    subscription: null,
                    plan: null
                };
            }
        }
    }
</script>
