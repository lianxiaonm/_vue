<template>
    <div class="pwd-group" :class="[ _typeClass ]">
        <h4>请输入支付密码</h4>
        <slot/>
        <v-password v-model="value" :click="_click"/>
        <v-input label="支付密码" type="password" :readonly="true" v-model="value" :click="_click"/>
        <p class="corner">
            <a v-if="hasChange" @click="change" v-html="show=='simple'?'复杂密码':'简单密码'"/>
            <a v-if="_hasForget" @click="forget">忘记密码</a>
        </p>
        <button disabled ref="$btn">下一步</button>
    </div>
</template>
<script type="text/babel">
    import vPassword from './password.vue'
    import vInput from '../form/input.vue'
    import passwordMixin from '../mixins/password';
    import keyboardMixin from '../mixins/keyboard';
    export default {
        mixins    : [passwordMixin, keyboardMixin],
        components: {
            vPassword,
            vInput
        },
        props     : {
            type     : {
                default: 'simple'
            },
            hasChange: {
                default: true
            },
            forget   : {}
        },
        data(){
            return {
                show: this.type == 'simple' ? 'simple' : 'complex'
            }
        },
        computed  : {
            _type(){
                return this.show == 'simple';
            },
            _typeClass(){
                return this.show == 'simple' ? 'simple' : 'default';
            },
            _hasForget(){
                return typeof this.forget == 'function';
            }
        },
        watch     : {
            value(val){
                this.$refs.$btn.disabled = (val || '').length < 6;
                this.$emit('input', val);
            },
            type(val){
                this.show = val == 'simple' ? 'simple' : 'complex'
            }
        },
        methods   : {
            change(){
                this.value = '';
                this.show  = this.show == 'simple' ? 'complex' : 'simple';
            },
            _click(){
                this.show == 'simple' ? this.keyboard('password', true, 6) :
                    this.keyboard('complex', true, 16);
            },
        }
    }
</script>