<template>
    <div class="picker">
        <div class="picker-inner">
            <div class="picker-rule"/>
            <ul class="picker-list">
                <li v-for="p in pList" v-html="p.txt = null ? p : p.txt"/>
            </ul>
        </div>
    </div>
</template>
<script type="text/babel">
    import '../../less/picker.less'
    export default {
        props  : {
            pList: {
                default: []
            },
            value: ''
        },
        mounted(){
            let picker = this._picker = new $Picker(this.$el);
            picker.toggleEvent('change', () => {
//                let value = this._idx(picker.getIdx(), true);
//                value != this.value && this.$emit('input', value);
            });
            picker.setIdx(this._idx(this.value, false));
        },
        updated(){
            this._picker.reLayout(this._idx(this.value, false));
        },
        beforeDestroy(){
            this._picker.destroy();
        },
        methods: {
            _idx(value, isIdxOf){
                let _val = isIdxOf ? {} : 0;
                this.pList.forEach((obj, i) => {
                    return isIdxOf ? i == value ? (_val = obj.val, false) : true :
                        obj.val == value ? (_val = i, false) : true;
                });
                return _val;
            }
        }
    }
</script>