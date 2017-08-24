<template>
    <v-modal v-model="showModal">
        <!--简单键盘-->
        <v-keyboard-simple v-if="show!='complex'"
                           :keys="keys"
                           :others="others"
                           :click="_click">
            <h3 class="pwd-head">
                <em class="icon-font icon-back" @tap="_close"/>请输入支付密码
            </h3>
            <div class="pwd-group">
                <v-password v-model="value"/>
                <p class="corner">
                    <a v-if="hasChange" @tap="change" v-html="'复杂密码'"/>
                    <a v-if="_hasForget" @tap="forget">忘记密码</a>
                </p>
            </div>
        </v-keyboard-simple>
        <!--复杂键盘-->
        <v-keyboard-complex v-else :click="_click">
            <h3 class="pwd-head">
                <em class="icon-font icon-back" @tap="_close"/>请输入支付密码
            </h3>
            <div class="pwd-group">
                <v-input label="支付密码" type="password" :readonly="true" v-model="value" placeholder="请输入支付密码"/>
                <p class="corner">
                    <a v-if="hasChange" @tap="change" v-html="'简单密码'"/>
                    <a v-if="_hasForget" @tap="forget">忘记密码</a>
                </p>
            </div>
        </v-keyboard-complex>
    </v-modal>
</template>
<script type="text/babel">
    import vPassword from './password.vue'
    import vInput from '../form/input.vue'
    import vKeyboardSimple from '../keyboard/keyboard.simple.vue'
    import vKeyboardComplex from '../keyboard/keyboard.complex.vue'
    //mixins js
    import _modal from '../mixins/modal'
    import passwordMixin from '../mixins/password';
    import passwordSuiteMixin from '../mixins/password.suite.js';
    import keyboardMixin from '../mixins/keyboard';
    export default {
        mixins    : [
            passwordMixin,
            passwordSuiteMixin,
            keyboardMixin,
            _modal
        ],
        components: {
            vKeyboardSimple,
            vKeyboardComplex
        },
        props     : {
            submit: {}
        },
        data(){
            return {
                show  : this.type == 'simple' ? 'simple' : 'complex',
                keys  : [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, 'back'],
                others: []
            }
        },
        watch     : {
            value(val){
                this.checkType() && val.length == 6 && this._commit()
            }
        },
        methods   : {
            _click(isClose, char){
                this.input(this, char, this.checkType() ? 6 : 16) ? this._commit() : '';
            },
            _commit(){
                typeof this.submit == 'function' && this.submit(this.value);
            },
            _close(){
                this.showModal = false;
            }
        }
    }
</script>