<template>
    <modal v-model="showModal">
        <div class="share-box" :class="[ typeClass ]">
            <div class="share-banner"/>
            <p class="share-text">{{text || '壹钱包，为每一分钱创造价值'}}</p>
            <ul class="m-row share-icon">
                <li class="col-3"
                    v-for="item in items"
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
            },
            options: {
                wx_url: "微信分享跳转URL",
                wx_title: "微信分享标题",
                wx_desc: "微信分享内容",
                wx_icon: "",
                wx_pyq_url: "朋友圈分享跳转URL",
                wx_pyq_title: "朋友圈分享标题",
                wb_content: "微博分享内容（限140字）",
                wb_img: "",
                qzone_title: "QQ空间title",
                qzone_url: "QQ分享跳转链接",
                qzone_summary: "分享的摘要",
                qzone_img: "",
                redirect_url: "" //分享成功后跳转url
            }
        },
        data(){
            return {
                items: [
                    {
                        className: 'icon-friends', text: '朋友圈', url: ''
                    },
                    {
                        className: 'icon-weChat', text: '微信好友', url: ''
                    },
                    {
                        className: 'icon-weiBo', text: '新浪微博', url: ''
                    },
                    {
                        className: 'icon-qZone', text: 'QQ空间', url: ''
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