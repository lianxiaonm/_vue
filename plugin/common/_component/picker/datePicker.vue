<template>
    <div class="picker-body">
        <picker v-for="(p,idx) in pMap"
                :p-list="p.list"
                v-model="select[p.type]"
                :key="idx"/>
    </div>
</template>
<script type="text/babel">
    import picker from './picker.vue'
    import { extend } from '../../service/common'
    export default {
        components: {
            picker
        },
        props: {
            options: {
                type: Object
            }
        },
        data(){
            return this.init();
        },
        methods: {
            init(){
                let now = new Date(),
                    nowYear = now.getFullYear(),
                    select = {},
                    pMap = createDatePicker(extend({
                        begin: nowYear - 10,
                        end: nowYear + 10,
                        select: now
                    }, this.options || {}), select).pMap;
                return {
                    pMap: pMap, select: select
                }
            }
        },
        watch: {
            options(){
                let data = this.init();
                this.pMap = data.pMap;
                this.select = data.select;
            }
        }
    }


    var Minutes = initList(60),         //分
        Hours = Minutes.slice(0, 24),   //时
        Months = Hours.slice(1, 13),    //月
        Years = [],                     //年
        daysMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function initList(last, start) {
        start || (start = 0);
        for (var list = []; start < last; start++) {
            list.push(start);
        }
        return list;
    }
    function mapList(n) {
        return {txt: ('0' + n).slice(-2), val: n}
    }
    function createVal(collec, val, map, type) {
        return {idx: collec.indexOf(val), list: collec.map(map), type: type}
    }
    function getDays(year, month) {
        return daysMap[month - 1] + ~~(month == 2 && year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
    }
    function createDatePicker(options, select) {
        Years = initList(options.end + 1, options.begin);
        var type = options.type || '', pickerMap = [], titles = [], _def = options.select,
            year = _def.getFullYear(), month = _def.getMonth() + 1, day, hour, minute;
        switch (type) {
            case '':
            case 'date' :
                day = _def.getDate();
                pickerMap.push(createVal(
                    Minutes.slice(1, getDays(year, month) + 1),
                    day, mapList, 'day'
                )), titles.push('日'), select.day = mapList(day);
            case 'month':
                pickerMap.unshift(createVal(Months, month, mapList, 'month'));
                pickerMap.unshift(createVal(Years, year,
                    function (n) {
                        return {txt: n, val: n}
                    }, 'year'));
                select.month = mapList(month);
                select.year = {txt: year, val: year};
                titles.unshift('月'), titles.unshift('年');
                if (type != '') break;
            case 'hour':
                hour = _def.getHours(), minute = _def.getMinutes();
                pickerMap.push(createVal(Hours, hour, mapList, 'hour'));
                pickerMap.push(createVal(Minutes, minute, mapList, 'minute'));
                select.hour = mapList(hour), select.minute = mapList(minute);
                titles.push('时'), titles.push('分');
        }
        return {pMap: pickerMap, titles: titles};
    }

</script>