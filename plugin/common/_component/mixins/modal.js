/**
 * Created by h5 on 2017/7/7.
 */
import modal from '../container/modal.vue'
import pop from '../container/pop.vue'
import load from '../container/load.vue'

export default {
    components: {
        modal,
        pop,
        load
    },
    props     : {
        showModal: {
            default: false
        },
        click    : {
            type: Function
        }
    },
    watch     : {
        showModal(val){
            val || this.$emit('update:showModal', val);//false外发...
        }
    }
}