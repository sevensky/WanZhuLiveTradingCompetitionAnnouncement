import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import config from './config'
import './styles/index.scss'

// 添加这行来查看当前环境变量
console.log('当前API地址:', process.env.VUE_APP_API_BASE_URL)
console.log('当前API路径:', process.env.VUE_APP_API_PATH)

Vue.config.productionTip = false

// 配置axios
axios.defaults.baseURL = config.apiBaseURL
Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app') 