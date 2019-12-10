<template>
    <div class="plan_create row">
        <div class="col-lg-12">
            <vue-form class="form-horizontal form-validation" :state="formstate" @submit.prevent="onSubmit">
                <div class="card bg-primary-card">
                    <h4 class="card-header">
                        <div><i class="fas fa-edit"></i> {{ $route.params.id === '0' ? `Create Plan` : `Update Plan` }}</div>
                    </h4>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div role="group" class="form-group form-inline">
                                    <label for="plan_name" class="d-block">Plan Name*</label>
                                    <validate tag="div">
                                        <input id="plan_name" name="plan_name" type="text" class="form-control" v-model="model.plan_name" required autofocus minlength="2"/>
                                        <field-messages name="plan_name" show="$invalid && $submitted" class="text-danger">
                                            <div slot="required">Plan name is a required</div>
                                            <div slot="minlength">Plan name should be at least 2 characters long</div>
                                        </field-messages>
                                    </validate>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="product_id" class="d-block">Product ID</label>
                                    <div>
                                        <input type="text" id="product_id" name="product_id" class="form-control" v-model="model.product_id" :disabled="model.free_plan"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="product_url" class="d-block">Checkout Page URL</label>
                                    <div>
                                        <input type="text" id="product_url" name="product_url" class="form-control" v-model="model.product_url" :disabled="model.free_plan"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="amount" class="d-block">Amount($)</label>
                                    <div>
                                        <input type="number" id="amount" name="amount" class="form-control" v-model="model.amount" :disabled="model.free_plan"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="trial_plan" class="d-block">Trial plan</label>
                                    <div>
                                        <toggle-button id="trial_plan" v-model="model.trial_plan" :sync="true"
                                                       :labels="{checked: 'Yes', unchecked: 'No'}" :color="{checked: '#09BD8F', unchecked: '#dc6460'}"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline" v-if="model.trial_plan">
                                    <label for="duration" class="d-block">Trial Duration</label>
                                    <div class="row">
                                        <div class="col-4">
                                            <div>
                                                <input type="number" id="trial_duration" name="trial_duration" class="form-control" v-model="model.trial_duration" :disabled="!model.trial_plan"/>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            Day(s)
                                        </div>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="free_plan" class="d-block">Free plan</label>
                                    <div>
                                        <toggle-button id="free_plan" v-model="model.free_plan" :sync="true"
                                                       :labels="{checked: 'Yes', unchecked: 'No'}" :color="{checked: '#09BD8F', unchecked: '#dc6460'}"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="duration" class="d-block">Plan Duration</label>
                                    <div class="row">
                                        <div class="col-4">
                                            <div>
                                                <input type="number" id="duration" name="duration" class="form-control" v-model="model.duration" :disabled="model.free_plan"/>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <select class="form-control mb-2 mr-sm-2 mb-sm-0" v-model="model.duration_schedule" id="duration_schedule" :disabled="model.free_plan">
                                                <option v-for="(d_s, i) in duration_options" :key="`duration_schedule_opt_${i}`" :value="d_s.id">{{ d_s.name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div role="group" class="form-group form-inline">
                                    <label for="video_limit" class="d-block">Video Limit</label>
                                    <div>
                                        <input type="number" id="video_limit" name="video_limit" class="form-control" v-model="model.video_limit" :disabled="model.free_plan"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="publish_limit" class="d-block">Publish Limit</label>
                                    <div>
                                        <input type="number" id="publish_limit" name="publish_limit" class="form-control" v-model="model.publish_limit" :disabled="model.free_plan"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="share_limit" class="d-block">Share Limit</label>
                                    <div>
                                        <input type="number" id="share_limit" name="share_limit" class="form-control" v-model="model.share_limit" :disabled="model.free_plan"/>
                                    </div>
                                </div>
                                <div role="group" class="form-group form-inline">
                                    <label for="description" class="d-block">Description*</label>
                                    <validate tag="div">
                                        <textarea id="description" name="description" v-model="model.description" class="form-control" required :rows="5" minlength="4"></textarea>
                                        <field-messages name="description" show="$invalid && $submitted" class="text-danger">
                                            <div slot="required">Description is a required</div>
                                            <div slot="minlength">Description should be at least 4 characters long</div>
                                        </field-messages>
                                    </validate>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-10 offset-lg-2">
                                <button type="submit" v-if="$route.params.id === '0'" class="btn btn-success">Create</button>
                                <button type="submit" v-else class="btn btn-success">Update</button>
                                <router-link to="/pricing" class="btn btn-light">Cancel</router-link>
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
        name: "plan_create",
        data: () => ({
            formstate: {},
            duration_options: [
                {id: 'day', name: 'Day(s)'},
                {id: 'week', name: 'Week(s)'},
                {id: 'month', name: 'Month(s)'},
                {id: 'year', name: 'Year(s)'}
            ],
            model: {
                plan_name: '',
                product_id: '',
                product_url: '',
                amount: '',
                free_plan: false,
                duration: 0,
                trial_plan: false,
                trial_duration: 0,
                duration_schedule: 'day',
                video_limit: 0,
                publish_limit: 0,
                share_limit: 0,
                status: 'Active',
                description: ''
            },
            types: ['error', 'warn', 'info', 'success'],
            title: 'Plans',
            msg: '',
            type: 'error'
        }),
        created() {
            this.setMiniToaster(miniToastr);
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
                this.$http.get(`/admin/plans/${this.$route.params.id}/edit`).then((r) => {
                    r.data.free_plan = r.data.free_plan ? r.data.free_plan === 1 : false;
                    r.data.trial_plan = r.data.trial_plan ? r.data.trial_plan === 1 : false;
                    this.model = r.data;
                }).catch((e) => {
                
                });
            },
            onSubmit() {
                if (this.formstate.$invalid) {
                    return false;
                } else {
                    if (this.$route.params.id === '0') {
                        this.$http.post(`/admin/plans`, this.model).then(() => {
                            this.$router.push('/pricing');
                        }).catch((e) => {
                            this.errorHandle(e);
                        });
                    } else {
                        this.$http.put(`/admin/plans/${this.$route.params.id}`, this.model).then(() => {
                            this.$router.push('/pricing');
                        }).catch((e) => {
                            this.errorHandle(e);
                        });
                    }
                }
            },
            dynamicMsg() {
                miniToastr[this.type](this.msg, this.title)
            },
            errorHandle(e) {
                this.type = 'error';
                if (e.response.data.plan_name) {
                    this.msg = e.response.data.plan_name;
                } else if (e.response.data.amount) {
                    this.msg = e.response.data.amount;
                } else if (e.response.data.description) {
                    this.msg = e.response.data.description;
                } else {
                    this.msg = e.response.data;
                }
                this.dynamicMsg();
            }
        }
    }
</script>
