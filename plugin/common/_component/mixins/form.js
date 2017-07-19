import { isFunction, trim, valueFn } from '../../service/common'
import $log from '../../service/log'

export const isEmpty = (label, value) => {
    let isEmpty = !!trim(value || '').length;
    return {flag: isEmpty, message: isEmpty ? '' : label + '不能为空'}
};
//用户form组件的混合...
export default {
    mounted(){
        this.structure(true);
    },
    beforeUpdate(){
        this.structure(true)
    },
    methods: {
        structure(isInit){
            isInit && (this.vStore = {}, this.vMap = {});
            let self   = this,
                slots  = self.$slots.default || [],
                vStore = self.vStore;
            slots.forEach(({componentOptions}) => {
                if (componentOptions.tag != "Input") return;
                let props = componentOptions.propsData,
                    name  = props.name,
                    label = props.label || '',
                    vdFn  = props.validate;
                !isFunction(vdFn) ? vdFn = props.require ?
                    isEmpty.bind(null, label) : valueFn({flag: true}) : '';
                if (isInit) {
                    if (!name) return $log.error('input must have [name] attribute');
                    props.validate    = self.validate.bind(this, vdFn, name);
                    self.vStore[name] = props.value || '';
                    self.vMap[name]   = !!vdFn(props.value || '').flag;
                } else props.value = vStore[name];
            });
            this.vMapEach(true);
        },
        validate(vdFn, key, val) {
            let error        = vdFn(val);
            this.vStore[key] = val;
            this.vMap[key]   = error.flag;
            return this.vMapEach(), error;
        },
        vMapEach(isInit) {
            let self = this, invalid = null, vMap = self.vMap;
            for (let name in vMap) {
                if (invalid === false) break;
                invalid = vMap[name];
            }
            if (self.vInvalid === invalid) return;
            self.vInvalid = invalid;
            if (isInit) this.$refs.btnNode.disabled = !invalid;
            else this.$refs.btnNode.disabled = !invalid;
        }
    }
}