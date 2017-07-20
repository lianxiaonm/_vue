<template>
    <page :options="options">
        <button v-for="btn in btnList" @tap="btn.click" v-html="btn.text"/>
    </page>
</template>
<script type="text/babel">
    import page from '../../plugin/common/component/page'
    import { $dialog } from '../../plugin/common/component/dialog'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            page
        },
        data (){
            return {
                options: {
                    title: {
                        value: 'dialog页面'
                    }
                },
                btnList: [
                    {text: 'alert', click: this.alert.bind(this, false)},
                    {text: 'alert不带标题', click: this.alert.bind(this, true)},
                    {text: 'confirm', click: this.confirm.bind(this, false)},
                    {text: 'confirm不带标题', click: this.confirm.bind(this, true)},
                    {text: 'loading 加载中', click: this.loading.bind(this, '加载中')},
                    {text: 'loading', click: this.loading.bind(this, '')},
                    {text: 'toast提示', click: this.toast.bind(this, 'toast提示')},
                    {text: 'actionSheet1', click: this.actionSheet.bind(this, ['拍照或录像', '选取现有的'], $log.debug)},
                    {text: 'actionSheet2', click: this.actionSheet.bind(this, ['回复', '转发', '打印'], $log.debug)},
                    {text: 'shareBox', click: this.share.bind(this, {text: '测试的title'})},
                    {text: 'shareBox1', click: this.share.bind(this, {text: ''})}
                ]
            }
        },
        methods   : {
            alert(noTitle) {
                $dialog.alert({
                    title  : noTitle ? '' : 'alert',
                    content: '删除消息成功',
                    click  : $log.debug
                })
            },
            confirm(noTitle) {
                $dialog.confirm({
                    title  : noTitle ? '' : 'confirm',
                    content: '确认要删除当前消息?',
                    click  : $log.debug
                })
            },
            loading(text){
                $dialog.spinner(text);
            },
            toast(text){
                $dialog.toast(text, $log.debug)
            },
            actionSheet(btnList) {
                $dialog.actionSheet(btnList, $log.debug);
            },
            share(_opts){
                $dialog.share(_opts);
            },

        }
    }
</script>
