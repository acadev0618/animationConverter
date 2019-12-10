<template>
    <div class="page-slide-list">
        <div class="col-lg-12 mb-3">
            <div class="card bg-primary-card">
                <h4 class="card-header">
                    <div><i class="fas fa-film"></i> Slide List</div>
                </h4>
                <div class="card-body">
                    <v-client-table :data="items" :columns="columns" :options="options" class="mt-2">
                                    <span slot="temp_name" slot-scope="props">
                                        <a :href="props.row.thumb_url" target="_blank" class="hover-link">
                                            <img :src="`${props.row.thumb_url}`" alt="" class="img-thumbnail img-fluid" style="width: 100px;"/>
                                            {{ props.row.name }}
                                        </a>
                                    </span>
                        <span slot="aspect" slot-scope="props">
                                        {{ props.row.aspect + ' (' + props.row.width + ' * ' + props.row.height + ')' }}
                                    </span>
                        <span slot="duration" slot-scope="props">
                                        {{durationFormat(props.row.duration)}}
                                    </span>
                        <span slot="action" slot-scope="props">
                                        <router-link :to="'/slide-editor/' + props.row.id" class="fas fa-pen text-primary mr-2 pointer-cursor"></router-link>
                                        <a class="far fa-trash-alt text-danger pointer-cursor" @click="deleteConfirm(props.row.id)"></a>
                                    </span>
                    </v-client-table>
                    <div class="pull-right">
                        <router-link to="/slide-editor" class="btn btn-primary"><i class="fas fa-upload"></i> Upload new slide</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./slide-list.js"></script>

<style scoped></style>
