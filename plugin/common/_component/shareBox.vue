<template>
    <modal v-model="showModal">
        <div class="share-box" :class="[ typeClass ]">
            <div class="share-banner"></div>
            <p class="share-text">{{text || '壹钱包，为每一分钱创造价值'}}</p>
            <ul class="m-row share-icon">
                <li v-for="item in items" class="col-3"
                    :class="item.className"
                    @click="_click(item)">{{item.text}}</li>
            </ul>
            <button @click="_click(false)">取消</button>
        </div>
    </modal>
</template>
<script type="text/babel">
    import '../less/shareBox.less'
    import _modal from './mixins/modal'
    export default {
        mixins: [_modal],
        props: {
            screen: {
                type: String
            },
            text: {
                type: String
            }
        },
        data(){
            return {
                items: [
                    {
                        className: 'icon-friends', text: '朋友圈',
                    },
                    {
                        className: 'icon-weChat', text: '微信好友',
                    },
                    {
                        className: 'icon-weiBo', text: '新浪微博',
                    },
                    {
                        className: 'icon-qZone', text: 'QQ空间',
                    }
                ]
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
        },
        computed: {
            typeClass(){
                return this.screen || ''
            }
        }
    }
</script>