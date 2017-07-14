<template>
    <modal v-model="showModal">
        <simple v-if="[ getType ]"
                :keys="keys"
                :others="others"
                :click="click"/>
    </modal>
</template>
<script type="text/babel">
    import simple from './keyboard.simple.vue'
    import _modal from '../mixins/modal'
    export default {
        mixins    : [_modal],
        components: {
            simple
        },
        props     : {
            type  : 'simple',
            //simple 配置
            keys  : [],
            others: [],
            //complex 配置
        },
        computed  : {
            getType(){
                return this.type != 'complex';
            }
        }
    }
</script>