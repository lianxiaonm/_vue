<template>
    <page :options="options">
        <password v-model="password"/>
        <p>{{password}}</p>
        <button @click="click('showPassword')">showPassword</button>
        <password-modal :show-modal.sync="showPassword" v-model="password"/>
        <button @tap="keyboard('password',true)">password-nine</button>
        <button @tap="keyboard('password')">password</button>
        <button @tap="keyboard('number',true)">number-nine</button>
        <button @tap="keyboard('number')">number</button>
        <button @tap="keyboard('idCard',true)">idCard-nine</button>
        <button @tap="keyboard('idCard')">idCard</button>
        <button @tap="keyboard('complex')">complex</button>
    </page>
</template>
<script type="text/babel">
    import page from '../../plugin/common/component/page'
    import { $keyboard } from '../../plugin/common/component/keyboard'
    import password, { passwordModal } from '../../plugin/common/component/password'
    import { $dialog }from '../../plugin/common/component/dialog'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            page,
            password,
            passwordModal,
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
            keyboard(key, isNine){
                $keyboard[key](!!isNine, $log.debug);
            },
            actionSheet(){
                $dialog.actionSheet(['拍照', '相册'], $log.debug)
            },
            log: $log.debug,
        }
    }
</script>
