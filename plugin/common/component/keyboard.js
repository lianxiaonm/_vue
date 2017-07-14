import Vue from 'vue'
import keyboardModal from '../_component/keyboard/keyboard.modal.vue'
import keyboardSimple from '../_component/keyboard/keyboard.simple.vue'
import keyboardComplex from '../_component/keyboard/keyboard.complex.vue'
import { $modal } from './ionic-lite'
import { extend, noop } from '../service/common'

const components = [
    keyboardSimple,
    keyboardComplex,
    keyboardModal
]
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});

export default keyboardSimple;

export {
    keyboardSimple,
    keyboardComplex,
    keyboardModal
}

const ModalKeyboard = Vue.extend(keyboardModal);

let number   = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0],
    idCard   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0],
    password = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0];

let _keyboard;

export const $keyboard = {
    show(_opts){
        //组件不存在或者组件被销毁
        if (!_keyboard || _keyboard._isDestroyed) {
            _keyboard = new ModalKeyboard();
        }
        let click = _opts.click || noop;
        $modal.show(_keyboard, extend(_opts, {
            click: char => {
                char == 'hide' ? this.hide() : click(char);
            }
        }));
    },
    hide    : $modal.hide.bind($modal),
    number  : function (isNine, callback) {
        this.show({
            type  : 'simple',
            keys  : number.concat(isNine ? 'back' : 'hide'),
            others: isNine ? [] : ['back', '确定'],
            click : callback
        });
    },
    idCard  : function (isNine, callback) {
        this.show({
            type  : 'simple',
            keys  : idCard.concat(isNine ? 'back' : 'hide'),
            others: isNine ? [] : ['back', '确定'],
            click : callback
        });
    },
    password: function (isNine, callback) {
        this.show({
            type  : 'simple',
            keys  : password.concat(isNine ? 'back' : 'hide'),
            others: isNine ? [] : ['back', '确定'],
            click : callback
        });
    },
    complex : function (isNine, callback) {
        this.show({
            type : 'complex',
            click: callback
        });
    }
}