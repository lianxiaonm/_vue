/**
 * Created by h5 on 2017/8/31.
 */
import vStep from '../_components/step/step.vue'
const components = [
    vStep
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vStep;
export {
    vStep
}