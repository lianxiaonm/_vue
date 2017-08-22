<template>
    <div class="key-body complex" :class="typeClass()">
        <slot/><!-- 内嵌插槽--组合组件  -->
        <h5><i/>安全键盘</h5>
        <ul v-for="(ks,idx) in keys" :class="'line_'+idx" @click="_click">
            <li v-for="k in ks" :class="getClass(k)">{{k}}</li>
        </ul>
    </div>
</template>
<script type="text/babel">
    import '../../less/keyboard.less'
    export default {
        data(){
            this.type = 'lower';
            return {
                keys: [
                    'qwertyuiop'.split(''),
                    'asdfghjkl'.split(''),
                    ['upper'].concat('zxcvbnm'.split('')).concat('back'),
                    ['.?123', 'space', '确定']
                ]
            }
        },
        props  : {
            click: ''
        },
        methods: {
            getClass(n){
                switch (n) {
                    case 'upper':
                    case 'lower':
                    case 'ABC':
                    case '.?123':
                    case '123':
                    case '#+=':
                        return 'key-switch';
                    case 'back':
                        return 'key-back';
                    case 'space':
                        return 'space';
                    case '确定':
                        return 'key-ent';
                }
            },
            typeClass(){
                switch (this.type) {
                    case 'upper':
                        return 'upper-letter';     //大写
                    case 'lower':
                    case 'ABC':
                        return 'letter';    //字母
                    case '.?123':
                    case '123':
                    case '#+=':
                        return 'symbol';    //符号
                }
            },
            switchCase(type){
                let keys = [];
                switch (type) {
                    case 'upper':
                        keys = [
                            'QWERTYUIOP'.split(''),
                            'ASDFGHJKL'.split(''),
                            ['lower'].concat('ZXCVBNM'.split('')).concat('back'),
                            ['.?123', 'space', '确定']
                        ];
                        break;
                    case 'ABC':
                    case 'lower':
                        keys = [
                            'qwertyuiop'.split(''),
                            'asdfghjkl'.split(''),
                            ['upper'].concat('zxcvbnm'.split('')).concat('back'),
                            ['.?123', 'space', '确定']
                        ];
                        break;
                    case '.?123':
                    case '123':
                        keys = [
                            '1234567890'.split(''),
                            '-/:;()$&@"'.split(''),
                            ['#+='].concat('.,?!\''.split('')).concat('back'),
                            ['ABC', 'space', '确定']
                        ];
                        break;
                    case '#+=':
                        keys = [
                            '[]{}#%^*+='.split(''),
                            '_\\|~<>€£¥•'.split(''),
                            ['123'].concat('.,?!\''.split('')).concat('back'),
                            ['ABC', 'space', '确定']
                        ]
                }
                keys.length && (this.keys = keys);
                this.type = type;
            },
            _click(event){
                var target = event.target, result;
                if (target.tagName == 'LI') {
                    result = target.innerHTML;
                    switch (result) {
                        case 'upper':
                        case 'lower':
                        case 'ABC':
                        case '.?123':
                        case '123':
                        case '#+=':
                            return this.switchCase(result);
                        default:
                            this.click && this.click(true, result);
                    }
                }
            }
        }
    }
</script>