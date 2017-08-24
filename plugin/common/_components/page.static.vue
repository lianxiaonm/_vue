<template>
    <div>
        <v-head :options="options"/>
        <div class="static-wrapper">
            <slot/>
        </div>
        <slot name="outer"/>
    </div>
</template>
<script type="text/babel">
    import vHead from './header/head.vue'
    import '../less/layout.less'
    export default {
        components: {
            vHead
        },
        props     : {
            //head的配置
            options: {},
        }
    }
</script>
