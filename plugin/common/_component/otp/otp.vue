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
            phone       : {
                type: String
            },
            readonly    : {
                default: false
            },
            submit      : {
                type   : Function,
                default: () => {}
            },
            defaultCount: {
                default: 60
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
                    readonly   : false,
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
                    placeholder: '请输入图片验证码',
                    validate   : this.validate.bind(this, 'picCode')
                }
            ];
            return {
                btnTxt  : '获取',
                inputs  : [...this.vNormal],
                vStore  : {
                    phone  : this.phone,
                    code   : '',
                    picCode: ''
                },
                count   : this.defaultCount,
                send    : 0,
                isNormal: true,
                picSrc  : ''//https://cashier.1qianbao.com/gtproxy/captchacode/code/9/3f5d1468-06f9-46c4-bf03-c1d7ef5038bd'   //图片验证码地址
            }
        },
        methods   : {
            validate(key, val) {
                return key == 'phone' ? isPhone(val) : key == 'picCode' ? maxLength(val, 4) : key == 'code' ? maxLength(val, 6) : {flag: false};
            },
            _submit(){
                this.isNormal ? this.submit(Object.assign({}, this.vStore)) : this.picSrc = '';
            },
            sendOtp(){
                this.send || ++this.send && this.countDown();
//                this.picSrc = 'https://cashier.1qianbao.com/gtproxy/captchacode/code/9/3f5d1468-06f9-46c4-bf03-c1d7ef5038bd';
            },
            countDown(){
                this.btnTxt = this.count <= 0 ? '重新获取' : this.count + 's';
                this.count-- > 0 ? setTimeout(() => this.countDown(), 1000) : (
                    this.count = this.defaultCount, --this.send
                );
            },
            refresh(){
                this.picSrc = 'https://cashier.1qianbao.com/gtproxy/captchacode/code/9/3f5d1468-06f9-46c4-bf03-c1d7ef5038bd?t=' + new Date().getTime();
            }
        },
        watch     : {
            isNormal(val){
                this.inputs = val ? [...this.vNormal] : [...this.vSpecial];
                //
                //重置store中的内容
                this.vStore[val ? 'picCode' : 'code'] = '';
            },
            picSrc(val){
                this.isNormal = !val
            }
        }
    }
</script>