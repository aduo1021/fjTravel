// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import routes from './router'

Vue.use(VueRouter)
Vue.use(MintUI)
Vue.filter('status', function(value) {
  if(value == 'WFK'){
    return '待付款'
  }else if(value == 'YFK') {
    return '待使用'
  }else if(value == 'JYC') {
    return '交易完成'
  }else if(value == 'YQX') {
    return '订单已取消'
  }else if(value == 'REFUNDING') {
    return '退款中'
  }else if(value == 'REFUND_SUCCESS') {
    return '退款成功'
  }else if(value == 'REFUND_FAIL') {
    return '退款失败'
  }

})

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h=> h(App)
}).$mount('#app');

