import password from '../_component/password.vue'

password.install = Vue => {
    Vue.component(password.name, password);
}
export default password;