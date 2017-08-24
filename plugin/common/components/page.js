import vPage from '../_components/page.vue'
import vPageStatic from '../_components/page.static.vue'
import vHead from '../_components/header/head.vue'
import vScroll from '../_components/scroll/scroll.vue'

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
