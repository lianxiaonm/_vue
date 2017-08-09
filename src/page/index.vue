<template>
    <v-page :options="options">
        <ul class="item-view">
            <li class="item-list" v-for="doc in docList" v-html="doc.text" @click="click(doc.url)"/>
        </ul>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/component/page'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            vPage
        },
        data (){
            return {
                options: {
                    title: {
                        value         : 'vue 组件文档',
                        type          : 'TitleWithTab',
                        onOpenHandler : () => {
                            return $log.debug('open'), true
                        },
                        onCloseHandler: () => {
                            return $log.debug('close'), true
                        }
                    },
                    right: [
                        {
                            type          : "OnlyTitle",
                            textValue     : '提交',
                            onClickHandler: $log.debug
                        }
                    ]
                },
                docList: [
                    {url: 'icon', text: 'icon图标'},
                    {url: 'dialog', text: 'dialog'},
                    {url: 'keyboard', text: '虚拟键盘'},
                    {url: 'form', text: 'form表单'},
                    {url: 'password', text: '密码组件'},
                    {url: 'tabs', text: 'tab页组件'},
                    {url: 'collapse', text: '折叠面板'},
                    {url: 'filter', text: '筛选组件'},
                    {url: 'carousel', text: '走马灯'},
                    {url: 'noticeBar', text: '通告栏'},
                ]
            }
        },
        mounted(){
            setTimeout(() => {
                this.options.title.value = '更换新的标题'
            }, 5000);
        },
        methods   : {
            click(url){
                this.$router.push(url);
            }
        }
    }
</script>
