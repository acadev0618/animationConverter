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
                                <li class="nav-item">
                                    <a class="nav-link tab-title" :class="{active: tab === 'video_template'}" href="javascript:;" target="_self" @click="getVideoTemplate">Video Template</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link tab-title" :class="{active: tab === 'image_template'}" href="javascript:;" target="_self" @click="getImageTemplate">Image Template</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link tab-title" :class="{active: tab === 'text_effect'}" href="javascript:;" target="_self" @click="getTextEffect">Text Effect</a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-content" id="temp_tab_content">
                            <div class="video-template" v-if="tab === 'video_template'">
                                <v-client-table :data="videoTemplate.items" :columns="videoTemplate.columns" :options="videoTemplate.options" class="mt-2">
                                    <span slot="temp_name" slot-scope="props">
                                        <a :href="props.row.thumb_url" target="_blank" class="hover-link">
                                            <img :src="`${props.row.thumb_url}`" alt="" class="img-thumbnail img-fluid" style="width: 100px;"/>
                                            {{ props.row.temp_name }}
                                        </a>
                                    </span>
                                    <span slot="aspect" slot-scope="props">
                                        {{ props.row.aspect + ' (' + props.row.width + ' * ' + props.row.height + ')' }}
                                    </span>
                                    <span slot="duration" slot-scope="props">
                                        {{durationFormat(props.row.duration)}}
                                    </span>
                                    <span slot="action" slot-scope="props">
                                        <router-link :to="'/video-template-editor/' + props.row.id" class="fas fa-pen text-primary mr-2 pointer-cursor"></router-link>
                                        <a class="far fa-trash-alt text-danger pointer-cursor" @click="deleteTemplateConfirm(props.row.id)"></a>
                                    </span>
                                </v-client-table>
                                <div class="pull-right">
                                    <router-link to="/video-template-editor" class="btn btn-primary"><i class="fas fa-upload"></i> Upload new template</router-link>
                                </div>
                            </div>
                            <div class="video-template" v-if="tab === 'image_template'">
                                <v-client-table :data="imageTemplate.items" :columns="imageTemplate.columns" :options="imageTemplate.options" class="mt-2">
                                    <span slot="temp_name" slot-scope="props">
                                        <a :href="props.row.thumb_url" target="_blank" class="hover-link">
                                            <img :src="`${props.row.thumb_url}`" alt="" class="img-thumbnail img-fluid" style="width: 100px;"/>
                                            {{ props.row.temp_name }}
                                        </a>
                                    </span>
                                    <span slot="aspect" slot-scope="props">
                                        {{ props.row.aspect + ' (' + props.row.width + ' * ' + props.row.height + ')' }}
                                    </span>
                                    <span slot="action" slot-scope="props">
                                        <router-link :to="'/video-template-editor/' + props.row.id" class="fas fa-pen text-primary mr-2 pointer-cursor"></router-link>
                                        <a class="far fa-trash-alt text-danger pointer-cursor" @click="deleteTemplateConfirm(props.row.id)"></a>
                                    </span>
                                </v-client-table>
                                <div class="pull-right">
                                    <router-link to="/video-template-editor" class="btn btn-primary"><i class="fas fa-upload"></i> Upload new template</router-link>
                                </div>
                            </div>
                            <div class="video-template" v-if="tab === 'text_effect'">
                                <v-client-table :data="textEffect.items" :columns="textEffect.columns" :options="textEffect.options" class="mt-2">
                                    <div slot="preview" slot-scope="props">
                                        <lottie :options="lottieOption(props.row.json)" :height="70" :width="100"></lottie>
                                    </div>
                                    <span slot="action" slot-scope="props">
                                        <a class="far fa-trash-alt text-danger pointer-cursor" @click="deleteTextEffectConfirm(props.row.id)"></a>
                                    </span>
                                </v-client-table>
                                <div class="pull-right">
                                    <router-link to="/bodymovin-editor/0/text_effect" class="btn btn-primary"><i class="fas fa-upload"></i> Upload new template</router-link>
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

<script src="./template-list.js"></script>
