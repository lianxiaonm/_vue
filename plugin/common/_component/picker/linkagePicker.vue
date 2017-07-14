<template>
    <div class="picker-body">
        <picker v-for="(p,idx) in pMap"
                :p-list="p"
                v-model="select[idx]"
                :key="idx"/>
    </div>
</template>
<script type="text/babel">
    import picker from './picker.vue'
    import { extend, isArray } from '../../service/common'
    export default {
        components: {
            picker
        },
        props: {
            pkList: {
                type: Array, default: []
            },
            select: {
                type: Array, default: []
            }
        },
        data(){
            return {
                pMap: createLinkPicker(this.pkList, [], this.select)
            }
        },
        methods: {
            getValue(){
                let value = [],
                    select = this.select;
                this.pMap.forEach((p, i) => {
                    value.push(p[select[i]]);
                })
                return value;
            }
        },
        beforeUpdate(){
            console.log('beforeUpdate')
        },
        watch: {
            select(val){
                this.pMap = createLinkPicker(this.pkList, [], val);
            },
            pkList(val){
                this.pMap = createLinkPicker(val, [], this.select);
            }
        }
    }

    function createLinkPicker(list, pickerMap, select) {
        let len = pickerMap.length,
            _select = select[len] || (select[len] = 0),
            children = (list[_select] || {}).children;
        pickerMap.push(list.map(n => { return {txt: n.txt, val: n.val} }));
        return isArray(children) ? createLinkPicker(children, pickerMap, select) : pickerMap;
    }

</script>