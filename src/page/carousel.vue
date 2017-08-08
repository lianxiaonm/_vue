<template>
    <v-page :options="options">
        <v-carousel :items="items" :click="click" is-loop="true"/>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/component/page'
    import { vCarousel } from '../../plugin/common/component/carousel'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            vPage,
            vCarousel
        },
        data (){
            return {
                options: {
                    title: {
                        value: '折叠面板',
                    },
                },
                items  : [
                    {src: 'http://p1.meituan.net/460.280/deal/bb1f679bbd624aea5f20dfe90875c1c643869.jpg@460w_280h_1e_1c'},
                    {src: 'http://p1.meituan.net/deal/f8ada90c06fdbfbed00a1de6adadc2ad30696.jpg@460w_280h_1e_1c'},
                    {src: 'http://p1.meituan.net/deal/7e2608b10ad9805ad48e6927aec1e68446050.jpg@460w_280h_1e_1c'},
                ]
            }
        },
        methods   : {
            click(){
                $log.debug(arguments);
            }
        }
    }
</script>