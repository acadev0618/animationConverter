<template>
    <div class="template-edit">
        <div class="card bg-primary-card">
            <h4 class="card-header">
                <div><i class="fas fa-edit"></i> {{ models.temp_name }} Template Data Update</div>
            </h4>
            <div class="card-body">
                <h3>{{ models.temp_name }}</h3>
                <div class="row">
                    <div class="col-md-6">
                        <div>
                            <button type="button" class="btn btn-primary" @click.prevent.stop="$router.go(-1)"><i class="fas fa-angle-left"></i> Go files list</button>
                        </div>
                        <div class="form-group mt-3">
                            <label class="label">Template Name</label>
                            <input type="text" v-model="models.temp_name" class="form-control"/>
                        </div>
                        <div class="form-group mt-2">
                            <label class="label">JSON data</label>
                            <textarea v-model="models.data_json" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group mt-3">
                            <label class="label">BG Name</label>
                            <input type="text" v-model="models.bg_image_url" class="form-control"/>
                        </div>
                        <div class="form-group mt-3">
                            <label class="label">Thumb Name</label>
                            <input type="text" v-model="models.thumb_url" class="form-control"/>
                        </div>
                        <div class="form-group mt-3">
                            <label class="label">Aspect Type</label>
                            <select class="form-control" v-model="models.aspect_type">
                                <option value="Portrait">Portrait</option>
                                <option value="Square">Square</option>
                                <option value="Vertical">Vertical</option>
                                <option value="Landscape">Landscape</option>
                            </select>
                        </div>
                        <button class="btn btn-info" :disabled="models.temp_name === '' || models.data_json === ''" @click="updateData">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "template-edit",
        data: () => ({
            models: {
                temp_name: 'A',
                data_json: '',
                s3_url: `/storage/libraries/backgrounds/`,
                bg_image_url: 'img_01.png',
                thumb_url: 'Square_01.png',
                aspect_type: 'Square'
            }
        }),
        mounted() {
            this.getFileData();
        },
        methods: {
            getFileData() {
                this.$http.get(`/admin/templates/${this.$route.params.id}`).then((r) => {
                    this.models.temp_name = r.data.temp_name;
                    this.models.data_json = r.data.data_json;
                    this.models.bg_image_url = r.data.bg_image_url;
                    this.models.thumb_url = r.data.thumb_url;
                    this.models.aspect_type = r.data.aspect_type;
                });
            },
            updateData() {
                this.$http.put(`/admin/templates/${this.$route.params.id}`, {
                    temp_name: this.models.temp_name,
                    data_json: this.models.data_json,
                    bg_image_url: this.models.bg_image_url,
                    thumb_url: this.models.thumb_url,
                    aspect_type: this.models.aspect_type
                }).then((r) => {
                    this.$router.push(`/template-manage`);
                });
            }
        }
    }
</script>
