<template>
    <modal v-model="showModal">
        <keyboard-simple v-if="type!='complex'"
                         :keys="keys"
                         :others="others"
                         :click="click"/>
        <keyboard-complex v-else :click="click"/>
    </modal>
</template>
<script type="text/babel">
    import keyboardSimple from './keyboard.simple.vue'
    import keyboardComplex from './keyboard.complex.vue'
    import _modal from '../mixins/modal'
    export default {
        mixins    : [_modal],
        components: {
            keyboardSimple,
            keyboardComplex
        },
        props     : {
            type  : {
                type   : String,
                default: 'simple'
            },
            //simple 配置
            keys  : {
                type   : Array,
                default: []
            },
            others: {
                type   : Array,
                default: []
            },
            //complex 配置
        }
    }
</script>