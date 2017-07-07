/**
 * Created by h5 on 2017/7/7.
 */
import modal from '../container/modal.vue'
import pop from '../container/pop.vue'

import { $modal, $pop } from '../../component/ionic-lite'
export default {
    components: {
        modal,
        pop
    },
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        click: {
            type: Function
        }
    },
    watch: {
        showModal(val){
            if (!val) {
                let classList = this.$el.classList;
                if (classList.contains('popup-container')) $pop.hide()
                else if (classList.contains('model-container')) $modal.hide()
            }
        }
    }
}