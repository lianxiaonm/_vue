<template>
    <div class="form-input"
         :class="{'error':error,'on':isOn,'focus':isFocus}">
        <label v-if="label">{{label}}</label>
        <input autocomplete="off"
               spellcheck="false"
               :type="type"
               :maxlength="maxLength"
               :readonly="readonly"
               @focus="focus"
               @blur="blur"
               v-model="value"/>
    </div>
</template>
<script type="text/babel">

    import '../../less/form.less'

    export default {
        props  : {
            type       : {
                type   : String,
                default: 'text'
            },
            value      : {
                type: String
            },
            maxLength  : {
                type: Number
            },
            readonly   : {
                type: Boolean
            },
            placeholder: {
                type: String
            },
            validate   : {
                type: Function
            }
        },
        methods: {
            focus(){

            },
            blur(){

            }
        },
        watch  : {
            value(val){

            }
        }
    }
</script>