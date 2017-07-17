<template>
    <div>
        <yqbHead :options="options"/>
        <div class="page-body">
            <password v-model="password"/>
            <p>{{password}}</p>
            <button @click="share()">share</button>
            <button @click="click('showPassword')">showPassword</button>
            <password-modal :show-modal.sync="showPassword" v-model="password"/>
            <button @click="alert(false)">alert</button>
            <button @click="alert(true)">alert no title</button>
            <button @click="confirm(false)">confirm</button>
            <button @click="confirm(true)">confirm no title</button>
            <button @click="loading('加载中')">loading 加载中.</button>
            <button @click="loading()">loading</button>
            <button @click="toast('删除完成')">toast</button>
            <button @click="actionSheet()">actionSheet</button>
            <button @click="keyboard('password',true)">password-nine</button>
            <button @click="keyboard('password')">password</button>
            <button @click="keyboard('number',true)">number-nine</button>
            <button @click="keyboard('number')">number</button>
            <button @click="keyboard('idCard',true)">idCard-nine</button>
            <button @click="keyboard('idCard')">idCard</button>
            <button @click="keyboard('complex')">complex</button>
        </div>
    </div>
</template>
<script type="text/babel">
    import { $keyboard } from '../../plugin/common/component/keyboard'
    import password, { passwordModal } from '../../plugin/common/component/password'
    import { $dialog }from '../../plugin/common/component/msgBox'
    import $log from '../../plugin/common/service/log'
    import { $shareBox } from '../../plugin/common/component/shareBox'
    import yqbHead from '../../plugin/common/component/yqbHeader'
    export default {
        name      : 'index',
        components: {
            password,
            passwordModal,
            yqbHead
        },
        props     : {},
        data (){
            return {
                options     : {
                    title: {
                        value: 'vue 组件文档'
                    }
                },
                title       : '',
                content     : '这里是内容....',
                btns        : [
                    {type: '', text: '关闭'},
                    {type: 'btn-positive', text: '确定'},
                ],
                keys        : [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, 'back'],
                others      : [],
                showModal   : !1,
                showPopup   : false,
                showShare   : !1,
                password    : '',
                showPassword: false
            }
        },
        methods   : {
            click(key){
                this[key] = !this[key];
            },
            share(){
                $shareBox.show({
                    click: $log.debug
                });
            },
            alert(noTitle){
                $dialog.alert({
                    title  : noTitle ? '' : 'alert',
                    content: '删除消息成功',
                    click  : $log.debug
                })
            },
            confirm(noTitle){
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
                $dialog.toast(text || 'toast提示...', () => $log.debug('close'))
            },
            keyboard(key, isNine){
                $keyboard[key](!!isNine, $log.debug);
            },
            actionSheet(){
                $dialog.actionSheet(['拍照', '相册'], $log.debug)
            },
            log: $log.debug,
            shareClick(){
                this.showShare = false;
            }
        }
    }
</script>
