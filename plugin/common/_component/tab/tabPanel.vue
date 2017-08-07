<template>
    <v-scroll class="tab-panel" :class="{on:isActive}">
        <slot/>
    </v-scroll>
</template>
<script type="text/babel">
    import '../../less/tabs.less'
    import vScroll from '../scroll/scroll.vue'
    export default {
        components: {
            vScroll
        },
        props     : {
            label   : {
                default: '默认标题'
            },
            isActive: {
                default: false,
            }
        }
    }
</script>