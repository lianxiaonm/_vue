import password from '../_component/password/password.vue'
import passwordSuite from '../_component/password/password.suite.vue'
import passwordModal from '../_component/password/password.modal.vue'

const components = [
    password,
    passwordSuite,
    passwordModal
]
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
})

export default password;
export {
    password,
    passwordSuite,
    passwordModal
}