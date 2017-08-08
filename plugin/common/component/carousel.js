import vCarousel from '../_component/carousel/carousel.vue'
const components = [
    vCarousel
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vCarousel;
export {
    vCarousel
}