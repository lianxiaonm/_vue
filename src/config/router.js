import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    require('../routers/indexRouter').default,
    require('../routers/dialogRouter').default,
    require('../routers/iconRouter').default,
    require('../routers/keyboardRouter').default
]

export default new VueRouter({
    routes
})