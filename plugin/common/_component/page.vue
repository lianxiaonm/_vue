<template>
    <div>
        <v-head :options="options"/>
        <scroll><slot/></scroll>
        <slot name="outer"/>
    </div>
</template>
<script type="text/babel">
    import head from './header/head.vue'
    import scroll from './scroll/scroll.vue'
    import '../less/layout.less'
    export default {
        components: {
            vHead: head,
            scroll
        },
        props     : {
            //head的配置
            options: {},
        }
    }
</script>