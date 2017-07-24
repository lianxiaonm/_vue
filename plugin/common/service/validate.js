import { trim } from './common'

export const regExp = {
    phone  : /^1[3-9][0-9]\d{8}$/,
    otp    : /^\d{6}$/,
    captcha: /^.{4}$/,
    url    : /^https?:\/\//,
    idCard : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    chCode : /[^\u4e00-\u9fa5\s+]/ig,
    enCode : /^[a-zA-Z\s]+$/
}

export const isEmpty = (label, value) => {
    let isEmpty = !!trim(value || '').length;
    return {flag: isEmpty, message: isEmpty ? '' : label + '不能为空'}
};

export const maxLength = (val, maxLen) => {
    return {flag: trim(val || '').length == maxLen, message: ''}
}

export const isPhone = (value) => {
    let flag    = regExp.phone.test(value),
        message = !value || flag ? '' : '手机号格式不正确';
    return {flag: flag, message: message}
}