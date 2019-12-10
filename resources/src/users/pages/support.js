import Vue from 'vue';

new Vue({
    el: '#support-panel',
    name: 'support-panel',
    data: () => ({
        models: {
            email: '',
            attache_file: ''
        }
    }),
    methods: {
        clickClip() {
            $('#attached_file').trigger('click');
        },
        changedFile(event) {
            const file = event.target.files[0];
            if (file) {
                this.models.attache_file = file.name;
            } else {
                this.models.attache_file = '';
            }
        }
    }
});
