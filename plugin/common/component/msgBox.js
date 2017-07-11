import Vue from 'vue'
import msgBox from '../_component/msgBox.vue'
import { $pop } from './ionic-lite'
import { valueFn } from '../service/common'

msgBox.install = Vue => {
    Vue.component(msgBox.name, msgBox);
}
export default msgBox;

const msgBoxConstructor = Vue.extend(msgBox);

let msgInstance;
export const $msgBox = {
    show(_opts){
        if (!msgInstance || msgInstance._isDestroyed) {
            msgInstance = new msgBoxConstructor();
        }
        $pop.show(msgInstance, _opts);
    },
    alert(opts = {}){
        this.show({
            title: opts.title,
            content: opts.content,
            btnList: [{
                text: opts.okText || '确定',
                type: opts.okType || 'btn-positive'
            }], click: opts.click || valueFn(true)
        })
    },
    confirm(opts = {}){
        this.show({
            title: opts.title,
            content: opts.content,
            btnList: [{
                text: opts.cancelText || '关闭',
                type: opts.cancelType || 'btn-default'
            }, {
                text: opts.okText || '确定',
                type: opts.okType || 'btn-positive'
            }],
            click: opts.click || valueFn(true)
        })
    }
}
