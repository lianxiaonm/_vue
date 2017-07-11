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
        <!--<button @click="picker('')">picker默认</button>
        <button @click="picker('date')">picker&#45;&#45;date</button>
        <button @click="picker('month')">picker&#45;&#45;month</button>
        <button @click="picker('hour')">picker&#45;&#45;hour</button>
        <button @click="picker()">picker&#45;&#45;linkage</button>-->
    </div>
</template>
<script type="text/babel">
    import { $keyboard } from '../../plugin/common/component/keyboard'
    import password from '../../plugin/common/component/password'
    import { $msgBox }from '../../plugin/common/component/msgBox'
    import $log from '../../plugin/common/service/log'
    import { $shareBox } from '../../plugin/common/component/shareBox'
//    import { $modalPicker } from '../../plugin/common/component/picker'
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
                $shareBox.show({
                    click: $log.debug
                });
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
            /*picker(type){
                switch (type) {
                    case 'date':
                    case 'month':
                    case 'hour':
                    case '':
                        return $modalPicker.date({type: type}, $log.debug);
                    default:
                        return $modalPicker.show([
                            {
                                txt: '陈宇', val: 'cy', children: [
                                {txt: '杜培培', val: 'dpp'},
                                {txt: '齐玥', val: 'qy'},
                            ]
                            },
                            {
                                txt: '徐明嵩', val: 'xms', children: [
                                {txt: '包立超', val: 'blc'},
                                {txt: '甘东晖', val: 'gdh'},
                            ]
                            },
                            {
                                txt: '徐佳', val: 'xj', children: [
                                {txt: '彭硕', val: 'ps'},
                                {txt: '张帆', val: 'zf'},
                                {txt: '倪敏', val: 'nm'},
                                {txt: '祝军', val: 'zj'},
                                {txt: '颜俊', val: 'yj'},
                                {txt: '周显风', val: 'zxf'},
                            ]
                            },
                            {
                                txt: '宋晨', val: 'sc', children: [
                                {txt: '马刊迎', val: 'mky'},
                                {txt: '黄丽丹', val: 'hld'},
                                {txt: '高峰', val: 'gf'},
                                {txt: '程玉兵', val: 'cyb'},
                            ]
                            },
                        ], '', $log.debug)
                }
            },*/
            popClick: $log.debug,
            shareClick(){
                this.showShare = false;
            }
        }
    }
</script>
