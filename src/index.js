import Vue from 'vue'

import router from './config/router'

import '../plugin/common/less/layout.less'
import '../plugin/common/less/form.less'

var app = new Vue({
    router,
    render: h => h('router-view')
}).$mount('#app');
