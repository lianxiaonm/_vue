<template>
    <div class="picker">
        <div class="picker-inner">
            <div class="picker-rule"/>
            <ul class="picker-list">
                <li v-for="p in pList">{{p.txt = null ? p : p.txt}}</li>
            </ul>
        </div>
    </div>
</template>
<script type="text/babel">
    import '../../less/picker.less'
    export default {
        props: {
            pList: {
                type: Array,
                default: []
            },
            value: {
                type: Number
            }
        },
        mounted(){
            var picker = this._picker = new $Picker(this.$el);
            picker.toggleEvent('change', () => {
                this.value = picker.getIdx();
            }), picker.setIdx(this.value || 0);
        },
        //更新后
        updated(){
            this._picker.reLayout()
        },
        //
        beforeDestroy(){
            this._picker.destroy();
        },
        watch: {
            value(val){
                this.$emit('input', val);
            }
        }
    }
</script>