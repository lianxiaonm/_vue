<template>
    <div>
        <v-head :options="options"/>
        <scroll>
            <slot/>
        </scroll>
    </div>
</template>
<script type="text/babel">
    import head from './header/head.vue'
    import scroll from './scroll/scroll.vue'
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