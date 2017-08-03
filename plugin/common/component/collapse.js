import vCollapse from '../_component/collapse/collapse.vue'
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