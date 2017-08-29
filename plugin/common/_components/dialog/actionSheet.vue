<template>
    <v-modal v-model="showModal">
        <div class="action-sheet">
            <ul class="item-view">
                <li class="item-list"
                    v-for="(btn,idx) in btnList"
                    :key="idx"
                    @tap="_click(idx)"
                    v-html="btn.txt == null ? btn : btn.txt"/>
            </ul>
            <ul class="item-view">
                <li class="item-list cancel" @tap="_click(false)">取消</li>
            </ul>
        </div>
    </v-modal>
</template>
<script type="text/babel">
    import _modal from '../mixins/modal'
    export default {
        mixins : [_modal],
        props  : {
            btnList: {
                default: []
            }
        },
        methods: {
            _click(item){
                switch (item) {
                    case false:
                        return this.showModal = false;
                    default:
                        this.click && this.click(item);
                }
            }
        }
    }
</script>
