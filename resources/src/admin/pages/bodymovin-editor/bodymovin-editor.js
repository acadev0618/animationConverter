import vue from "vue";
import AppHelper from './../../../app-helper';

export default {
    name: "bodymovin-editor",
    data: function () {
        return {
            sets: {
                json: '',
                type: 'text_effect'
            },
            types: [
                { label: 'Text Effect', value: 'text_effect' },
            ],
            id: false,
        }
    },
    methods: {
        preload(id) {
            let loader = this.$loading.show();
            vue.axios.post('/common/bodymovin/get', {where: {id: id}}).then(res => {
                let data = res.data;
                delete data.id;
                Object.assign(this.sets, data);
                this.$loading.hide();
            });
        },
        onJsonInput() {
            try {
                let json = JSON.parse( this.sets.json );
                if (json) {
                    let size = AppHelper.getLottieSizeByMax(json,1200);
                    this.sets.width = size.width;
                    this.sets.height = size.height;
                }
            } catch (e) {
            }
        },
        insert() {
            vue.axios.post('/common/bodymovin/insert', {sets: this.sets}).then(res => {
                this.$router.push({path: '/template-manage/text_effect'});
            });
        },
        update() {

        },
        save() {
            if (this.id) {
                this.update();
            } else {
                this.insert();
            }
        }
    },
    mounted() {
        let id = this.$route.params.id || false;
        id = parseInt(id);
        if (id) {
            this.id = id;
            this.preload(id);
        }
    },
}
