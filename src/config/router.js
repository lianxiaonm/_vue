import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    require('../routers/indexRouter').default
]

export default new VueRouter({
    routes
})