<template>
    <div class="library-upload">
        <div class="card bg-primary-card">
            <h4 class="card-header">
                <div><i class="fas fa-upload"></i> Library {{ headerStr[$route.params.flag] }} files upload</div>
            </h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div>
                            <button type="button" class="btn btn-primary" @click.prevent.stop="$router.go(-1)"><i class="fas fa-angle-left"></i> Go files list</button>
                        </div>
                        <div class="form-group mt-3">
                            <label class="label" for="tags">Tag Name</label>
                            <input type="text" id="tags" v-model="models.tags" class="form-control"/>
                        </div>
                        <div class="form-group mt-2">
                            <label class="label" for="description">Description, Categories</label>
                            <textarea v-model="models.description" id="description" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="col-md-8" v-if="!loading">
                        <vue-clip :options="options" :on-complete="complete" :on-init="init" :on-sending="sending">
                            <template slot="clip-uploader-action">
                                <div>
                                    <div class="dz-message">
                                        <h2 class="text-center"> Click or Drag and Drop files here upload </h2>
                                    </div>
                                </div>
                            </template>
                            <template slot="clip-uploader-body" slot-scope="props">
                                <div class="table-responsive">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Preview</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="file in props.files" v-if="file.status !== 'removed'">
                                            <td>
                                                <img v-bind:src="file.dataUrl" v-if="file.dataUrl" alt=""/>
                                                <span v-else>No Preview Available</span>
                                            </td>
                                            <td>{{ file.name }}</td>
                                            <td>{{ file.status }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="text-right">
                                    <button class="btn btn-warning" @click="clearFiles">Clear</button>
                                    <button class="btn btn-success" @click="upload" :disabled="models.tags === '' || models.description === ''">Upload</button>
                                </div>
                            </template>
                        </vue-clip>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import VueClip from 'vue-clip'
    
    Vue.use(VueClip);
    export default {
        name: "library-upload",
        data: () => ({
            models: {
                tags: '',
                description: ''
            },
            instance: "",
            options: {
                url: `/admin/assets`,
                paramName: 'file',
                autoProcessQueue: false,
                acceptedFiles: 'image/*',
                maxFiles: {
                    limit: 20,
                    message: 'You can only upload a max of 20 files'
                },
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': window._vAppConfig.Token
                }
            },
            loading: true,
            headerStr: ['background image', 'background video', 'image', 'sound']
        }),
        mounted() {
            if (this.$route.params.flag === '0' || this.$route.params.flag === '1' || this.$route.params.flag === '3' || this.$route.params.flag === '4' || this.$route.params.flag === '5') {
                this.options.acceptedFiles = 'image/*';
            } else if (this.$route.params.flag === '2') {
                this.options.acceptedFiles = 'video/*';
            } else if (this.$route.params.flag === '6') {
                this.options.acceptedFiles = 'audio/*';
            }
            this.loading = false;
        },
        methods: {
            complete(file, status, xhr) {
                // console.log(JSON.parse(xhr.response).link);
            },
            init(uploader) {
                this.instance = uploader.uploader._uploader;
                // console.log(uploader.uploader._uploader);
            },
            upload() {
                this.instance.processQueue();
            },
            sending(file, xhr, formData) {
                formData.append("_token", window._vAppConfig.Token);
                formData.append("tags", this.models.tags);
                formData.append("description", this.models.description);
                formData.append("flag", this.$route.params.flag);
            },
            clearFiles() {
                this.instance.removeAllFiles();
            }
        }
    }
</script>
