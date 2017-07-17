<template>
    <load v-model="showModal">
        <div class="spinner">
            <svg v-if="!toast" class="spinner-circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none"/>
            </svg>
            <p :class="{'loading-txt':!toast}" v-if="text" v-html="text"/>
        </div>
    </load>
</template>
<script type="text/babel">
    import load from '../container/load.vue'
    import _modal from '../mixins/modal'
    export default {
        mixins: [_modal],
        props : {
            text : {
                type: String
            },
            toast: {
                default: false
            }
        }
    }
</script>