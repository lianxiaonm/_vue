/**
 * Created by h5 on 2017/9/4.
 */
import { isBrowser, toJson, fromJson, forEach } from './common'
import $log from './log'

let support    = null,
    _timeKey   = '_time_key_sort_list_',
    _timeValue = {},    //local存储的倒计时
    _data      = {},    //local存储的数据
    _timer     = null;  //定时器句柄

function storage() {
    if (!isBrowser) return;
    try {
        let keys = Object.keys(localStorage) || [],
            _value, value;
        keys.forEach(key => {
            try {
                _value = localStorage[key];
                value  = fromJson(_value);
            } catch (e) {
                value = _value;
            }
            key === _timeKey ? _timeValue = value :
                _data[key] = value;
        });
        isBrowser && this._save();
    } catch (e) {
        $log.error(e), _data = {};
    }
}
storage.prototype = {
    put(key, value, timer){
        _data[key] = value;
        if (timer) {
            _timeValue[key] = new Date().getTime() + (+timer);
        } else {
            delete _timeValue[key];
        }
        isBrowser && this._save();
    },
    get(key){
        return key ? _data[key] : _data;
    },
    _save(){
        _timer && clearTimeout(_timer), _timer = null;
        let minTime = 0,
            keys    = Object.keys(_timeValue) || [],
            nowTime = new Date().getTime(), _value;
        localStorage.clear();   //清除local
        keys.forEach(key => {
            _value = _timeValue[key];
            if (_value < nowTime) {
                delete _data[key], delete _timeValue[key];
            } else {
                minTime = minTime == 0 ? _value : Math.min(_value, minTime);
            }
        });
        forEach(_data, function (value, key) {
            localStorage.setItem(key, toJson(value));
        }), localStorage.setItem(_timeKey, toJson(_timeValue));
        //倒计时
        _timer = minTime > 0 ? setTimeout(() => this._save(), +(minTime - nowTime)) : null;
    }
};

export default new storage();

/*
 export default class Storage {

 constructor() {
 this._init();
 }

 put(key, value, timer) {
 this.data[key] = value;
 return this.save();
 }

 get(key) {
 return key ? this.data[key] : this.data;
 }

 remove() {
 return delete this.data[key], this.save();
 }

 save() {
 if (!isBrowser) return;
 try {
 switch (support) {
 case true:
 return this._local(this.data);
 case false:
 return this._cookies(this.data);
 default:
 return this.checkSupport(this.save);
 }
 } catch (e) {
 $log.error(e);
 }
 }

 _init() {
 if (!isBrowser) return;
 let value;
 try {
 switch (support) {
 case true:
 value = this._local(this.uid, true);
 break;
 case false:
 value = this._cookies(this.uid, true);
 break;
 default:
 value = this.checkSupport(this._init);
 }
 return support || (value && value.match(/^\s*\{/)) ?
 fromJson(value) : value;
 } catch (e) {
 return $log.error(e), {};
 }
 }

 _local(value, isGet) {
 return isGet ? localStorage.getItem(value) :
 (localStorage.getItem(this.uid, toJson(value)), this);
 }

 _cookies(value, isGet) {
 let cookies = null, expires, date = new Date();
 if (isGet) {
 (document.cookie || '').split(';')
 .forEach(function (val) {
 let valList = (trim(val) || '').split('=') || [];
 if (valList[0] == value) {
 cookies = decodeURIComponent(valList[1]);
 return false;
 }
 });
 return cookies;
 } else {
 if (value === null) {
 date.setTime(date.getTime() - 1 * 24 * 60 * 60 * 1000);
 value = '';
 }
 if (isObject(value)) value = toJson(value)
 expires         = '; expires=' + date.toUTCString();
 document.cookie = [this.uid, '=', encodeURIComponent(value), expires, '', '', ''].join('');
 return this;
 }
 }

 checkSupport(call) {
 try {
 localStorage.setItem("testKey", 1);
 localStorage.removeItem("testKey");
 support = true;
 } catch (e) {
 support = false;
 }
 return call && call();
 }
 }*/
