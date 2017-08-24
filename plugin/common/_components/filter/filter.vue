<template>
    <v-scroll>
        <ul class="filter-ul">
            <li v-for="item in list"
                @tap="_click(item)"
                v-html="item.text"
                :class="{active:activeClass(item)}"
                :key="item.code"/>
        </ul>
    </v-scroll>
</template>
<script type="text/babel">
    import '../../less/filter.less'
    import vScroll from '../scroll/scroll.vue'
    export default {
        components: {
            vScroll
        },
        props     : {
            list  : {
                default: []
            },
            value : '',
            change: ''
        },
        methods   : {
            _click(item){
                this.$emit('input', item);
                typeof this.change == 'function' && this.change();
            },
            activeClass(item){
                return this.value && this.value.code == item.code;
            }
        }
    }
</script>