// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import {store} from './store/store'

Vue.prototype.$api = axios
//axios.defaults.baseURL = '/api/'
axios.defaults.baseURL = 'http://www.yushengxian.cn:8081/'
//Vue.prototype.HOST = '/api'
Vue.config.productionTip = false
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
