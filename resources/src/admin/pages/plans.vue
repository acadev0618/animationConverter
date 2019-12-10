<template>
    <div class="plans row">
        <div class="col-lg-12 mb-3">
            <div class="card bg-primary-card">
                <h4 class="card-header">
                    <div><i class="fas fa-tags"></i> Plans List</div>
                </h4>
                <div class="card-body">
                    <v-client-table :data="plansData" :columns="columns" :options="options">
                        <span slot="id" slot-scope="props">{{ props.row.id }}</span>
                        <span slot="action" slot-scope="props">
                            <a class="far fa-edit text-primary mr-2 pointer-cursor" @click="editData(props.row.id)"></a>
                            <a data-toggle="modal" data-target="#delConfirm" class="far fa-trash-alt text-danger pointer-cursor" @click="deleteData(props.row.id)"></a>
                        </span>
                    </v-client-table>
                    <div class="pull-right">
                        <router-link to="/pricing/edit/0" class="btn btn-primary"><i class="fas fa-plus"></i> Create a pricing plan</router-link>
                    </div>
                </div>
            </div>
        </div>
        <confirm modalId="delConfirm" labelledBy="planDeleteModalLabel" modalLabel="Delete Plan"
                 okMethod="ok-delete-plan" :okMethodParam="{data: ''}" okString="Delete" confirmString="Are you sure?" okBtnClass="btn btn-danger"></confirm>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {ClientTable} from 'vue-tables-2';
    import Confirm from '../components/Confirm'
    
    Vue.use(ClientTable);
    
    export default {
        name: "plans",
        components: {
            'confirm': Confirm
        },
        data: () => ({
            columns: ['id', 'plan_name', 'product_id', 'amount', 'duration', 'video_limit', 'description', 'status', 'action'],
            plansData: [],
            options: {},
            deleteId: '',
            types: ['error', 'warn', 'info', 'success'],
            title: 'Plans',
            msg: '',
            type: 'error'
        }),
        beforeDestroy() {
            window.vEvent.stop('ok-delete-plan', this.confirmDel);
        },
        created() {
            this.setMiniToaster(window.miniToastr);
        },
        mounted() {
            window.vEvent.listen('ok-delete-plan', this.confirmDel);
            this.options = this.$store.state.table_options;
            this.options.headings = {
                id: 'ID',
                plan_name: 'Name',
                product_id: 'Product ID',
                amount: 'Amount',
                duration: 'Duration',
                video_limit: 'Limit',
                description: 'Description',
                status: 'Status',
                action: 'Action'
            };
            this.options.sortable = ['plan_name', 'product_id'];
            this.options.filterable = ['plan_name', 'product_id', 'amount', 'duration', 'video_limit', 'description', 'status'];
            
            this.getData();
        },
        methods: {
            ...mapMutations([
                'setMiniToaster',
                'deleteMessage'
            ]),
            getData() {
                this.$http.get(`/admin/plans`).then((r) => {
                    this.plansData = r.data;
                });
            },
            editData(id) {
                this.$router.push(`/pricing/edit/${id}`);
            },
            deleteData(id) {
                this.deleteId = id;
            },
            confirmDel() {
                $('#delConfirm').modal('hide');
                this.$http.delete(`/admin/plans/${this.deleteId}`).then((r) => {
                    this.getData();
                    if (r.data.success === 'success') {
                        this.deleteMessage(window.miniToastr);
                    } else {
                        this.msg = 'Delete failed!';
                        this.dynamicMsg();
                    }
                }).catch((e) => {
                    this.msg = e.response.data;
                    this.dynamicMsg();
                });
            },
            dynamicMsg() {
                window.miniToastr[this.type](this.msg, this.title)
            }
        }
    }
</script>
