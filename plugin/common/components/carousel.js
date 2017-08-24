import vCarousel from '../_components/carousel/carousel.vue'
import vCarouselBanner from '../_components/carousel/carousel.banner.vue'
const components = [
    vCarousel,
    vCarouselBanner
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vCarouselBanner;
export {
    vCarousel,
    vCarouselBanner
}