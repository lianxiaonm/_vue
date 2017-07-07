<template>
    <modal v-model="showModal">
        <div :class="[ typeClass ]" @click="_click">
            <h5>壹钱包安全键盘</h5>
            <ul class="col number m-row">
                <li v-for="k in keys" :class="getClass(k,['col-4'])">{{k}}</li>
            </ul>
            <ul class="col num-other" v-if="others.length">
                <li v-for="o in others" :class="getClass(o)">{{o}}</li>
            </ul>
        </div>
    </modal>
</template>
<script type="text/babel">
    import '../less/keyboard.less'
    import _modal from './mixins/modal'
    export default {
        mixins: [_modal],
        props: {
            screen: {
                type: String
            },
            keys: {
                type: Array
            },
            others: {
                type: Array,
                default: []
            }
        },
        methods: {
            getClass(n, clz = []){
                /[a-z|A-Z]/.test(n) ? clz.push('key-' + n)
                    : /\*/.test(n) && clz.push('key-disabled');
                return clz.join(' ');
            },
            _click(event){
                var target = event.target, result;
                if (target.tagName == 'LI') {
                    result = target.innerHTML;
                    switch (result) {
                        case '*':
                            return;
                        case 'hide':
                            return this.showModal = false;
                        default:
                            this.click && this.click(true, result);
                    }
                }
            }
        },
        computed: {
            typeClass(){
                let className = ['key-body', 'm-row'];
                this.screen && className.push(this.screen);
                this.others.length || className.push('keyAll');
                return className;
            }
        }
    }
</script>