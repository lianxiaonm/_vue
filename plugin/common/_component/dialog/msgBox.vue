<template>
    <pop v-model="showModal">
        <div class="popup">
            <div class="popup-head" v-if="title">
                <h3 class="popup-title">{{title}}</h3>
                <h5 class="popup-sub-title" v-if="subTitle">{{subTitle}}</h5>
            </div>
            <div class="popup-body">
                <slot>{{ content }}</slot>
            </div>
            <div class="popup-btns" v-if="btnList">
            <span class="btn"
                  v-for="(b, i) in btnList"
                  :class="b.type||'btn-default'"
                  @click="close(i)">{{b.text}}</span>
            </div>
        </div>
    </pop>
</template>
<script type="text/babel">
    import pop from '../container/pop.vue'
    import _modal from '../mixins/modal'
    export default {
        mixins : [_modal],
        props  : {
            title   : String,
            subTitle: String,
            content : {
                type   : String,
                default: ''
            },
            btnList : {
                type   : Array,
                default: []
            }
        },
        methods: {
            close(idx) {
                this.click && this.click(idx);
            }
        }
    }
</script>
