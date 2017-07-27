<template>
    <v-modal v-model="showModal">
        <div class="share-box" :class="screen">
            <div class="share-banner"/>
            <p class="share-text" v-html="text || '默认的分享title'"/>
            <ul class="m-row share-icon">
                <li class="col-3"
                    v-for="item in items"
                    :class="item.className"
                    @click="_click(item)">{{item.text}}
                </li>
            </ul>
        </div>
    </v-modal>
</template>
<script type="text/babel">
    import '../../less/shareBox.less'
    import _modal from '../mixins/modal'
    import { extend, buildUrl } from '../../service/common'
    export default {
        mixins : [_modal],
        props  : {
            screen : {
                type: String
            },
            text   : {},
            options: {}
        },
        data(){
            this._options = this.merge(this.options);
            let baseUrl   = 'ewap://share.com/share';
            return {
                items: [
                    {
                        className: 'icon-friends', text: '朋友圈', url: () => {
                        let options = this._options;
                        return buildUrl(baseUrl, {
                            to          : 0,
                            wx_url      : options.wx_pyq_url,
                            wx_title    : options.wx_pyq_title,
                            wx_desc     : options.wx_desc,
                            wx_icon     : options.wx_icon,
                            redirect_url: options.redirect_url
                        })
                    }
                    },
                    {
                        className: 'icon-weChat', text: '微信好友', url: () => {
                        let options = this._options;
                        return buildUrl(baseUrl, {
                            to          : 1,
                            wx_url      : options.wx_url,
                            wx_title    : options.wx_title,
                            wx_desc     : options.wx_desc,
                            wx_icon     : options.wx_icon,
                            redirect_url: options.redirect_url
                        })
                    }
                    },
                    {
                        className: 'icon-weiBo', text: '新浪微博', url: () => {
                        let options = this._options;
                        return buildUrl(baseUrl, {
                            to          : 2,
                            wb_content  : options.wb_content,
                            wb_img      : options.wb_img,
                            redirect_url: options.redirect_url
                        })
                    }
                    },
                    {
                        className: 'icon-qZone', text: 'QQ空间', url: () => {
                        let options = this._options;
                        return buildUrl(baseUrl, {
                            to           : 3,
                            qzone_title  : options.qzone_title,
                            qzone_url    : options.qzone_url,
                            qzone_summary: options.qzone_summary,
                            qzone_img    : options.qzone_img,
                            redirect_url : options.redirect_url
                        })
                    }
                    }
                ]
            }
        },
        methods: {
            merge(options){
                return extend({
                    wx_url       : "微信分享跳转URL",
                    wx_title     : "微信分享标题",
                    wx_desc      : "微信分享内容",
                    wx_icon      : "",
                    wx_pyq_url   : "朋友圈分享跳转URL",
                    wx_pyq_title : "朋友圈分享标题",
                    wb_content   : "微博分享内容（限140字）",
                    wb_img       : "",
                    qzone_title  : "QQ空间title",
                    qzone_url    : "QQ分享跳转链接",
                    qzone_summary: "分享的摘要",
                    qzone_img    : "",
                    redirect_url : "" //分享成功后跳转url
                }, options || {});
            },
            _click(item){
                switch (item) {
                    case false:
                        return this.showModal = false;
                    default:
                        this.click && this.click(item.url());
                }
            }
        },
        watch  : {
            options: {
                deep: true,
                handler(val){
                    this._options = this.merge(val);
                }
            }
        }
    }
</script>
