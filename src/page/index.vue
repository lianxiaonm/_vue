<template>
    <page :options="options">
        <ul class="item-view">
            <li class="item-list" v-for="doc in docList" v-html="doc.text" @click="click(doc.url)"/>
        </ul>
    </page>
</template>
<script type="text/babel">
    import page from '../../plugin/common/component/page'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            page
        },
        data (){
            return {
                options: {
                    title: {
                        value: 'vue 组件文档'
                    }
                },
                docList: [
                    {url: 'icon', text: 'icon图标'},
                    {url: 'dialog', text: 'dialog'},
                    {url: 'keyboard', text: '虚拟键盘'},
                    {url: 'form', text: 'form表单'},
                ]
            }
        },
        methods   : {
            click(url){
                this.$router.push(url);
            },
        }
    }
</script>
