import vFilterModal from '../_component/filter/filter.modal.vue'
import vFilterLinkage from '../_component/filter/filter.linkage.vue'
import vFilter from '../_component/filter/filter.vue'
const components = [
    vFilter,
    vFilterLinkage,
    vFilterModal
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vFilterLinkage;
export {
    vFilter,
    vFilterLinkage,
    vFilterModal
}