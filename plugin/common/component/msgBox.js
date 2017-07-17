import Vue from 'vue'
import msgBox from '../_component/dialog/msgBox.vue'
import loading from '../_component/dialog/loading.vue'
import { $pop, $load } from './ionic-lite'
import { valueFn } from '../service/common'

const components = [
    msgBox,
    loading
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});

export default msgBox
export {
    msgBox,
    loading
}

const MsgBox  = Vue.extend(msgBox),
      Loading = Vue.extend(loading);

let _msgBox, _loading;
export const $dialog = {
    _pop(_opts){
        if (!_msgBox || _msgBox._isDestroyed) {
            _msgBox = new MsgBox();
        }
        $pop.show(_msgBox, _opts);
    },
    alert(opts = {}){
        this._pop({
            title    : opts.title,
            content  : opts.content,
            btnList  : [{
                text: opts.okText || '确定',
                type: opts.okType || 'btn-positive'
            }], click: opts.click || valueFn(true)
        })
    },
    confirm(opts = {}){
        this._pop({
            title  : opts.title,
            content: opts.content,
            btnList: [{
                text: opts.cancelText || '关闭',
                type: opts.cancelType || 'btn-default'
            }, {
                text: opts.okText || '确定',
                type: opts.okType || 'btn-positive'
            }],
            click  : opts.click || valueFn(true)
        })
    },
    _load(_opts){
        if (!_loading || _loading._isDestroyed) {
            _loading = new Loading();
        }
        $load.show(_loading, _opts)
    },
    spinner(text, delay){
        this._load({
            text : text,
            toast: false,
            delay: delay
        })
    },
    closeSpinner: $load.hide.bind($load),
    toast(text, delay, callback){
        if (typeof delay == 'function') {
            callback = delay, delay = 3500;
        }
        this._load({
            text    : text,
            toast   : true,
            delay   : delay || 3500,
            callback: callback
        })
    }
}

