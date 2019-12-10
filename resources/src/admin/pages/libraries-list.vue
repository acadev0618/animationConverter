<template>
    <div class="libraries-list">
        <div class="card bg-primary-card">
            <h4 class="card-header">
                <div><i class="fas fa-images"></i> Library Files</div>
            </h4>
            <div class="card-body">
                <div class="tabs">
                    <div>
                        <ul role="tablist" class="nav nav-tabs" id="library_tab_controls">
                            <li role="presentation" class="nav-item" v-for="(f_item, ind) in file_types" :key="`library_${ind}`">
                                <a class="nav-link tab-title" :class="{'active': flag === ind}"
                                   :id="`library-tab-${ind}`" data-toggle="tab" target="_self" :href="`#library-content-${ind}`" role="tab" :aria-controls="`library_controls_${ind}`"
                                   aria-selected="true" @click="getData(ind)">{{ f_item }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-content" id="library_tab_content">
                        <div class="tab-pane fade" v-for="(f_item, f_ind) in file_types" :key="`library_content_${f_ind}`"
                             :class="{'show': flag === f_ind, 'active': flag === f_ind}"
                             :id="`library-content-${f_ind}`" role="tabpanel" :aria-labelledby="`library-tab-${f_ind}`">
                            <v-client-table :data="librariesData" :columns="columns" :options="options" class="mt-2">
                                <span slot="id" slot-scope="props"></span>
                                <span slot="origin_file_name" slot-scope="props">
                                    <a :href="`${path_obj[flag]}${props.row.file_name}`" target="_blank" class="hover-link">
                                        <img :src="`${path_obj[flag]}${props.row.file_name}`" alt="" class="img-thumbnail img-fluid" style="width: 100px;"/>
                                        {{ props.row.origin_file_name }}
                                    </a>
                                </span>
                                <span slot="action" slot-scope="props">
                                    <a class="fas fa-pen text-primary mr-2 pointer-cursor" @click="editData(props.row.id)"></a>
                                    <a data-toggle="modal" data-target="#delConfirm" class="far fa-trash-alt text-danger pointer-cursor" @click="deleteData(props.row.id)"></a>
                                </span>
                            </v-client-table>
                            <div class="pull-right">
                                <router-link :to="`/library-upload/${f_ind}`" class="btn btn-info"><i class="fas fa-upload"></i> Upload new file</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <confirm modalId="delConfirm" labelledBy="libraryDeleteModalLabel" modalLabel="Delete File"
                 okMethod="ok-delete-library-file" :okMethodParam="{data: ''}" okString="Delete" confirmString="Are you sure?" okBtnClass="btn btn-danger"></confirm>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import {ClientTable} from 'vue-tables-2';
    import Confirm from '../components/Confirm'
    
    Vue.use(ClientTable);
    export default {
        name: "libraries-list",
        components: {
            'confirm': Confirm
        },
        data: () => ({
            columns: ['id', 'origin_file_name', 'tags', 'description', 'duration', 'file_type', 'action'],
            file_types: ['Backgrounds(Pattern)', 'Backgrounds(Texture)', 'Videos', 'Elements(Graphics)', 'Elements(Lines)', 'Elements(Shapes)', 'Sounds'],
            librariesData: [],
            options: {},
            deleteId: '',
            types: ['error', 'warn', 'info', 'success'],
            title: 'Library',
            msg: '',
            type: 'error',
            flag: 0,
            path_obj: [
                '/storage/libraries/pattern/', '/storage/libraries/texture/', '/storage/libraries/videos/',
                '/storage/libraries/graphics/', '/storage/libraries/lines/', '/storage/libraries/shapes/', '/storage/libraries/sounds/'
            ]
        }),
        beforeDestroy() {
            window.vEvent.stop('ok-delete-library-file', this.confirmDel);
        },
        created() {
            this.setMiniToaster(miniToastr);
        },
        mounted() {
            window.vEvent.listen('ok-delete-library-file', this.confirmDel);
            this.options = this.$store.state.table_options;
            this.options.headings = {
                id: '',
                origin_file_name: 'Name',
                tags: 'Tag Name',
                description: 'Description',
                duration: 'Duration',
                file_type: 'File Type',
                action: 'Action'
            };
            this.options.sortable = ['origin_file_name', 'tags'];
            this.options.filterable = ['origin_file_name', 'tags', 'description'];
            this.getData(0);
        },
        methods: {
            ...mapMutations([
                'setMiniToaster',
                'deleteMessage'
            ]),
            getData(flag) {
                this.flag = flag;
                this.librariesData = [];
                this.$http.get(`/admin/assets?flag=${flag}`).then((r) => {
                    this.librariesData = r.data;
                }).catch((e) => {
                    console.log(e);
                });
            },
            editData(id) {
                this.$router.push(`/libraries/edit/${id}`);
            },
            deleteData(id) {
                this.deleteId = id;
            },
            confirmDel() {
                $('#delConfirm').modal('hide');
                this.$http.delete(`/admin/assets/${this.deleteId}`).then((r) => {
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
