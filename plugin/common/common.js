/**
 * Created by h5 on 2017/7/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './component/page'       //页面
import './component/dialog'     //dialog
import './component/form'       //表单
import './component/password'   //密码
import './component/carousel'   //轮播
import './component/filter'     //筛选
import './less/layout.less'

import './service/http' //http请求

Vue.use(VueRouter);
Vue.use(Vuex);
