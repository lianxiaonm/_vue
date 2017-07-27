<template>
    <v-page :options="options">
        <password-suite v-model="pwd"/>
        <password-suite type="complex" v-model="pwd"/>
        <password-suite has-change/>
        <password-suite has-change type="complex"/>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/component/page'
    import { passwordSuite } from '../../plugin/common/component/password'
    export default {
        components: {
            vPage,
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