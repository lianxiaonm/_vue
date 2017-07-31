import vPassword from '../_component/password/password.vue'
import vPasswordSuite from '../_component/password/password.suite.vue'
import vPasswordModal from '../_component/password/password.modal.vue'

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