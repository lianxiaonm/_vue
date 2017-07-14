import password from '../_component/password/password.vue'
import passwordModal from '../_component/password/password.modal.vue'

const components = [
    password,
    passwordModal
]
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
})

export default password;
export {
    password, passwordModal
}