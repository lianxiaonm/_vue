import vTabs from '../_components/tab/tabs.vue'
import vTabPanel from '../_components/tab/tabPanel.vue'
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