<template>
    <ul class="simple-pwd" @tap="click">
        <li v-for="item in items" v-html="item"></li>
    </ul>
</template>
<script type="text/babel">
    import '../../less/simplePwd.less'
    import passwordMixin from '../mixins/password';
    import keyboardMixin from '../mixins/keyboard';
    import { $keyboard } from "../../components/keyboard";
    export default {
        mixins : [passwordMixin, keyboardMixin],
        props  : {
            length: {
                default: 6
            },
            click : {}
        },
        data(){
            return {
                items: []
            }
        },
        mounted(){
            this._mask(this.value);
        },
        watch  : {
            value(val = ''){
                this._mask(val);
                this.$emit('input', val);
            }
        },
        methods: {
            _mask(val){
                let inputs    = (val || '').split(''),
                    i = 0, ii = this.length,
                    items     = [];
                for (; i < ii; i++) {
                    items.push(inputs[i] == null ? '&nbsp;' : '●')
                }
                this.items = items;
            }
        }
    }
</script>