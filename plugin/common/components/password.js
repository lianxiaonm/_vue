import vPassword from '../_components/password/password.vue'
import vPasswordSuite from '../_components/password/password.suite.vue'
import vPasswordModal from '../_components/password/password.modal.vue'

const components = [
    vPassword,
    vPasswordSuite,
    vPasswordModal
]
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
})

export default vPassword;
export {
    vPassword,
    vPasswordSuite,
    vPasswordModal
}