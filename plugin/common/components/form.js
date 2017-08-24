import vInput from '../_components/form/input.vue'
import vForm from '../_components/form/form.vue'
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