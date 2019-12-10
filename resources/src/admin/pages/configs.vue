<template>
    <div class="configs row">
        <div class="col-lg-12">
            <div class="card bg-primary-card">
                <h4 class="card-header">
                    <div><i class="fas fa-cogs"></i> Config Management</div>
                </h4>
                <div class="card-body">
                    <div class="row mt-3" v-for="item in configData">
                        <template v-if="item.key === 'admin_email'">
                            <label class="label col-sm-3 text-sm-right font-weight-bold">Supper Administrator Email</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" v-model="item.value"/>
                            </div>
                        </template>
                        <template v-else-if="item.key === 'site_domain'">
                            <label class="label col-sm-3 text-sm-right font-weight-bold">Main Domain</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" v-model="item.value"/>
                            </div>
                        </template>
                        <template v-else-if="item.key === 'users_image'">
                            <label class="label col-sm-3 text-sm-right font-weight-bold">Users Profile Photo Path</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" v-model="item.value"/>
                            </div>
                        </template>
                        <template v-else-if="item.key === 'support_email'">
                            <label class="label col-sm-3 text-sm-right font-weight-bold">Support Email</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" v-model="item.value"/>
                            </div>
                        </template>
                        <template v-else-if="item.key === 'database'">
                            <label class="label col-sm-3 text-sm-right font-weight-bold">Database Prefix</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" v-model="item.value"/>
                            </div>
                        </template>
                        <template v-else-if="item.key === 'api_token'">
                            <label class="label col-sm-3 text-sm-right font-weight-bold">API Token</label>
                            <div class="col-sm-7">
                                <input type="text" class="form-control" v-model="item.value"/>
                            </div>
                        </template>
                    </div>
                    <div class="row mt-4">
                        <div class="col-lg-10 offset-lg-2">
                            <button type="button" class="btn btn-success" @click="onSubmit">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    
    export default {
        name: "configs",
        data: () => ({
            configData: [],
            types: ['error', 'warn', 'info', 'success'],
            title: 'Configs',
            msg: '',
            type: 'error'
        }),
        created() {
            this.setMiniToaster(window.miniToastr);
        },
        mounted() {
            this.getData();
        },
        methods: {
            ...mapMutations([
                'setMiniToaster',
                'saveMessage'
            ]),
            getData() {
                this.$http.get(`/admin/configs`).then((r) => {
                    this.configData = r.data;
                }).catch((e) => {
                    this.errorHandle(e);
                });
            },
            onSubmit() {
                this.$http.post(`/admin/configs`, this.configData).then((r) => {
                    this.saveMessage(window.miniToastr);
                }).catch((e) => {
                    this.errorHandle(e);
                });
            },
            dynamicMsg() {
                window.miniToastr[this.type](this.msg, this.title)
            },
            errorHandle(e) {
                this.type = 'error';
                this.msg = e.response.data;
                this.dynamicMsg();
            }
        }
    }
</script>
