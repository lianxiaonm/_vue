<template>
    <div class="key-body m-row" :class="[ getClazz ]">
        <slot/><!-- 内嵌插槽--组合组件  -->
        <h5><i/>安全键盘</h5>
        <ul class="col number m-row" @click="_click">
            <li class="col-4" v-for="(k,idx) in keys" :key="idx" :class="getClass(k)" v-html="k"/>
        </ul>
        <ul class="col num-other" @click="_click">
            <li v-for="(o,idx) in others" :key="idx" :class="getClass(o)" v-html="o"/>
        </ul>
    </div>
</template>
<script type="text/babel">
    import '../../less/keyboard.less'

    export default {
        props   : {
            keys  : {
                default: []
            },
            others: {
                default: []
            },
            click : ''
        },
        computed: {
            getClazz(){
                return this.isNine() ? 'keyAll' : '';
            },
        },
        methods : {
            isNine(){
                return !(this.others && this.others.length);
            },
            getClass(n){
                return /[a-z|A-Z]/.test(n) ? `key-${n}` : /\*/.test(n) ? 'key-dis' : /确定/.test(n) ? 'key-ent' : '';
            },
            _click(event){
                var target = event.target, result;
                if (target.tagName == 'LI') {
                    result = target.innerHTML;
                    switch (result) {
                        case '*':
                            return;
                        default:
                            this.click && this.click(true, result);
                    }
                }
            }
        }
    }
</script>