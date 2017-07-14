//虚拟键盘的混合js
export default {
    props  : {
        length: {
            type   : Number,
            default: 6
        },
        value : {
            type: String
        },
        submit: {
            type: Function
        }
    },
    data(){
        return {
            items : [],
            inputs: []
        }
    },
    mounted(){
        this.inputs = (this.value || '').split('');
    },
    methods: {
        _close(char){
            return char == '确定' || this.inputs.length >= this.length;
        }
    },
    watch  : {
        value(val){
            this.inputs = (val || '').split('');
        },
        inputs(val){
            var items = [], i = 0, ii = this.length;
            for (; i < ii; i++) {
                items.push(val[i] == null ? '&nbsp;' : '●')
            }
            this.items = items, this.$emit('input', this.inputs.join(''))
        }
    }
}