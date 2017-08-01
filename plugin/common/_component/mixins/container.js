//
import { $backdrop } from '../../service/common'

export default {
    props  : {
        value: {
            default: false
        }
    },
    data(){
        this.value && setTimeout(() => this._show(), 16.7);
        return {
            show: false
        }
    },
    methods: {
        _show(){
            this.show = true;
        },
        _hide(){
            this.show = false;
        }
    },
    beforeDestroy(){
        this.show && $backdrop.release();
    },
    watch  : {
        value(val){
            setTimeout(() => this[val ? '_show' : '_hide'](), 16.7)
        },
        show(val){
            $backdrop[val ? 'retain' : 'release']();
            this.$emit('input', !!val)
        }
    }
}