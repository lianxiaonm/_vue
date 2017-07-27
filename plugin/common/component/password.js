import vPassword from '../_component/password/password.vue'
import vPasswordSuite from '../_component/password/password.suite.vue'

const components = [
    vPassword,
    vPasswordSuite
]
components.forEach(component => {
    component.install = Vue => Vue.component(component.name, component);
})

export default vPassword;
export {
    vPassword,
    vPasswordSuite
}