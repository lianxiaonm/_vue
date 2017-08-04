import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    require('../routers/indexRouter').default,
    require('../routers/dialogRouter').default,
    require('../routers/iconRouter').default,
    require('../routers/keyboardRouter').default,
    require('../routers/formRouter').default,
    require('../routers/passwordRouter').default,
    require('../routers/collapseRouter').default,
    require('../routers/filterRouter').default

]

export default new VueRouter({
    routes
})