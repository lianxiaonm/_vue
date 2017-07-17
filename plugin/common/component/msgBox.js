import Vue from 'vue'
import msgBox from '../_component/dialog/msgBox.vue'
import loading from '../_component/dialog/loading.vue'
import actionSheet from '../_component/dialog/actionSheet.vue'
import { $pop, $load, $modal } from './ionic-lite'
import { valueFn } from '../service/common'

const components = [
    msgBox,
    loading,
    actionSheet
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});

export default msgBox
export {
    msgBox,
    loading,
    actionSheet
}

const MsgBox      = Vue.extend(msgBox),
      Loading     = Vue.extend(loading),
      ActionSheet = Vue.extend(actionSheet);

let _msgBox, _loading, _actionSheet;
export const $dialog = {
    actionSheet(btnList, callback){
        if (!_actionSheet || _actionSheet._isDestroyed) {
            _actionSheet = new ActionSheet();
        }
        $modal.show(_actionSheet, {btnList: btnList, click: callback});
    },
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
            text    : text,
            toast   : false,
            delay   : delay,
            callback: null
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

