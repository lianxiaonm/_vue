/**
 * Created by h5 on 2017/7/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import './components/page'       //页面
import './components/dialog'     //dialog
import './components/form'       //表单
import './components/password'   //密码
import './components/carousel'   //轮播
import './components/filter'     //筛选
import './less/layout.less'

import './services/http' //http请求

Vue.use(VueRouter);
Vue.use(Vuex);
