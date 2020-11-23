import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//css
import '@/assets/scss/main.scss'

//Global vars
Vue.prototype.$apiUrl = 'https://obscure-sands-68445.herokuapp.com/api'
Vue.prototype.$axios = axios

import VueAlertify from 'vue-alertify';
Vue.use(VueAlertify, {
  // notifier defaults
  notifier: {
    // auto-dismiss wait time (in seconds)
    delay: 5,
    // default position
    position: 'top-right',
    // adds a close button to notifier messages
    closeButton: false,
  },
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
