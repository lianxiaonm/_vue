<template>
    <v-modal v-model="showModal" :class="[ typeClass ]" class="filter-modal">
        <div class="filter-body" :class="[ typeClass ]">
            <v-scroll v-for="(filter,idx) in list" key="idx">
                <ul class="item-ul">
                    <li v-for="item in filter"
                        @click="_click(idx,item.code)"
                        :class="{active:codes[idx]==item.code}"
                        v-html="item.text" key="item.code"/>
                </ul>
            </v-scroll>
        </div>
    </v-modal>
</template>
<script type="text/babel">
    import '../../less/filter.less'
    import vScroll from '../scroll/scroll.vue'
    import _modal from '../mixins/modal'
    import { isArray, isFunction } from '../../service/common'
    export default {
        mixins    : [_modal],
        components: {
            vScroll
        },
        props     : {
            filterMap: {
                default: []
            },
            change   : {
                default: () => {}
            }
        },
        data(){
            return {
                codes: [],
                list : []
            }
        },
        beforeMount(){
            this.list = $watch(this.filterMap, [], this.codes)
        },
        computed  : {
            typeClass(){
                return this.list.length > 1 ? 'lf' : 'tp';
            }
        },
        methods   : {
            _click(len, code){
                if (this.codes[len] === code) return;
                this.codes = this.codes.map(function (_code, idx) {
                    return idx < len ? _code : idx == len ? code : null;
                });
                this.list  = $watch(this.filterMap, [], this.codes);
                if (len + 1 == this.list.length && isFunction(this.change))
                    this.change(this.codes)
            }
        },
        watch     : {
            filterMap(val){
                this.list = $watch(val, [], this.codes);
            }
        }
    }

    function $watch(list, filterList, codes) {
        var len   = filterList.length,
            code  = codes[len] == null ? null : codes[len],
            _item = null, children;
        list.forEach(function (item, idx) {
            if ((code == null && item.select) || item.code === code) {
                return _item = item, false;
            }
        });
        _item      = _item || list[0] || {};
        codes[len] = _item.code;
        children   = _item.children;
        filterList.push(list);
        return isArray(children) && children.length ?
            $watch(children, filterList, codes) : filterList;
    }
</script>