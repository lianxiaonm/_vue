<template>
    <div class="pwd-group" :class="[ _typeClass ]">
        <h4>请输入支付密码</h4>
        <slot/>
        <password v-model="passwordVal"/>
        <v-input label="支付密码" type="password" name="password" maxLength="16" v-model="passwordVal"/>
        <p class="corner">
            <a v-if="hasChange" @click="change" v-html="show=='simple'?'复杂密码':'简单密码'"/>
            <a v-if="_hasForget" @click="forget">忘记密码</a>
        </p>
        <button disabled ref="$btn">下一步</button>
    </div>
</template>
<script type="text/babel">
    import password from './password.vue'
    import vInput from '../form/input.vue'
    export default {
        components: {
            password,
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
                passwordVal: '',
                show       : this.type == 'simple' ? 'simple' : 'complex'
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
            passwordVal(val){
                this.$refs.$btn.disabled = (val || '').length < 6;
            }
        },
        methods   : {
            change(){
                this.passwordVal = '';
                this.show        = this.show == 'simple' ? 'complex' : 'simple';
            }
        }
    }
</script>