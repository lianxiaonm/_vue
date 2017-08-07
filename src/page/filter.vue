<template>
    <v-page :options="options">
        <button @click="filterProvince">省筛选</button>
        <v-filter-modal slot="outer" :filter-map="filterMap" :show-modal.sync="filterModal"/>
        <v-filter-modal slot="outer" :filter-map="filterMap1" :show-modal.sync="filterModal1"/>
    </v-page>
</template>
<script type="text/babel">
    import { vPage } from '../../plugin/common/component/page'
    import { vFilterModal } from '../../plugin/common/component/filter'
    import $log from '../../plugin/common/service/log'
    import city from '../store/city'
    import cityData3 from '../store/city.data-3'
    export default {
        components: {
            vPage,
            vFilterModal
        },
        data (){
            return {
                options     : {
                    title: {
                        value         : '省市区筛选',
                        type          : 'TitleWithTab',
                        onOpenHandler : () => {
                            this.filterModal1 = false;
                            return this.filterModal = true;
                        },
                        onCloseHandler: () => {
                            return this.filterModal = false, true;
                        }
                    }
                },
                filterModal : false,
                filterMap   : cityData3.map(function reduce(city) {
                    let children = city.children || [];
                    return children.length > 0 ? {
                        code    : city.val,
                        text    : city.txt,
                        children: children.map(reduce)
                    } : {
                        code: city.val,
                        text: city.txt
                    }
                }),
                filterModal1: false,
                filterMap1  : city.map(function reduce(city) {
                    let children = city.children || [];
                    return children.length > 0 ? {
                        code    : city.val,
                        text    : city.txt,
                        children: children.map(reduce)
                    } : {
                        code: city.val,
                        text: city.txt
                    }
                })
            }
        },
        methods   : {
            filterProvince(){
                this.filterModal1 = !this.filterModal1;
            }
        }
    }
</script>