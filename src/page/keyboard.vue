<template>
    <page :options="options">
        <v-form :submit="submit">
            <v-input v-for="(i,idx) in inputs"
                     :readonly="i.readonly"
                     :type="i.type"
                     :key="idx"
                     :name="i.name"
                     :class="i.className"
                     v-model="i.value"
                     :click="i.click ? i.click.bind(i,i) : null"
                     :label="i.label"
                     :validate="i.validate"
                     :require="i.require"
                     :placeholder="i.placeholder"/>
        </v-form>
    </page>
</template>
<script type="text/babel">
    import page from '../../plugin/common/component/page'
    import { $keyboard } from '../../plugin/common/component/keyboard'
    import { vInput, vForm } from '../../plugin/common/component/form'
    export default {
        components: {
            page,
            vInput,
            vForm
        },
        data (){
            return {
                options: {
                    title: {
                        value: '虚拟键盘'
                    }
                },
                inputs : [
                    {
                        label   : '账号', placeholder: '系统键盘', value: '',
                        readonly: false, type: 'text', name: 'name', require: true,
                    },
                    {
                        label   : '密码', placeholder: '全键盘', value: '',
                        readonly: true, type: 'password', name: 'password', require: true,
                        click   : that => $keyboard.complex(true, char => this.input(that, char))
                    },
                    {
                        label   : '手机号', placeholder: '数字键盘9', value: '',
                        readonly: true, type: 'text', name: 'count', require: true,
                        click   : that => $keyboard.number(true, char => this.input(that, char))
                    }
                ]
            }
        },
        mounted(){
            this.inputs.push({
                label   : '年龄', placeholder: '数字键盘', value: '',
                readonly: true, type: 'text', name: 'age',
                click   : that => $keyboard.number(false, char => this.input(that, char))
            })
        },
        methods   : {
            input(that, char){
                var value = that.value.split('');
                switch (char) {
                    case 'back':
                        value.splice(-1);
                        break;
                    case '确定':
                        break;
                    case 'space':
                        value.push(' ');
                    default:
                        value.push(char);
                }
                that.value = value.join('');
            },
            submit(store){
                console.log(store);
            }
        }
    }
</script>