<template>
    <div>
        <password/>
        <button @click="click('showModal')">modal</button>
        <button @click="share()">share</button>
        <button @click="alert(false)">alert</button>
        <button @click="alert(true)">alert no title</button>
        <button @click="confirm(false)">confirm</button>
        <button @click="confirm(true)">confirm no title</button>
        <button @click="keyboard('simplePwd',true)">simplePwd-nine</button>
        <button @click="keyboard('simplePwd')">simplePwd</button>
        <button @click="keyboard('number',true)">number-nine</button>
        <button @click="keyboard('number')">number</button>
        <button @click="keyboard('idCard',true)">idCard-nine</button>
        <button @click="keyboard('idCard')">idCard</button>
    </div>
</template>
<script type="text/babel">
    import { $keyboard } from '../../plugin/common/component/keyboard'
    import password from '../../plugin/common/component/password'
    import { $msgBox }from '../../plugin/common/component/msgBox'
    import $log from '../../plugin/common/service/log'
    import { $shareBox } from '../../plugin/common/component/shareBox'
    export default {
        name: 'index',
        components: {
            password
        },
        props: {},
        data: () => {

            return {
                title: '',
                content: '这里是内容....',
                btns: [
                    {type: '', text: '关闭'},
                    {type: 'btn-positive', text: '确定'},
                ],
                keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, 'back'],
                others: [],
                showModal: !1,
                showPopup: false,
                showShare: !1
            }
        },
        methods: {
            click(key){
                this[key] = !this[key];
            },
            share(){
                $shareBox.show();
            },
            alert(noTitle){
                $msgBox.alert({
                    title: noTitle ? '' : 'alert',
                    content: '删除消息成功',
                    click: $log.debug
                })
            },
            confirm(noTitle){
                $msgBox.confirm({
                    title: noTitle ? '' : 'confirm',
                    content: '确认要删除当前消息?',
                    click: $log.debug
                })
            },
            keyboard(key, isNine){
                $keyboard[key](!!isNine, function () {
                    console.log(arguments);
                })
            },
            popClick: $log.debug,
            shareClick(){
                this.showShare = false;
            }
        }
    }
</script>
