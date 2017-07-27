import vPage from '../_component/page.vue'
import vHead from '../_component/header/head.vue'
import vScroll from '../_component/scroll/scroll.vue'

const components = [
    vPage,
    vHead,
    vScroll
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vPage;
export {
    vPage,
    vHead,
    vScroll
}
