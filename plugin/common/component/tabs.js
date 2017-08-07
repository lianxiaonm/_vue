import vTabs from '../_component/tab/tabs.vue'
import vTabPanel from '../_component/tab/tabPanel.vue'
const components = [
    vTabs,
    vTabPanel
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vTabs;
export {
    vTabs,
    vTabPanel
}