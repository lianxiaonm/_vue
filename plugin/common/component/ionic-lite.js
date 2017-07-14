import Vue from 'vue'

import pop from '../_component/container/pop.vue'
import modal from '../_component/container/modal.vue'

import { createElement, $body, sliceArgs, extend } from '../service/common'

const components = [
    modal,
    pop
]
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
})
export {
    modal,
    pop
}
export const $modal = {
    _el       : null,
    _component: null,   //组件单例化
    /*
     * component -- vue组件对象 -- 此组件对象mixins中modal.js
     * opts -- 组件支持的props
     */
    show(component, _opts){
        for (let prop in _opts) {
            if (_opts.hasOwnProperty(prop)) {
                component[prop] = prop == 'click' ? this.hide.bind(this, _opts[prop]) : _opts[prop];
            }
        }
        let _component = this._component;
        if (_component && _component._uid !== component._uid) {
            setTimeout(() => {
                _component.$destroy(), $body.remove(_component.$el);
                this._el = null, this._append(component);
            }, _component.showModal ? 500 : 0);//清除容器
            _component.showModal = false;
        } else this._append(component);
    },
    /*
     * 私有方法 -- 不建议外部使用
     */
    _append(component){
        this._el || $body.append(this._el = createElement('div'));//建立容器
        this._component = component.$mount(this._el);
        Vue.nextTick(() => this._component.showModal = true);
    },
    /*
     * callback 关闭modal的毁掉
     * args2 如果为true，则不关闭modal
     */
    hide(callback, args2){
        let noClose = args2 === true;
        noClose || this._component && (this._component.showModal = false);
        setTimeout(() => {
            callback && callback.apply(null, sliceArgs(arguments, noClose ? 2 : 1))
        }, noClose ? 0 : 300)
    }
}
//单例化pop
export const $pop   = extend({}, $modal);