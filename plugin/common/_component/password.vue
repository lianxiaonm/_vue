<template>
    <ul class="simple-pwd" @click="keyboard()">
        <li v-for="item in items" v-html="item"></li>
    </ul>
</template>
<script type="text/babel">
    import '../less/simplePwd.less'
    import { $keyboard } from "../component/keyboard";
    export default {
        props: {
            length: {
                type: Number,
                default: 6
            },
            value: {
                type: String,
                default: ''
            }
        },
        created(){
            this.format(this.value || '');
        },
        watch: {
            value(val){
                this.format(val)
            }
        },
        methods: {
            format(val = ''){
                this.items = [];
                for (var i = 0; i < this.length; i++) {
                    this.items.push(i < val.length ? '●' : '&nbsp;')
                }
                this.$forceUpdate();
            },
            input(char){
                let value = this.value;
                if (char == 'back') {
                    this.value = [].slice.call(value, 0, -1).join('');
                } else if (char == '确定' || value.length >= this.length) {
                    $keyboard.hide();
                } else if (char != '*') {
                    this.value = value + '' + char;
                    this.value.length >= this.length && $keyboard.hide();
                }
            },
            keyboard(){
                $keyboard.simplePwd(true, char => this.input(char))
            }
        }
    }
</script>