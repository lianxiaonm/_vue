<template>
    <div class="loading-container"
         :class="{'active':show}">
        <slot/>
    </div>
</template>
<script type="text/babel">
    import '../../less/ionic.less'
    import container from '../mixins/container'
    export default {
        mixins: [container],
        props : {
            delay: {
                type   : Number,
                default: 5000
            }
        },
        mounted(){

        },
        watch : {

        }
    }
</script>