/**
 * Created by h5 on 2017/9/4.
 */
import { isBrowser, toJson, fromJson, forEach } from './common'
import $log from './log'

let _timeKey   = '_time_key_sort_list_',
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