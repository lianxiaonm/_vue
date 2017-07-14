<template>
    <ul class="simple-pwd" @click="keyboard()">
        <li v-for="item in items" v-html="item"></li>
    </ul>
</template>
<script type="text/babel">
    import '../../less/simplePwd.less'
    import passwordMixin from '../mixins/password.mixins.js';
    import { $keyboard } from "../../component/keyboard";
    export default {
        mixins : [passwordMixin],
        methods: {
            input(char){
                if (char == 'back') {
                    this.inputs.splice(-1);
                } else if (this._close(char)) {
                    return $keyboard.hide();
                } else if (char != '*') {
                    this.inputs.push(char);
                    this._close(char) && $keyboard.hide();
                }
            },
            _close(char){
                return char == '确定' || this.inputs.length >= this.length;
            },
            keyboard(){
                $keyboard.password(true, char => this.input(char))
            }
        }
    }
</script>