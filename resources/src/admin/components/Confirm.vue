<template>
    <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" :aria-labelledby="labelledBy" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="labelledBy">{{ modalLabel }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h1 class="text-center w-100 h1">{{ confirmString }}</h1>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-warning" data-dismiss="modal">Cancel</button>
                    <button type="button" :class="okBtnClass" @click="okSure">{{ okString }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: {
            modalId: {
                type: String,
                required: true
            },
            labelledBy: String,
            modalLabel: String,
            okMethod: String,
            okString: String,
            confirmString: String,
            okBtnClass: String,
            okMethodParam: {
                type: Object,
                default: {data: ''}
            }
        },
        methods: {
            okSure() {
                if (this.okMethodParam.data !== '') {
                    window.vEvent.fire(this.okMethod, this.okMethodParam.data);
                } else {
                    window.vEvent.fire(this.okMethod);
                }
            }
        }
    }
</script>
