<template>
    <div class="template-list">
        <div class="col-lg-12 mb-3">
            <div class="card bg-primary-card">
                <h4 class="card-header">
                    <div><i class="fas fa-film"></i> Templates List</div>
                </h4>
                <div class="card-body">
                    <div class="tabs">
                        <div>
                            <ul role="tablist" class="nav nav-tabs" id="temp_tab_controls">
                                <li role="presentation" class="nav-item" v-for="(f_item, ind) in file_types" :key="`temp_${ind}`">
                                    <a class="nav-link tab-title" :class="{'active': flag === ind}"
                                       :id="`temp-tab-${ind}`" data-toggle="tab" target="_self" :href="`#temp-content-${ind}`" role="tab" :aria-controls="`temp_controls_${ind}`"
                                       aria-selected="true" @click="getData(ind)">{{ f_item }}</a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content" id="temp_tab_content">
                            <div class="tab-pane fade" v-for="(f_item, f_ind) in file_types" :key="`temp_content_${f_ind}`"
                                 :class="{'show': flag === f_ind, 'active': flag === f_ind}"
                                 :id="`temp-content-${f_ind}`" role="tabpanel" :aria-labelledby="`temp-tab-${f_ind}`">
                                <v-client-table :data="templatesData" :columns="columns" :options="options" class="mt-2">
                                    <span slot="id" slot-scope="props"></span>
                                    <span slot="temp_name" slot-scope="props">
                                        <a :href="`${path_obj[flag]}${props.row.thumb_url}`" target="_blank" class="hover-link">
                                            <img :src="`${props.row.thumb_url}`" alt="" class="img-thumbnail img-fluid" style="width: 100px;"/>
                                            {{ props.row.temp_name }}
                                        </a>
                                    </span>
                                    <span slot="action" slot-scope="props">
    							        <a class="fas fa-pen text-primary mr-2 pointer-cursor" @click="editData(props.row.id)"></a>
                                        <a data-toggle="modal" data-target="#delTempConfirm" class="far fa-trash-alt text-danger pointer-cursor" @click="deleteData(props.row.id)"></a>
                                    </span>
                                </v-client-table>
                                <div class="pull-right">
                                    <router-link :to="`/template-upload/${f_ind}`" class="btn btn-primary"><i class="fas fa-upload"></i> Upload new template</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <confirm modalId="delTempConfirm" labelledBy="tempDeleteModalLabel" modalLabel="Delete Template"
                 okMethod="ok-delete-template" :okMethodParam="{data: ''}" okString="Delete" confirmString="Are you sure?" okBtnClass="btn btn-danger"></confirm>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {ClientTable} from 'vue-tables-2';
    import Confirm from '../components/Confirm';

    Vue.use(ClientTable);
    export default {
        name: "template-list",
        components: {
            'confirm': Confirm
        },
        data: () => ({
            columns: ['id', 'temp_name', 'duration', 'aspect_type', 'asset_type', 'temp_type', 'action'],
            file_types: ['Bodymovin', 'Text Effect', 'Image Template'],
            templatesData: [],
            options: {},
            deleteId: '',
            types: ['error', 'warn', 'info', 'success'],
            title: 'Template',
            msg: '',
            type: 'error',
            flag: 0,
            path_obj: [
                '/storage/libraries/backgrounds/', '/storage/libraries/backgrounds/', '/storage/libraries/backgrounds/'
            ]
        }),
        beforeDestroy() {
            window.vEvent.stop('ok-delete-template', this.confirmDel);
        },
        created() {
            this.setMiniToaster(miniToastr);
        },
        mounted() {
            window.vEvent.listen('ok-delete-template', this.confirmDel);
            this.options = this.$store.state.table_options;
            this.options.headings = {
                id: '',
                temp_name: 'Template Name',
                bg_image_url: 'BG Image Name',
                thumb_url: 'Thumb Name',
                duration: 'Duration',
                aspect_type: 'Aspect Type',
                asset_type: 'Asset Type',
                temp_type: 'Type',
                action: 'Action'
            };
            this.options.sortable = ['temp_name', 'temp_type', 'aspect_type'];
            this.options.filterable = ['temp_name', 'temp_type', 'aspect_type', 'asset_type'];
            this.getData(0);
        },
        methods: {
            ...mapMutations([
                'setMiniToaster',
                'deleteMessage'
            ]),
            getData(flag) {
                this.flag = flag;
                this.templatesData = [];
                this.$http.get(`/admin/templates?flag=${flag}`).then((r) => {
                    if (r.data.length) {
                        this.templatesData = r.data;
                    }
                }).catch((e) => {
                    console.log(e);
                });
            },
            editData(id) {
                this.$router.push(`/template/edit/${id}`);
            },
            deleteData(id) {
                this.deleteId = id;
            },
            confirmDel() {
                $('#delTempConfirm').modal('hide');
                this.$http.delete(`/admin/templates/${this.deleteId}`).then((r) => {
                    this.deleteMessage(miniToastr);
                    this.getData(this.flag);
                }).catch((e) => {
                    this.msg = e.response.data;
                    this.dynamicMsg();
                });
            },
            dynamicMsg() {
                miniToastr[this.type](this.msg, this.title)
            }
        }
    }
</script>
