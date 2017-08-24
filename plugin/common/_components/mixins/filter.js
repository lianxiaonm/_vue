import { isFunction } from '../../services/common'
import vFilter from '../filter/filter.vue'

export const $watch = function (list, filterList, selectMap) {
    let len     = filterList.length,
        _select = selectMap[len] == null ? {} : selectMap[len],
        _item   = null, children;
    list.forEach(item => {
        if ((_select.code == null && item.select)
            || item.code === _select.code) {
            return _item = item, false;
        }
    });
    _item          = _item || list[0] || {};
    selectMap[len] = {code: _item.code, text: _item.text};
    children       = _item.children || [];
    filterList.push(list);
    return children.length ? $watch(children, filterList, selectMap) : filterList;
}

export default {
    components: {
        vFilter
    },
    props     : {
        filterMap: {
            default: []
        },
        change   : ''
    },
    data(){
        return {
            select: [],//选择的项
            list  : [] //数据
        }
    },
    computed  : {
        typeClass(){
            return this.list.length > 1 ? 'lf' : 'tp';
        }
    },
    methods   : {
        _commit(idx){
            this.$nextTick(() => {
                isFunction(this.change) && idx + 1 == this.list.length && this.change(this.select)
            })
        }
    },
    beforeMount(){
        this.list = $watch(this.filterMap, [], this.select)
    },
    watch     : {
        filterMap(val){
            this.list = $watch(val, [], this.select);
        },
        select(val){
            this.list = $watch(this.filterMap, [], val);
        }
    }
}