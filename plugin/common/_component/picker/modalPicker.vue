<template>
    <modal v-model="showModal">
        <div class="pop-picker">
            <div class="pop-picker-header">
                <span class="btn btn-default" @click="_click(false)">取消</span>
                <span class="btn btn-positive" @click="_click(true)">确定</span>
            </div>
            <date-picker v-if="type=='date'" :options="options" ref="_picker"/>
            <linkage-picker v-else :pk-list="options" :select="select" ref="_picker"/>
        </div>
    </modal>
</template>
<script type="text/babel">
    import _modal from '../mixins/modal'
    import datePicker from './datePicker.vue'
    import linkagePicker from './linkagePicker.vue'
    export default {
        mixins: [_modal],
        components: {
            datePicker,
            linkagePicker
        },
        props: {
            type: {
                type: String,
            },
            options: {
                type: Object,
                default: {}
            },
            select: {
                type: Array,
                default: []
            }
        },
        methods: {
            _click(ret){
                this.showModal = false;
                ret && this.click(this.$refs._picker.getValue());
            }
        }
    }
</script>