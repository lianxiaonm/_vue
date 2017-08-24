import vCollapse from '../_components/collapse/collapse.vue'
const components = [
    vCollapse
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vCollapse;
export {
    vCollapse
}