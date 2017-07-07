import Vue from 'vue'
import keyboard from '../_component/keyboard.vue'
import { $modal } from './ionic-lite'

keyboard.install = Vue => {
    Vue.component(keyboard.name, keyboard);
}
export default keyboard;

const keyBoardConstructor = Vue.extend(keyboard);

let idCardKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0],
    numberKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0],
    simplePwdKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0],
    keyboardInstance;
export const $keyboard = {
    show(_opts){
        //组件不存在或者组件被销毁
        if (!keyboardInstance || keyboardInstance._isDestroyed) {
            keyboardInstance = new keyBoardConstructor();
        }
        $modal.show(keyboardInstance, _opts);
    },
    hide: $modal.hide.bind($modal),
    number: function (isNine, callback) {
        this.show({
            keys: numberKey.concat(isNine ? 'back' : 'hide'),
            others: isNine ? [] : ['back', '确定'],
            click: callback
        });
    },
    idCard: function (isNine, callback) {
        this.show({
            keys: idCardKey.concat(isNine ? 'back' : 'hide'),
            others: isNine ? [] : ['back', '确定'],
            click: callback
        });
    },
    simplePwd: function (isNine, callback) {
        this.show({
            keys: simplePwdKey.concat(isNine ? 'back' : 'hide'),
            others: isNine ? [] : ['back', '确定'],
            click: callback
        });
    }
}