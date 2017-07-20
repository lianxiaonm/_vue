<template>
    <page :options="options">
        <button v-for="doc in docList" v-html="doc.text" @click="click(doc.url)"/>
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
