import AppHelper from "../../../app-helper";
import {ClientTable} from 'vue-tables-2';
import _ from "lodash";

Vue.use(ClientTable);

export default {
    name: "slide-list",
    components: {
    },
    data: function() {
        let options = this.$store.state.table_options;
        options.headings = {
            temp_name: 'Template Name',
            thumb_url: 'Thumb Name',
            duration: 'Duration',
            aspect: 'Aspect',
            design_type: 'Design Type',
            category: 'Category',
            preview: 'Preview',
            action: 'Action'
        };
        options.sortable = ['name', 'aspect'];
        options.filterable = ['name', 'aspect'];

        return {
            title: 'Template',
            loaded: false,
            items: [],
            columns: ['temp_name', 'duration', 'aspect', 'design_type', 'category', 'action'],
            options: options,
        }
    },
    beforeDestroy() {
    },
    created() {
    },
    mounted() {
        this.getSlides()

    },
    methods: {
        getSlides() {
            if (!this.loaded) {
                let loader = this.$loading.show();
                Vue.axios.post('/common/slide/get-many', {where: {}}).then(res => {
                    this.items = res.data;
                    this.loaded = true;
                    loader.hide();
                });
            }
        },
        deleteConfirm(id) {
            this.$dialog
                .confirm('Are you sure you want to delete this?')
                .then((dialog) => {
                    this.deleteSlide(id);
                })
                .catch(function() {
                });
        },
        deleteSlide(id) {
            Vue.axios.post('/common/slide/delete', {where: {id: id}}).then(res => {
                this.items = this.items.filter(item => item.id !== id);
            });
        },
        durationFormat(ms) {
            return AppHelper.msToHMS(ms);
        },
    }
}
