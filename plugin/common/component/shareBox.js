import Vue from 'vue'
import shareBox from '../_component/shareBox.vue'
import { $modal } from './ionic-lite'

import { extend, sliceArgs, valueFn } from '../service/common'

shareBox.install = Vue => {
    Vue.component(shareBox.name, shareBox);
}
export default shareBox;

const shareBoxConstructor = Vue.extend(shareBox);

let shareBoxInstance, _opts;

export const $shareBox = {
    show(opts){
        if (!shareBoxInstance || shareBoxInstance._isDestroyed) {
            shareBoxInstance = new shareBoxConstructor();
        }
        $modal.show(shareBoxInstance, _opts);
    },
    hide: $modal.hide.bind($modal)
}

