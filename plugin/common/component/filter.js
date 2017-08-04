import vFilterModal from '../_component/filter/filter.modal.vue'
const components = [
    vFilterModal
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vFilterModal;
export {
    vFilterModal
}