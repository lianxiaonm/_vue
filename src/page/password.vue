<template>
    <v-page :options="options">
        <button @tap="rePay">重新支付</button>
        <v-password-suite/>
        <v-password-suite type="complex"/>
        <v-password-suite has-change/>
        <v-password-suite has-change type="complex"/>
        <v-password-modal slot="outer" :show-modal.sync="pwdModal" :submit="submit"/>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/components/page'
    import { vPasswordSuite, vPasswordModal } from '../../plugin/common/components/password'
    export default {
        components: {
            vPage,
            vPasswordSuite,
            vPasswordModal
        },
        data(){
            return {
                options : {
                    title: {
                        value: '密码组件'
                    }
                },
                pwdModal: true
            }
        },
        methods   : {
            submit(password){
                console.log(password);
            },
            rePay(){
                this.pwdModal = true;
            }
        }
    }
</script>