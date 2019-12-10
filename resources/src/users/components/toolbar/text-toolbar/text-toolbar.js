import VueSelect from 'vue-select'
export default {
    name: "text-toolbar",
    data: function () {
        return {
            fontSelectActive: false,
            fontOptions: [
                {label: 'Open Sans', value: 'open sans', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Open Sans.svg?6.13.0")'}},
                {label: 'Poppins', value: 'Poppins', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Poppins.svg?6.13.0")'}},
                {label: 'Prata', value: 'Prata', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Prata.svg?6.13.0")'}},
                {label: 'Pridi', value: 'Pridi', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Pridi.svg?6.13.0")'}},
                {label: 'Princess Sofia', value: 'Princess Sofia', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Princess Sofia.svg?6.13.0")'}},
                {label: 'Prompt', value: 'Prompt', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Prompt.svg?6.13.0")'}},
                {label: 'Proza Libre', value: 'Proza Libre', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Proza Libre.svg?6.13.0")'}},
            ],
            font: {label: 'Open Sans', value: 'open sans', style: {backgroundImage: 'url("//cdn.bannersnack.com/svgs/fonts/google/Open Sans.svg?6.13.0");'}},
            fontWeightStyle: [
                { label: 'Light', style: {fontWeight: 'light', fontStyle: 'normal'} },
                { label: 'Light Italic', style: {fontWeight: 'light', fontStyle: 'italic'} },
                { label: 'Normal', style: {fontWeight: 'normal', fontStyle: 'normal'} },
                { label: 'Normal Italic', style: {fontWeight: 'normal', fontStyle: 'italic'} },
                { label: 'Bold', style: {fontWeight: 'bold', fontStyle: 'normal'} },
                { label: 'Bold Italic', style: {fontWeight: 'bold', fontStyle: 'italic'} },
            ],
            fWeightStyle: { label: 'Normal', style: {fontWeight: 'normal', fontStyle: 'normal'} },
            fontSize: 10,
            lineHeight: 12,
            letterSpacing: 0,
            textAlign: 'left',
            textTransform: '',
            underline: false,
        }
    },
    components: {
        VueSelect
    },
    methods: {
        styleChange(payload) {
            this.$emit('styleChange', payload);
        }
    }
}
