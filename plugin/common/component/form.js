import Vue from 'vue'
import vInput from '../_component/form/input.vue'
import vForm from '../_component/form/form.vue'
const components = [
    vInput,
    vForm
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vInput;

export {
    vInput,
    vForm
}