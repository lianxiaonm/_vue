<template>
    <div class='input-group'>
        <slot/>
        <button ref="btnNode" v-html="btnText" @click="_submit"/>
    </div>
</template>
<script type="text/babel">
    import Vue from 'vue'
    import formMixins from '../mixins/form'
    import $log from '../../service/log'

    export default {
        mixins: [formMixins],
        props : {
            btnText: {
                default: '确定'
            },
            submit : {
                default: () => {}
            }
        },

        methods: {
            _submit(event) {
                event.stopPropagation();
                this.submit(Object.assign({}, this.vStore));
            }
        }
    }
</script>