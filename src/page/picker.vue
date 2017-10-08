<template>
    <v-page-static :options="options">
        <button v-for="btn in btnList" @tap="btn.click" v-html="btn.text"/>
    </v-page-static>
</template>
<script type="text/babel">
    import { vPageStatic } from '../../plugin/common/components/page'
    import { $modalPicker, datePicker }from '../../plugin/common/components/picker'
    import $log from '../../plugin/common/services/log'
    export default {
        components: {
            vPageStatic
        },
        data (){
            return {
                options: {
                    title: {
                        value: 'picker'
                    }
                },
                btnList: [
                    {text: '默认', click: this.datePicker.bind(this, '')},
                    {text: 'date', click: this.datePicker.bind(this, 'date')},
                    {text: 'month', click: this.datePicker.bind(this, 'month')},
                    {text: 'hour', click: this.datePicker.bind(this, 'hour')},
                ]
            }
        },
        methods   : {
            datePicker(type) {
                $modalPicker.date({type: type, begin: ['2017', '9', '12']});
            },
        }
    }
</script>
