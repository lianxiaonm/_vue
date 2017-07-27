<template>
    <page :options="options">
        <password-suite v-model="pwd"/>
        <password-suite type="complex" v-model="pwd"/>
        <password-suite has-change/>
        <password-suite has-change type="complex"/>
    </page>
</template>
<script type="text/babel">
    import page from '../../plugin/common/component/page'
    import { password, passwordSuite } from '../../plugin/common/component/password'
    export default {
        components: {
            page,
            password,
            passwordSuite
        },
        data(){
            return {
                options: {
                    title: {
                        value: '密码组件'
                    }
                },
                pwd    : ''
            }
        }
    }
</script>