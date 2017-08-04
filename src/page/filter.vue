<template>
    <v-page :options="options">
        <v-filter-modal slot="outer" :filter-map="filterMap" :show-modal.sync="filterModal"/>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/component/page'
    import { vFilterModal } from '../../plugin/common/component/filter'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            vPage,
            vFilterModal
        },
        data (){
            return {
                options    : {
                    title: {
                        value: '筛选器'
                    }
                },
                filterModal: true,
                filterMap  : [
                    {
                        text    : '上海市',
                        code    : '0000',
                        children: [
                            {text: '全部', code: ''},
                            {text: '东安路', code: '0001'},
                            {text: '枫林路', code: '0002'},
                            {text: '徐家汇路', code: '0003'},
                            {text: '凯滨路', code: '0004'},
                            {text: '龙腾大道', code: '0005'},
                            {text: '丰谷路', code: '0006'},
                            {text: '龙恒路', code: '0007'},
                            {text: '龙吴路', code: '0008'},
                            {text: '龙耀路', code: '0009'},
                            {text: '中山南一路', code: '0010'},
                            {text: '石龙路', code: '0011'},
                            {text: '漕宝路', code: '0012'}
                        ]
                    },
                    {
                        text    : '北京市',
                        code    : '0001',
                        children: [
                            {text: '全部', code: ''},
                            {text: '西单', code: '0001'},
                            {text: '东单', code: '0002'}
                        ]
                    },
                    {
                        text    : '天津市',
                        code    : '0002',
                        children: [
                        ]
                    },
                    {
                        text    : '山西省',
                        code    : '0003',
                        children: [
                        ]
                    },
                    {
                        text    : '黑龙江省',
                        code    : '0004',
                        children: [
                        ]
                    },
                    {
                        text    : '辽宁省',
                        code    : '0005',
                        children: [
                        ]
                    }
                ]
            }
        }
    }
</script>