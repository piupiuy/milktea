
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 导入$http并挂载
import {$http} from '@escook/request-miniprogram'
wx.$http=$http
uni.$http=$http

// // 导入路由
// import router from './pages/router/index'

// 配置根路径
$http.baseUrl='http://localhost:3007'

// 请求拦截器
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
}
// 响应拦截器
$http.afterRequest=function(options){
	uni.hideLoading()
}

// 创建事件总线
export const eventBus = new Vue()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
	
  }
}
// #endif