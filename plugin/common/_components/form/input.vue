<template>
    <div class="form-input"
         :class="{'error':error,'on':isOn,'focus':isFocus,'small':($slots.default || []).length}">
        <label v-if="label" v-html="label"/>
        <input autocomplete="off"
               spellcheck="false"
               :type="type"
               :maxlength="maxLength"
               :readonly="readonly"
               :placeholder="placeholder"
               :value="inputVal"
               @focus="focusBlur"
               @blur="focusBlur"
               @tap="click"
               @input="input"/>
        <i v-if="!readonly" class="icon-font clear" @tap="clear"/>
        <small class="err-tip" v-html="error"/>
        <slot/>
    </div>
</template>
<script type="text/babel">
    import '../../less/form.less'
    import { valueFn } from '../../services/common'

    const skipValidate = valueFn({flag: true});

    export default {
        props  : {
            label      : {},
            type       : {
                default: 'text'
            },
            name       : '',
            value      : '',
            maxLength  : '',
            require    : {
                default: false
            },
            readonly   : {
                default: false,
            },
            placeholder: '',
            validate   : '',
            click      : ''
        },
        data(){
            return {
                error   : '',
                isOn    : false,
                isFocus : false,
                inputVal: ''
            }
        },
        mounted(){
            this.inputVal = this.value;
        },
        methods: {
            focusBlur(event){
                var value    = this.inputVal,
                    isFocus  = event.type == 'focus';
                this.isOn    = isFocus || !!value;
                this.isFocus = isFocus;
            },
            input(event){
                this.inputVal = event.target.value;
            },
            clear(){
                this.inputVal = '';
            }
        },
        watch  : {
            $props: {
                deep: true,
                handler(props){
                    this.inputVal = props.value || '';
                }
            },
            inputVal(val){
                let validate = this.validate || skipValidate,
                    error    = validate(val) || {};
                this.isOn    = !!val;
                this.error   = error.message;
                this.$emit('input', val);
            }
        }
    }
</script>