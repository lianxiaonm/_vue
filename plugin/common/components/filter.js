import vFilterModal from '../_components/filter/filter.modal.vue'
import vFilterLinkage from '../_components/filter/filter.linkage.vue'
import vFilter from '../_components/filter/filter.vue'
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