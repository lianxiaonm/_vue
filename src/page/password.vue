<template>
    <v-page :options="options">
        <v-password-suite v-model="pwd"/>
        <v-password-suite type="complex" v-model="pwd"/>
        <v-password-suite has-change/>
        <v-password-suite has-change type="complex"/>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/component/page'
    import { vPasswordSuite } from '../../plugin/common/component/password'
    export default {
        components: {
            vPage,
            vPasswordSuite
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