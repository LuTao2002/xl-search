import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import axios from "axios"
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
