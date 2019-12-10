<template>
    <div class="roles row">
        <div class="col-lg-12 mb-3">
            <div class="card bg-primary-card">
                <h4 class="card-header">
                    <div><i class="fas fa-list"></i> Roles List</div>
                </h4>
                <div class="card-body">
                    <v-client-table :data="groupsData" :columns="columns" :options="options">
                        <span slot="id" slot-scope="props">{{ props.row.id }}</span>
                        <a slot="owner" slot-scope="props" href="/">{{ props.row.owner }}</a>
                        <span slot="action" slot-scope="props">
						<a class="far fa-edit text-primary mr-2 pointer-cursor" @click="editData(props.row.id)"></a>
						<a data-toggle="modal" data-target="#delRoleConfirm" class="far fa-trash-alt text-danger pointer-cursor" @click="deleteData(props.row.id)"></a>
					</span>
                    </v-client-table>
                    <div class="pull-right">
                        <router-link to="/groups/edit/0" class="btn btn-info"><i class="fas fa-plus"></i> Create a role</router-link>
                    </div>
                </div>
            </div>
        </div>
        <confirm modalId="delRoleConfirm" labelledBy="roleDeleteModalLabel" modalLabel="Delete Role"
                 okMethod="ok-delete-role" :okMethodParam="{data: ''}" okString="Delete" confirmString="Are you sure?" okBtnClass="btn btn-danger"></confirm>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {ClientTable} from 'vue-tables-2';
    import Confirm from '../components/Confirm'

    Vue.use(ClientTable);
    export default {
        name: "roles",
        components: {
            'confirm': Confirm
        },
        data: () => ({
            columns: ['id', 'name', 'is_admin', 'template_editable', 'owner', 'action'],
            groupsData: [],
            options: {},
            deleteId: '',
            types: ['error', 'warn', 'info', 'success'],
            title: 'Plans',
            msg: '',
            type: 'error'
        }),
        beforeDestroy() {
            window.vEvent.stop('ok-delete-role', this.confirmDel);
        },
        created() {
            this.setMiniToaster(window.miniToastr);
        },
        mounted() {
            window.vEvent.listen('ok-delete-role', this.confirmDel);
            this.options = this.$store.state.table_options;
            this.options.headings = {
                id: 'ID',
                name: 'Name',
                is_admin: 'Admin Accessible',
                template_editable: 'Template Editable',
                owner: 'Owners',
                action: 'Action'
            };
            this.options.sortable = ['name'];
            this.options.filterable = ['name'];

            this.getData();
        },
        methods: {
            ...mapMutations([
                'setMiniToaster',
                'deleteMessage'
            ]),
            getData() {
                this.$http.get(`/admin/roles`).then((r) => {
                    this.groupsData = r.data;
                });
            },
            editData(id) {
                this.$router.push(`/groups/edit/${id}`);
            },
            deleteData(id) {
                this.deleteId = id;
            },
            confirmDel() {
                $('#delRoleConfirm').modal('hide');
                this.$http.delete(`/admin/roles/${this.deleteId}`).then((r) => {
                    this.deleteMessage(window.miniToastr);
                    this.getData();
                }).catch((e) => {
                    this.msg = e.response.data;
                    this.dynamicMsg();
                });
            },
            cancelDel() {
                this.deleteId = '';
            },
            dynamicMsg() {
                window.miniToastr[this.type](this.msg, this.title)
            }
        }
    }
</script>
