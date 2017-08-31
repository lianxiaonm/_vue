import Vue from 'vue'

import vPop from '../_components/container/pop.vue'
import vModal from '../_components/container/modal.vue'
import vLoad from '../_components/container/load.vue'

import { createElement, $body, sliceArgs, extend, isFunction } from '../services/common'

const components = [
    vPop,
    vModal,
    vLoad
]
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
})
export {
    vPop,
    vModal,
    vLoad
}
export const $modal = {
    _el       : null,
    delay     : 500,
    _component: null,   //组件单例化
    /*
     * component -- vue组件对象 -- 此组件对象mixins中modal.js
     * opts -- 组件支持的props
     */
    show(component, _opts, closefn){
        for (let prop in _opts) {
            if (_opts.hasOwnProperty(prop)) {
                component[prop] = prop == 'click' ?
                    this.hide.bind(this, _opts[prop]) :
                    _opts[prop];
            }
        }
        let _component = this._component;
        if (_component && _component._uid !== component._uid) {
            setTimeout(() => {
                _component.$destroy(), $body.remove(_component.$el);
                this._el = null, this._append(component, closefn);
            }, _component.showModal ? this.delay : 0);//清除容器
            _component.showModal = false;
        } else this._append(component, closefn);
    },
    /*
     * 私有方法 -- 不建议外部使用
     */
    _append(component, closefn){
        this._el || $body.append(this._el = createElement('div'));//建立容器
        this._component = component.$mount(this._el);
        component.$off();
        component.$on('update:showModal',
            function (msg) {
                msg || closefn && closefn();
            });
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
};

//单例化pop
export const $pop = extend({}, $modal, {delay: 300});

//单例load -- 用于toast 和loading
export const $load = extend({
    _timer: null
}, $modal, {
    _append(component){
        this._timer && clearTimeout(this._timer);
        this._el || $body.append(this._el = createElement('div'));//建立容器
        this._component = component.$mount(this._el);
        Vue.nextTick(() => this._component.showModal = true);
        this._timer = setTimeout(() => this.hide(this._component.callback), this._component.delay || 10000);
    },
    hide(callback){
        this._timer && clearTimeout(this._timer), this._timer = null;
        this._component && (this._component.showModal = false);
        callback && callback.apply(null, sliceArgs(arguments, 1))
    },
    delay: 300
});
