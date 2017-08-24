import { inherit, extend } from '../service/common'
import httpRequest from '../service/http'

function Child() {
    httpRequest.call(this);
    this.logAPIUniqueKey = "[OTPService]";
    this.reverseCode     = function (resp) {
        if (resp.code == "1000") resp.code = "000000";
        return resp;
    }
    this.reverseCode2    = function (resp) {
        switch (resp.code) {
            case '1184':
                resp.code = '000001';
                break;
            case '1185':
                resp.code = '000002';
                break;
        }
        return resp;
    }
}
inherit(Child, httpRequest);
extend(Child.prototype, {
    trySendOTP(phone, captchaToken, deviceId, extraData){
        return this.postRequest('/h5/cma_send_otp_msg.json',
            extend({
                operationType: "/h5/cma_send_otp_msg.json",
                phone        : phone,
                captchaToken : captchaToken
            }, extraData)
        ).then(this.reverseCode, this.reverseCode).then(this.reverseCode2, this.reverseCode2);
    },
    refreshCaptcha(extraData){
        return this.postRequest('/h5/refresh_img_code.json',
            extend({
                operationType: '/h5/refresh_img_code.json'
            }, extraData)
        ).then(this.reverseCode, this.reverseCode);
    },
    verifyCaptcha(captcha, extraData){
        return this.postRequest('/h5/cma_verify_img_code.json',
            extend({
                operationType: '/h5/cma_verify_img_code.json',
                captchaInput : captcha.captchaInput,
                captchaId    : captcha.captchaId
            }, extraData)
        ).then(this.reverseCode, this.reverseCode);
    }
})
export default new Child();
