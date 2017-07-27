<template>
    <v-pop v-model="showModal">
        <div class="popup">
            <div class="popup-head" v-if="title">
                <h3 class="popup-title" v-html="title"/>
                <h5 class="popup-sub-title" v-if="subTitle" v-html="subTitle"/>
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
    </v-pop>
</template>
<script type="text/babel">
    import _modal from '../mixins/modal'
    export default {
        mixins : [_modal],
        props  : {
            title   : {
                type: String
            },
            subTitle: {
                type: String
            },
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
