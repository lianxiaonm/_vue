import Vue from 'vue'
import VueRouter from 'vue-router'
import { routeConfig } from '../../plugin/common/services/common'

Vue.use(VueRouter);

const routes = [
	require('../routers/indexRouter').default,
	require('../routers/dialogRouter').default,
	require('../routers/iconRouter').default,
	require('../routers/keyboardRouter').default,
	require('../routers/formRouter').default,
	require('../routers/passwordRouter').default,
	require('../routers/collapseRouter').default,
	require('../routers/filterRouter').default,
	require('../routers/tabsRouter').default,
	require('../routers/carouselRouter').default,
	require('../routers/stepRouter').default,
	require('../routers/pickerRouter').default
]

export default routeConfig(new VueRouter({routes}));