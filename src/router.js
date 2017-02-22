/**
 * Created by wangzhiduo on 2016/12/30.
 */

export default [
  {
    path: '/',
    redirect: {
      name: 'index'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['./views/home/index.vue'], resolve)
  },
  {
    path: '/talks',
    name: 'talks',
    component: resolve => require(['./views/talks/talks.vue'], resolve)
  },
  {
    path: '/loveMark',
    name: 'loveMark',
    component: resolve => require(['./views/talks/loveMark.vue'], resolve)
  },
  {
    path: '/loveDetail',
    name: 'loveDetail',
    component: resolve => require(['./views/talks/loveDetail.vue'], resolve)
  },
  {
    path: '/loveIssue',
    name: 'loveIssue',
    component: resolve => require(['./views/talks/loveIssue.vue'], resolve)
  },
  {
    path: '/messageWall',
    name: 'messageWall',
    component: resolve => require(['./views/talks/messageWall.vue'], resolve)
  },
  {
    path: '/me',
    name: 'me',
    component: resolve => require(['./views/me/me.vue'], resolve)
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['./views/login/login.vue'], resolve)
  },
  {
    path: '/register',
    name: 'register',
    component: resolve => require(['./views/register/register.vue'], resolve)
  },
  {
    path: '/scenery',
    name: 'scenery',
    component: resolve => require(['./views/home/scenery.vue'], resolve)
  },
  {
    path: '/cate',
    name: 'cate',
    component: resolve => require(['./views/home/cate.vue'], resolve)
  },
  {
    path: '/cateDetail',
    name: 'cateDetail',
    component: resolve => require(['./views/home/cateDetail.vue'], resolve)
  },
  {
    path: '/sellerDetail',
    name: 'sellerDetail',
    component: resolve => require(['./views/home/sellerDetail.vue'], resolve)
  },
  {
    path: '/travel',
    name: 'travel',
    component: resolve => require(['./views/home/travel.vue'], resolve)
  },
  {
    path: '/travelDetail',
    name: 'travelDetail',
    component: resolve => require(['./views/home/travelDetail.vue'], resolve)
  },
  {
    path: '/hotel',
    name: 'hotel',
    component: resolve => require(['./views/home/hotel.vue'], resolve)
  },
  {
    path: '/hotelDetail',
    name: 'hotelDetail',
    component: resolve => require(['./views/home/hotelDetail.vue'], resolve)
  },
  {
    path: '/roomDetail',
    name: 'roomDetail',
    component: resolve => require(['./views/home/roomDetail.vue'], resolve)
  },
  {
    path: '/product',
    name: 'product',
    component: resolve => require(['./views/home/product.vue'], resolve)
  },
  {
    path: '/scenery/sceneryDetail',
    name: 'sceneryDetail',
    component: resolve => require(['./views/home/sceneryDetail.vue'], resolve)
  },
  {
    path: '/foodDetail',
    name: 'foodDetail',
    component: resolve => require(['./views/home/foodDetail.vue'], resolve)
  },
  {
    path: '/sureOrder',
    name: 'sureOrder',
    component: resolve => require(['./views/order/sureOrder.vue'], resolve)
  },
  {
    path: '/order',
    name: 'order',
    component: resolve => require(['./views/order/order.vue'], resolve)
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: resolve => require(['./views/order/orderDetail.vue'], resolve)
  },
  {
    path: '/refundApply',
    name: 'refundApply',
    component: resolve => require(['./views/order/refundApply.vue'], resolve)
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: resolve => require(['./views/order/coupon.vue'], resolve)
  },
  {
    path: '/payMent',
    name: 'payMent',
    component: resolve => require(['./views/order/payMent.vue'], resolve)
  },
  {
    path: '/paySucceed',
    name: 'paySucceed',
    component: resolve => require(['./views/order/paySucceed.vue'], resolve)
  },
  {
    path: '/evaluateList',
    name: 'evaluateList',
    component: resolve => require(['./views/order/evaluateList.vue'], resolve)
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: resolve => require(['./views/order/evaluate.vue'], resolve)
  },
  {
    path: '/userSet',
    name: 'userSet',
    component: resolve => require(['./views/me/userSet.vue'], resolve)
  },
  {
    path: '/myCollect',
    name: 'myCollect',
    component: resolve => require(['./views/me/myCollect.vue'], resolve)
  },
  {
    path: '/editeMobile',
    name: 'editeMobile',
    component: resolve => require(['./views/me/editeMobile.vue'], resolve)
  },
  {
    path: '/editeMobile2',
    name: 'editeMobile2',
    component: resolve => require(['./views/me/editeMobile2.vue'], resolve)
  },
  {
    path: '/editePsw',
    name: 'editePsw',
    component: resolve => require(['./views/me/editePsw.vue'], resolve)
  },
  {
    path: '/editeName',
    name: 'editeName',
    component: resolve => require(['./views/me/editeName.vue'], resolve)
  },
  {
    path: '/findPsw',
    name: 'findPsw',
    component: resolve => require(['./views/me/findPsw.vue'], resolve)
  },
  {
    path: '/findPsw2',
    name: 'findPsw2',
    component: resolve => require(['./views/me/findPsw2.vue'], resolve)
  }


]
