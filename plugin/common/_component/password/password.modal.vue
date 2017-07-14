<template>
    <modal v-model="showModal">
        <keyboard-simple :keys="keys" :others="others" :click="input">
            <ul class="simple-pwd">
                <li v-for="item in items" v-html="item"></li>
            </ul>
        </keyboard-simple>
    </modal>
</template>
<script type="text/babel">
    import _modal from '../mixins/modal'
    import passwordMixin from '../mixins/password';
    import keyboardSimple from '../keyboard/keyboard.simple.vue'
    export default {
        mixins    : [passwordMixin, _modal],
        components: {
            keyboardSimple
        },
        data(){
            return {
                items : [],
                inputs: [],
                keys  : [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '*'],
                others: ['back', '确定']
            }
        },
        watch     : {
            showModal(val){
                //false同步值到外部...true内收置空密码
                val ? this.inputs = [] : this.$emit('update:showModal', val);
            }
        },
        methods   : {
            input(isClose, char){
                if (char == 'back') {
                    this.inputs.splice(-1);
                } else if (!this._close(char) && char != '*') {
                    this.inputs.push(char);
                }
            },
            _close(char){
                return char == '确定' || this.inputs.length >= this.length;
            },
        }
    }
</script>