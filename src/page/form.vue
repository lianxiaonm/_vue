<template>
    <page :options="options">
        <v-form :submit="submit">
            <v-input v-for="(i,idx) in inputs"
                     :readonly="i.readonly"
                     :type="i.type"
                     :key="idx"
                     :name="i.name"
                     :class="i.className"
                     v-model="i.value"
                     :label="i.label"
                     :validate="i.validate"
                     :require="i.require"
                     :placeholder="i.placeholder">
            </v-input>
        </v-form>
    </page>
</template>
<script type="text/babel">
    import page from '../../plugin/common/component/page'
    import { vInput, vForm } from '../../plugin/common/component/form'
    import $log from '../../plugin/common/service/log'
    export default {
        components: {
            page,
            vInput,
            vForm
        },
        data(){
            return {
                options: {
                    title: {
                        value: 'form表单'
                    },
                    right: [
                        {
                            type     : "OnlyTitle",
                            textValue: '提交'
                        }
                    ]
                },
                inputs : [
                    {
                        label   : '账号', placeholder: '请输入您的账号', value: '',
                        readonly: false, type: 'text', name: 'name', require: true,
                    },
                    {
                        label   : '密码', placeholder: '请输入密码', value: '',
                        readonly: false, type: 'password', name: 'password', require: true,
                    },
                    {
                        label   : '手机号', placeholder: '请输入手机号', value: '',
                        readonly: false, type: 'text', name: 'count', require: true,
                    }
                ]
            }
        },
        methods   : {
            submit(store){
                $log.debug(store);
            }
        }
    }
</script>