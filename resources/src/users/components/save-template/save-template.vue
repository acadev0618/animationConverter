<template>
    <div class="component-save-template">
        <div class="modal__backdrop" @click="$emit('cancel')"></div>
        <div class="modal__content">
            <h2 class="content__title">Save your design</h2>
            <div class="loading--container">
                <div class="content__body">
                    <div class="mb-2">
                        <input type="text" placeholder="Template Name" v-model="sets.temp_name" @input="templateNameInput"/>
                    </div>
                    <div class="mb-2">
                        <textarea type="text" placeholder="Template Description" v-model="sets.temp_description" @input="templateDescriptionInput" rows="2"></textarea>
                    </div>
                    <div class="row align-items-center mb-2">
                        <div class="col-md-3">
                            <label>Category:</label>
                        </div>
                        <div class="col-md">
                            <v-select :searchable="false" :clearable="false" :options="categories" class="app--select" v-model="sets.category" :reduce="option => option.value" label="label">
                            </v-select>
                        </div>
                    </div>
                    <div class="row align-items-center mb-2">
                        <div class="col-md-3">
                            <label>Design Type:</label>
                        </div>
                        <div class="col-md">
                            <v-select :searchable="false" :clearable="false" :options="designTypes" class="app--select" v-model="sets.design_type" :reduce="option => option.value" multiple label="label">
                            </v-select>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-3">
                            <label>Aspect:</label>
                        </div>
                        <div class="col-md">
                            <div>Detected As ({{sets.aspect}})</div>
                        </div>
                    </div>
                </div>
                <footer class="content__footer">
                    <div class="row justify-content-end">
                        <div class="col-auto pr-0">
                            <div class="btn cancel-btn" @click="$emit('cancel')">Cancel</div>
                        </div>
                        <div class="col-auto">
                            <div class="btn save-btn" @click="save">Save As {{sets.media_type === 'video' ? 'Video' : 'Image'}}</div>
                        </div>
                    </div>
                </footer>
                <loading
                    :active.sync="isLoading"
                ></loading>
            </div>
        </div>
    </div>
</template>

<script src="./save-template.js"></script>

<style lang="scss" scoped src="./save-template.scss"></style>
<style lang="scss">
    .v-select.app--select {
        background-color: rgba(223, 224, 230, 0.6);
        color: #2e3246;
        font-size: 12px;
        .vs__dropdown-toggle{
            padding: 1px 0px;
            border-radius: 1px;
            border: none;
            .vs__selected-options{
                .vs__selected{
                    margin-top: 0px;
                    font-size: 12px;
                    color: #2e3246;
                }
            }
            .vs__actions{
                .vs__open-indicator{
                    display: block;
                    width: 25px;
                    height: 25px;
                    position: relative;
                    &:before{
                        content: '';
                        display: block;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 5px solid #2e3246;
                        height: 0;
                        width: 0;
                        line-height: 28px;
                        margin-left: 8px;
                        margin-top: 10px;
                        position: absolute;
                        vertical-align: middle;
                    }
                }
            }
        }
        .vs__dropdown-menu {
            top: calc(100% + 5px);
            min-width: 0px;
            background-color: white;
            li{
                padding: 0px 10px;
                font-size: 12px;
                color: #2e3246;
                height: 28px;
                align-items: center;
                display: flex;
                span {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 28px;
                    background-repeat: no-repeat;
                    background-size: auto 14px;
                    background-position: 10px center;
                }
                &:hover{
                    background-color: rgba(223, 224, 230, 0.6);
                }
            }
        }
        &.vs--open{
            .vs__dropdown-toggle{
                .vs__selected{
                    position: relative;
                }
            }
        }
    }
</style>
