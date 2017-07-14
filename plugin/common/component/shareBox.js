import Vue from 'vue'
import shareBox from '../_component/shareBox.vue'
import { $modal } from './ionic-lite'

shareBox.install = Vue => {
    Vue.component(shareBox.name, shareBox);
}
export default shareBox;

const ShareBox = Vue.extend(shareBox);

let _shareBox;

export const $shareBox = {
    show(_opts){
        if (!_shareBox || _shareBox._isDestroyed) {
            _shareBox = new ShareBox();
        }
        $modal.show(_shareBox, _opts);
    },
    hide: $modal.hide.bind($modal)
}

