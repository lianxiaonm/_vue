<template>
    <div>
        <v-head :options="options"/>
        <v-scroll>
            <slot/>
        </v-scroll>
        <slot name="outer"/>
    </div>
</template>
<script type="text/babel">
    import vHead from './header/head.vue'
    import vScroll from './scroll/scroll.vue'
    import '../less/layout.less'
    export default {
        components: {
            vHead,
            vScroll
        },
        props     : {
            //head的配置
            options: {},
        }
    }
</script>
