<template>
    <div class="bodymovin-upload">
        <div class="card bg-primary-card">
            <h4 class="card-header">
                <div><i class="fas fa-upload"></i> {{ $route.meta.title }}</div>
            </h4>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <button type="button" class="btn btn-primary" @click.prevent.stop="$router.go(-1)"><i class="fas fa-angle-left"></i> Go files list</button>
                        </div>
                        <div class="form-group mb-2" v-if="!id">
                            <label class="label">JSON data</label>
                            <textarea v-model="sets.json" class="form-control" rows="3" v-on:input="onJsonInput"></textarea>
                        </div>
                        <div class="form-group mb-2">
                            <label class="label">Type</label>
                            <select class="form-control" v-model="sets.type">
                                <option v-for="type in types" :value="type.value">{{type.label}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button class="btn btn-info" :disabled="sets.json === ''" @click="save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./bodymovin-editor.js"></script>

<style scoped lang="scss" src="./bodymovin-editor.scss"></style>
