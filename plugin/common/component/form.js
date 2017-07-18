import Vue from 'vue'
import Input from '../_component/form/input.vue'
import Form from '../_component/form/form.vue'

const components = [
    Input,
    Form
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default Input;

export {
    Input,
    Form
}