import Vue from 'vue'

import router from './config/router'

import './style/less/index.less'

var app = new Vue({
    router,
    render: h => h('router-view')
}).$mount('#app');
