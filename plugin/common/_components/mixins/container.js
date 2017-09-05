//
import { $backdrop } from '../../services/common'

export default {
    props  : {
        value: {
            default: false
        }
    },
    data(){
        if (this.value)
            this._timer = setTimeout(() => this._show(), 16.7);
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
            this._timer && clearTimeout(this._timer);
            this._timer = setTimeout(() => this[val ? '_show' : '_hide'](), 16.7)
        },
        show(val){
            $backdrop[val ? 'retain' : 'release']();
            this.$emit('input', !!val)
        }
    }
}