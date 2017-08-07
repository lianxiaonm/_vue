import vPage from '../_component/page.vue'
import vPageStatic from '../_component/page.static.vue'
import vHead from '../_component/header/head.vue'
import vScroll from '../_component/scroll/scroll.vue'

const components = [
    vPage,
    vPageStatic,
    vHead,
    vScroll
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vPage;
export {
    vPage,
    vPageStatic,
    vHead,
    vScroll
}
