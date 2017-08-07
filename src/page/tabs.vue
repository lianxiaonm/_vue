<template>
    <v-page-static :options="options">
        <v-tabs default-active="0">
            <v-tab-panel label="一致性"/>
            <v-tab-panel label="反馈"/>
            <v-tab-panel label="反馈"/>
            <v-tab-panel label="反馈"/>
            <v-tab-panel label="反馈"/>
            <v-tab-panel label="反馈"/>
            <v-tab-panel label="反馈"/>
            <v-tab-panel label="反馈"/>
        </v-tabs>
    </v-page-static>
</template>
<script type="text/babel">
    import { vPageStatic } from '../../plugin/common/component/page'
    import { vTabs, vTabPanel } from '../../plugin/common/component/tabs'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            vPageStatic,
            vTabs,
            vTabPanel
        },
        data (){
            return {
                options: {
                    title: {
                        value: '标签页',
                    },
                }
            }
        }
    }
</script>
