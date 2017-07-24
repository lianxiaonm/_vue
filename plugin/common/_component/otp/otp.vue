<template>
    <v-form :btn-text="'提交'" :submit="_submit">
        <v-input v-for="(i,idx) in inputs"
                 :readonly="i.readonly"
                 :type="i.type"
                 :key="idx"
                 :name="i.name"
                 :max-length="i.maxLength"
                 v-model="vStore[i.name]"
                 :label="i.label"
                 :validate="i.validate"
                 :require="i.require"
                 :placeholder="i.placeholder">
            <img v-if="!isNormal" class="r_btn" :src="picSrc" @click="refresh"/>
            <span v-else-if="isNormal&&idx==1" class="r_btn" @click="sendOtp" v-html="btnTxt"/>
        </v-input>
    </v-form>
</template>
<script type="text/babel">
    import { vForm, vInput } from '../../component/form'
    import { maxLength, isPhone } from '../../service/validate'

    export default {
        components: {
            vForm,
            vInput
        },
        props     : {
            phone   : {
                type: String
            },
            readonly: {
                default: false
            },
            submit  : {
                type   : Function,
                default: () => {}
            }
        },
        data(){
            this.vStore   = {phone: this.phone}; //数据仓库
            this.vNormal  = [
                {
                    name       : 'phone',
                    label      : '手机号',
                    type       : 'tel',
                    maxLength  : 11,
                    readonly   : this.readonly,
                    require    : true,
                    placeholder: '请输入手机号',
                    validate   : this.validate.bind(this, 'phone')
                },
                {
                    name       : 'code',
                    label      : '短信验证码',
                    type       : 'tel',
                    maxLength  : 6,
                    placeholder: '请输入短信验证码',
                    validate   : this.validate.bind(this, 'code')
                }
            ];
            this.vSpecial = [
                {
                    name       : 'picCode',
                    label      : '图片验证码',
                    type       : 'text',
                    maxLength  : 4,
                    require    : true,
                    placeholder: '请输入图片验证码',
                    validate   : this.validate.bind(this, 'picCode')
                }
            ]
            return {
                btnTxt  : '获取',
                inputs  : [...this.vNormal],
                vStore  : {
                    phone: this.phone
                },
                isNormal: true,
                picSrc  : ''//https://cashier.1qianbao.com/gtproxy/captchacode/code/9/3f5d1468-06f9-46c4-bf03-c1d7ef5038bd'   //图片验证码地址
            }
        },
        methods   : {
            validate(key, val) {
                return key == 'phone' ? isPhone(val) : key == 'picCode' ? maxLength(val, 4) : key == 'code' ? maxLength(val, 6) : {flag: false};
            },
            _submit(){
                if (this.isNormal) return this.submit(this.vStore);
                this.picSrc = '', this.vStore.picCode = '';
            },
            sendOtp(){
                this.picSrc = 'https://cashier.1qianbao.com/gtproxy/captchacode/code/9/3f5d1468-06f9-46c4-bf03-c1d7ef5038bd';
            },
            refresh(){

            }
        },
        watch     : {
            isNormal(val){
                this.inputs = val ? [...this.vNormal] : [...this.vSpecial];
            },
            picSrc(val){
                this.isNormal = !val
            }
        }
    }
</script>