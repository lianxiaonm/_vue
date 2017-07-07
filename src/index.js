import Vue from 'vue'

import index from './page/index'
Vue.use(index)

import '../plugin/common/less/layout.less'
import '../plugin/common/less/form.less'

var app = new Vue({
    render: h => h('index')
}).$mount('#app');
