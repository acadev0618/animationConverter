<template>
    <div class="template-upload">
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
                        <div class="form-group mb-2">
                            <label class="label">Template Name</label>
                            <input type="text" v-model="models.temp_name" class="form-control"/>
                        </div>
                        <div class="form-group mb-2">
                            <label class="label">Template Description</label>
                            <textarea v-model="models.temp_description" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group mb-2" v-if="!id">
                            <label class="label">JSON data</label>
                            <textarea v-model="models.data_json" class="form-control" rows="3" v-on:input="onJsonInput"></textarea>
                        </div>
                        <div class="form-group mb-2">
                            <label class="label">Category</label>
                            <select class="form-control" v-model="models.category">
                                <option v-for="(value, key) in categories" :value="key">{{value}}</option>
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <div class="dropdown app__checkbox-dropdown">
                                <button class="btn dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Design Type
                                </button>
                                <div class="dropdown-menu">
                                    <div class="dropdown-item" v-for="(item, key) in designs" @click="$event.stopPropagation();">
                                        <input class="styled-checkbox" :id="'design-checkbox-' + key" type="checkbox" :value="key" v-model="models.design_type" />
                                        <label :for="'design-checkbox-' + key">{{ item }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-2">
                            <label class="label">Aspect: Detected As ({{models.aspect}})</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="upload-section" v-for="asset in models.lottieAssets">
                            <div>
                                <div class="upload__image">
                                    <svg viewBox="0 0 24 24" width="24px"><path d="M19.35,10.04 C18.67,6.59 15.64,4 12,4 C9.11,4 6.6,5.64 5.35,8.04 C2.34,8.36 0,10.91 0,14 C0,17.31 2.69,20 6,20 L19,20 C21.76,20 24,17.76 24,15 C24,12.36 21.95,10.22 19.35,10.04 Z M14,13 L14,17 L10,17 L10,13 L7,13 L12,8 L17,13 L14,13 Z"></path></svg>
                                    <span>Upload Asset Image</span>
                                </div>
                            </div>
                            <div class="upload__drag-txt">
                                <span>or Drag and Drop to upload image</span>
                                <i>
                                    <svg height="10px" viewBox="0 0 10.47 24"><path d="M20.07,27.85a2.14,2.14,0,0,1-1.36-.32,1.51,1.51,0,0,1-.39-1.2,6.5,6.5,0,0,1,.12-1c0.09-.45.18-0.86,0.28-1.22L20,19.63a7,7,0,0,0,.25-1.34c0-.48.07-0.82,0.07-1a2.93,2.93,0,0,0-1-2.28,4,4,0,0,0-2.76-.88,6.76,6.76,0,0,0-2.11.36c-0.74.24-1.52,0.53-2.34,0.86l-0.33,1.37,0.86-.29a3.59,3.59,0,0,1,1-.14,1.92,1.92,0,0,1,1.32.33,1.62,1.62,0,0,1,.35,1.19,5.68,5.68,0,0,1-.11,1.05c-0.07.37-.17,0.78-0.28,1.2L13.65,24.5c-0.11.47-.19,0.88-0.24,1.25a8.72,8.72,0,0,0-.07,1.09,2.88,2.88,0,0,0,1,2.26,4.06,4.06,0,0,0,2.81.9,6.11,6.11,0,0,0,2.06-.32c0.59-.21,1.38-0.51,2.38-0.9l0.33-1.37a5.8,5.8,0,0,1-.83.28A3.88,3.88,0,0,1,20.07,27.85ZM19.28,11.59a3,3,0,0,0,2.09-.82,2.62,2.62,0,0,0,.86-2,2.65,2.65,0,0,0-.86-2,3.09,3.09,0,0,0-4.18,0,2.66,2.66,0,0,0-.87,2,2.63,2.63,0,0,0,.87,2A3,3,0,0,0,19.28,11.59Z" transform="translate(-11.77 -6)"></path></svg>
                                </i>
                            </div>
                            <input type="file" class="upload__input" @change="uploadPhoto($event, asset)"/>
                        </div>

                        <div class="upload-section">
                            <div>
                                <div class="upload__image">
                                    <svg viewBox="0 0 24 24" width="24px"><path d="M19.35,10.04 C18.67,6.59 15.64,4 12,4 C9.11,4 6.6,5.64 5.35,8.04 C2.34,8.36 0,10.91 0,14 C0,17.31 2.69,20 6,20 L19,20 C21.76,20 24,17.76 24,15 C24,12.36 21.95,10.22 19.35,10.04 Z M14,13 L14,17 L10,17 L10,13 L7,13 L12,8 L17,13 L14,13 Z"></path></svg>
                                    <span>Upload Thumbnail</span>
                                </div>
                            </div>
                            <div class="upload__drag-txt">
                                <span>or Drag and Drop to upload image</span>
                                <i>
                                    <svg height="10px" viewBox="0 0 10.47 24"><path d="M20.07,27.85a2.14,2.14,0,0,1-1.36-.32,1.51,1.51,0,0,1-.39-1.2,6.5,6.5,0,0,1,.12-1c0.09-.45.18-0.86,0.28-1.22L20,19.63a7,7,0,0,0,.25-1.34c0-.48.07-0.82,0.07-1a2.93,2.93,0,0,0-1-2.28,4,4,0,0,0-2.76-.88,6.76,6.76,0,0,0-2.11.36c-0.74.24-1.52,0.53-2.34,0.86l-0.33,1.37,0.86-.29a3.59,3.59,0,0,1,1-.14,1.92,1.92,0,0,1,1.32.33,1.62,1.62,0,0,1,.35,1.19,5.68,5.68,0,0,1-.11,1.05c-0.07.37-.17,0.78-0.28,1.2L13.65,24.5c-0.11.47-.19,0.88-0.24,1.25a8.72,8.72,0,0,0-.07,1.09,2.88,2.88,0,0,0,1,2.26,4.06,4.06,0,0,0,2.81.9,6.11,6.11,0,0,0,2.06-.32c0.59-.21,1.38-0.51,2.38-0.9l0.33-1.37a5.8,5.8,0,0,1-.83.28A3.88,3.88,0,0,1,20.07,27.85ZM19.28,11.59a3,3,0,0,0,2.09-.82,2.62,2.62,0,0,0,.86-2,2.65,2.65,0,0,0-.86-2,3.09,3.09,0,0,0-4.18,0,2.66,2.66,0,0,0-.87,2,2.63,2.63,0,0,0,.87,2A3,3,0,0,0,19.28,11.59Z" transform="translate(-11.77 -6)"></path></svg>
                                </i>
                            </div>
                            <input type="file" class="upload__input" @change="uploadThumb($event)"/>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button class="btn btn-info" :disabled="models.temp_name === '' || models.data_json === ''" @click="save">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <loading
            :active.sync="isLoading"
        ></loading>
    </div>
</template>

<script src="./video-template-editor.js"></script>
<style lang="scss" scoped>
    .template-upload{
        .upload-section{
            position: relative;
            margin-bottom: 10px;
            padding: 20px 10px;
            background-color: #f1f1f1;
            text-align: center;
            border: 1px dashed transparent;
            .upload__image{
                display: inline-block;
                padding: 10px 20px;
                color: white;
                background-color: #8f97a8;
                border-radius: 3px;
                span{
                    font-size: 20px;
                    vertical-align: middle;
                }
                svg {
                    fill: white;
                }
            }
            .upload__drag-txt{
                span{
                    font-size: 15px;
                    color: var(--color-grey);
                }
                i{
                    display: inline-block;
                    background-color: #3a3f51;
                    padding: 3px 3px;
                    line-height: 0;
                    svg {
                        fill: white;
                    }
                }
            }
            .upload__input {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;
            }
            &:hover{
                border-color: #8f97a8;
            }
        }
    }
</style>
