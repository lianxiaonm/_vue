import vOtp from '../_components/otp/otp.vue'
const components = [
    vOtp
];
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
});
export default vOtp;
export {
    vOtp
}