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
            <img v-if="!isNormal"
                 class="r_btn"
                 :src="picSrc"
                 @tap="refresh"/>
            <span v-else-if="isNormal&&idx==1"
                  class="r_btn"
                  @tap="sendOtp"
                  v-html="btnTxt"/>
        </v-input>
    </v-form>
</template>
<script type="text/babel">
    import { vForm, vInput } from '../../components/form'
    import { maxLength, isPhone } from '../../services/validate'
    import { isFunction, extend } from '../../services/common'
    import { $dialog } from '../../components/dialog'
    import $log from '../../services/log'
    import otpApi from '../../apis/optApi'

    export default {
        components: {
            vForm,
            vInput
        },
        props     : {
            phone       : '',
            readonly    : {
                default: false
            },
            submit      : '',
            defaultCount: {
                default: 60
            },
            trySendOtp  : '',
            extraData   : ''
        },
        data(){
            this.vStore   = {phone: this.phone};
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
            this.send     = 0;
            this.count    = this.defaultCount;
            return {
                btnTxt  : '获取',
                inputs  : [...this.vNormal],
                //数据仓库
                vStore  : {
                    phone  : this.phone,
                    code   : '',
                    picCode: ''
                },
                isNormal: true,
                picSrc  : ''
                //https://cashier.xxxx.com/gtproxy/captchacode/code/9/3f5d1468-06f9-46c4-bf03-c1d7ef5038bd'   //图片验证码地址
            }
        },
        methods   : {
            validate(key, val) {
                return key == 'phone' ? isPhone(val) : key == 'picCode' ? maxLength(val, 4) : key == 'code' ? maxLength(val, 6) : {flag: false};
            },
            _submit(){
                let self  = this,
                    store = self.vStore;
                self.isNormal ? self.submit(Object.assign({}, store))
                    : otpApi.verifyCaptcha({
                    captchaInput: store.picCode,
                    captchaId   : store.captchaId
                }).then(function (res) {
                    if (res.code == '000000') {//图片验证码正确
                        store.captchaToken = res.data.captchaToken;
                        self.picSrc        = '';
                    } else $dialog.toast('验证码不正确', 2500);
                });
            },
            sendOtp(){
                let self       = this,
                    trySendSms = self.trySendOtp || otpApi.trySendOTP;
                if (!isFunction(trySendSms))
                    return $log.error('trySendOtp is not function');
                let {phone, captchaToken, deviceId} = this.vStore;
                if (!isPhone(phone).flag)
                    return $log.debug('phone number is invalid');
                this.send || ++this.send && trySendSms.call(otpApi, phone,
                    captchaToken, deviceId, extend({}, this.extraData))
                    .then(function (res) {
                        --self.send;
                        switch (res.code) {
                            case '000000':
                                return ++self.send, self.countDown();
                            case '000001':
                                return self._setValue(res.data || {});
                            default:
                                $dialog.toast(res.message, 2500);
                        }
                    }, () => --self.send);
            },
            countDown(){
                this.btnTxt = this.count <= 0 ? '重新获取' : this.count + 's';
                this.count-- > 0 ? setTimeout(() => this.countDown(), 1000) : (
                    this.count = this.defaultCount, --this.send
                );
            },
            refresh(){
                otpApi.refreshCaptcha().then(res => {
                    if (res.code == '000000') this._setValue(res.data || {});
                });
            },
            _setValue(data){
                this.vStore.captchaId = data.captchaId;
                this.picSrc           = data.captchaUrl + "?r=" + Math.random();
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