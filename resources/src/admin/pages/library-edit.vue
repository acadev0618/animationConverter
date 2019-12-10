<template>
    <div class="library-edit">
        <div class="card bg-primary-card">
            <h4 class="card-header">
                <div><i class="fas fa-edit"></i> Update Tags And Description</div>
            </h4>
            <div class="card-body">
                <h3>{{ this.models.origin_file_name }}</h3>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group mt-3">
                            <label class="label">Tag Name</label>
                            <input type="text" v-model="models.tags" class="form-control"/>
                        </div>
                        <div class="form-group mt-2">
                            <label class="label">Description, Categories</label>
                            <textarea v-model="models.description" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group mt-2">
                            <button type="button" class="btn btn-success" :disabled="this.models.tags === '' || this.models.description === ''" @click="updateData">
                                <i class="fas fa-save"></i> Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "library-edit",
        data: () => ({
            models: {
                tags: '',
                description: '',
                origin_file_name: ''
            }
        }),
        mounted() {
            this.getFileData();
        },
        methods: {
            getFileData() {
                this.$http.get(`/admin/assets/${this.$route.params.id}`).then((r) => {
                    this.models.tags = r.data.tags;
                    this.models.description = r.data.description;
                    this.models.origin_file_name = r.data.origin_file_name;
                });
            },
            updateData() {
                this.$http.put(`/admin/assets/${this.$route.params.id}`, {
                    tags: this.models.tags,
                    description: this.models.description
                }).then((r) => {
                    this.$router.push(`/library-manage`);
                });
            }
        }
	}
</script>
