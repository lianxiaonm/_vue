<template>
    <v-modal v-model="showModal">
        <v-keyboard-simple v-if="type!='complex'"
                           :keys="keys"
                           :others="others"
                           :click="click"/>
        <v-keyboard-complex v-else :click="click"/>
    </v-modal>
</template>
<script type="text/babel">
    import vKeyboardSimple from './keyboard.simple.vue'
    import vKeyboardComplex from './keyboard.complex.vue'
    import _modal from '../mixins/modal'
    export default {
        mixins    : [_modal],
        components: {
            vKeyboardSimple,
            vKeyboardComplex
        },
        props     : {
            type  : {
                default: 'simple'
            },
            //simple 配置
            keys  : {
                default: []
            },
            others: {
                default: []
            },
            //complex 配置
        }
    }
</script>