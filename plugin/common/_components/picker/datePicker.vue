<template>
    <div class="picker-body">
        <picker v-for="(p,idx) in pMap"
                :p-list="p"
                v-model="select[idx]"
                :key="idx"/>
    </div>
</template>
<script type="text/babel">
    import picker from './picker.vue'
    import { extend } from '../../services/common'
    export default {
        components: {
            picker
        },
        props     : {
            options: '',
            value  : ''
        },
        data(){
            return this._init(this.options, this.value);
        },
        methods   : {
            _init(options, select = []){
                let type    = options.type || '',
                    nowTime = new Date(),
                    begin   = options.begin || [],
                    end     = options.end || [],
                    year    = nowTime.getFullYear(),
                    month   = nowTime.getMonth() + 1,
                    pMap    = [],
                    _select = [],
                    _year, _month, _day, _hour, _minute,
                    _years, _months, _days, _hours, _minutes,
                    _b, _e, lastDay;
                switch (type) {
                    case ''://[1,1,1,1,1]
                    case 'month'://[1,1]
                    case 'date'://[1,1,1]
                        _b    = ~~begin[0] || (year - 10);  //开始年
                        _e    = ~~end[0] || (year + 10);    //结束年
                        _year = ~~select[0] || year;        //当前选择年
                        if (_e < _b) _e = _b;               //结束年小于开始年 -- 则结束年和开始年为同一年
                        _year  = _year < _b ? _b : _year > _e ? _e : _year;   //纠正当前年的错误
                        _years = createVal(initList(_e + 1, _b), _year, n => {return {txt: n, val: n}});   //创建年的数组

                        _b     = ~~begin[1] || 1;           //开始月
                        _e     = ~~end[1] || 12;            //结束月
                        _month = ~~select[1] || month;      //当前月
                        if (_years.only) {                  //1年的区间
                            _e = _e < _b ? _b : _e;
                        } else if (_years.first) {          //第一年
                            _b = _b < 1 ? 1 : _b, _e = 12;
                        } else if (_years.last) {           //最后一年
                            _b = 1, _e = _e > 12 ? 12 : _e;
                        } else {
                            _b = 1, _e = 12;
                        }
                        _month  = _month < _b ? _b : _month > _e ? _e : _month;     //纠正当前月
                        _months = createVal(initList(_e + 1, _b), _month, mapList); //创建月的数组

                        pMap.push(_years.list), pMap.push(_months.list);
                        _select.push(_year), _select.push(_month);

                        if (type == 'month') break;

                        lastDay = getDays(_year, _month);
                        _b      = ~~begin[2] || 1;        //开始日
                        _e      = ~~end[2] || lastDay;    //结束日
                        _day    = ~~select[2] || nowTime.getDate();    //当前日

                        if (_years.only && _months.only) { //一年一月的区间
                            _e = _e < _b ? _b : _e;
                        } else if (_years.first && _months.first) {         //第一年首月
                            _b = _b < 1 ? 1 : _b;
                            _e = lastDay;
                        } else if (_years.last && _months.last) {           //最后一年末月
                            _b = 1;
                            _e = _e > lastDay ? lastDay : _e;
                        } else {
                            _b = 1, _e = lastDay;
                        }
                        _day  = _day < _b ? _b : _day > _e ? _e : _day;  //纠正当前日
                        _days = createVal(initList(_e + 1, _b), _day, mapList);   //常见日的数组
                        pMap.push(_days.list);
                        _select.push(_day);
                        if (type != '') break;
                    case 'hour'://[1,1]

                        _b    = ~~(type == 'hour' ? begin[3] : begin[0]) || 0;    //开始时
                        _e    = ~~(type == 'hour' ? end[3] : end[0]) || 23;       //结束时
                        _hour = ~~(type == 'hour' ? select[3] : select[0]) || nowTime.getHours();    //当前时

                        if (type == 'hour') {
                            _e = _e < _b ? _b : _e;
                        } else if (_years.only && _months.only && _days.only) {     //一年一月一日
                            _e = _e < _b ? _b : _e;
                        } else if (_years.first && _months.first && _days.first) {  //第一年第一月首日
                            _b = _b < 0 ? 0 : _b, _e = 23;
                        } else if (_years.last && _months.last && _days.last) {     //最后一年最后一月末日
                            _b = 0, _e = _e > 23 ? 23 : _e;
                        } else {
                            _b = 0, _e = 23;
                        }
                        _hour  = _hour < _b ? _b : _hour > _e ? _e : _hour;     //纠正当前时
                        _hours = createVal(initList(_e + 1, _b), _hour, mapList)   //常见时的数组

                        _b      = ~~(type == 'hour' ? begin[4] : begin[1]) || 0;    //开始分
                        _e      = ~~(type == 'hour' ? end[4] : end[1]) || 59;       //结束分
                        _minute = ~~(type == 'hour' ? select[4] : select[1]) || nowTime.getMinutes();    //当前分

                        if (type == 'hour') {
                            if (_hours.only) {
                                _e = _e < _b ? _b : _e;
                            } else if (_hours.first) {
                                _b = _b < 0 ? 0 : _b, _e = 59;
                            } else if (_hour.last) {
                                _b = 0, _e = _e > 59 ? 59 : _e;
                            } else {
                                _b = 0, _e = 59;
                            }
                        } else if (_years.only && _months.only && _days.only && _hours.only) {     //一年一月一日一时
                            _e = _e < _b ? _b : _e;
                        } else if (_years.first && _months.first && _days.first && _hours.first) {  //第一年第一月第一日首时
                            _b = _b < 0 ? 0 : _b, _e = 59;
                        } else if (_years.last && _months.last && _days.last && _hours.last) {     //最后一年最后一月最后一日末时
                            _b = 0, _e = _e > 59 ? 59 : _e;
                        } else {
                            _b = 0, _e = 59;
                        }

                        _minute  = _minute < _b ? _b : _minute > _e ? _e : _minute;     //纠正当前分
                        _minutes = createVal(initList(_e + 1, _b), _minute, mapList)   //常见分的数组

                        pMap.push(_hours.list), pMap.push(_minutes.list);
                        _select.push(_hour), _select.push(_minute)
                }
                return {
                    pMap, select: _select
                }
            }
        },
        watch     : {
            options(){
                let data    = this._init(this.options, this.value);
                this.pMap   = data.pMap;
                this.select = data.select;
            },
            select(val){
                let data  = this._init(this.options, val);
                this.pMap = data.pMap;
                this.$emit('input', val);
            }
        }
    }
    function initList(last, start) {
        start || (start = 0);
        for (var list = []; start < last; start++) list.push(start);
        return list;
    }
    function mapList(n) {
        return {
            txt: ('0' + n).slice(-2), val: ~~n
        }
    }
    function createVal(collec, val, map, type) {
        let idx   = collec.indexOf(val),
            list  = collec.map(map),
            first = idx == 0,
            last  = idx + 1 == list.length;
        return {
            idx, list, type, first, last, only: first && last
        }
    }
    function getDays(year, month) {
        return daysMap[month - 1] + ~~(month == 2 && year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
    }

    var Minutes = initList(60),         //分
        Hours = Minutes.slice(0, 24),   //时
        Months = Minutes.slice(1, 13),  //月
        Years = [],                     //年
        daysMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function createPicker(options, _def = new Date()) {
        Years      = initList(options.end + 1, options.begin);
        var type   = options.type || '',
            pMap   = [],
            select = [],
            year   = _def.getFullYear(),
            month  = _def.getMonth() + 1, _val;
        switch (type) {
            case '':
            case 'date' :
                //日
                _val = createVal(Minutes.slice(1, getDays(year, month) + 1), _def.getDate(), mapList, 'day');
                pMap.push(_val), select.push(_val.idx);
            case 'month':
                //月
                _val = createVal(Months, month, mapList, 'month');
                pMap.unshift(_val), select.unshift(_val.idx);
                //年
                _val = createVal(Years, year,
                    function (n) {
                        return {txt: n, val: n}
                    }, 'year');
                pMap.unshift(_val), select.unshift(_val.idx);
                if (type != '') break;
            case 'hour':
                //时
                _val = createVal(Hours, _def.getHours(), mapList, 'hour');
                pMap.push(_val), select.push(_val.idx);
                //分
                _val = createVal(Minutes, _def.getMinutes(), mapList, 'minute');
                pMap.push(_val), select.push(_val.idx);
        }
        return {pMap, select}
    }

</script>