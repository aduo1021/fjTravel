<template>
    <div id="order">
    	<myHeader :title=title backUrl="me"></myHeader>
      <div class="content" >
        <mt-navbar  v-model="selected">
          <mt-tab-item id="1">全部</mt-tab-item>
          <mt-tab-item id="2">待付款</mt-tab-item>
          <mt-tab-item id="3">待使用</mt-tab-item>
          <mt-tab-item id="4">已完成</mt-tab-item>
          <mt-tab-item id="5">退款单</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1" >
            <div class="order-list" v-for="orderList in orderList" >
              <div class="cont-top" @click="toDetail(orderList.id)">
                <img  :src=orderList.picPath  width="50px" height="50px" >
                <!--<img v-else src="../../assets/piao.png"  width="50px" height="50px" >-->
                <div class="title">
                  <p class="am-margin-0 fs12 name" v-if="orderList.isShop == 'YES'">{{orderList.productName}}</p>
                  <p class="am-margin-0 fs12 name" v-if="orderList.isShop == 'NO'">{{orderList.supplierName}}</p>
                  <p class="am-margin-0 fs10 c-999">{{orderList.createTime}}</p>
                </div>
              </div>
              <div class="cont-mid bb-1px">
                <p class="am-margin-vertical-sm">共{{orderList.quantity}}件<span class="am-fr">订单金额：<span class="c-orange">&yen;{{orderList.totalAmount}}</span></span></p>
              </div>
              <div class="cont-bot">
                <p class="am-margin-vertical-sm am-margin-bottom-0">订单状态：<span v-if="!orderList.refundStatus" class="c-orange">{{orderList.orderStatus | status}}</span><span v-else class="c-orange">{{orderList.refundStatus | status}}</span>
                  <mt-button v-if="orderList.orderStatus == 'WFK'" @click="payMent(orderList.id)">付款</mt-button><mt-button v-if="orderList.orderStatus == 'WFK'" @click="MessageBox(orderList.id)" plain>取消订单</mt-button>
                  <mt-button v-if="orderList.orderStatus == 'YFK' && orderList.refundStatus == ''" @click="reFundApply(orderList.id,orderList.payAmount,orderList.quantity,orderList.orderItemId)"  >申请退款</mt-button><mt-button v-if="orderList.orderStatus == 'YFK' && orderList.refundStatus == ''"  @click="toCoupon(orderList.id)"  plain>查看卷码</mt-button>
                  <mt-button v-if="orderList.orderStatus == 'JYC' && orderList.workflowStatus=='CONFIRMATION_OF_RECEIPT'" @click="toEvaluate(orderList.id)"  >评价</mt-button>
                </p>
              </div>
            </div>
            <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div class="order-list" v-for="WFK in WFK">
              <div class="cont-top" @click="toDetail(WFK.id)">
                <img :src=WFK.picPath width="50px" height="50px" >
                <div class="title">
                  <p class="am-margin-0 fs12 name" v-if="WFK.isShop == 'YES'">{{WFK.productName}}</p>
                  <p class="am-margin-0 fs12 name" v-if="WFK.isShop == 'NO'">{{WFK.supplierName}}</p>
                  <p class="am-margin-0 fs10 c-999">{{WFK.createTime}}</p>
                </div>
              </div>
              <div class="cont-mid bb-1px">
                <p class="am-margin-vertical-sm">共{{WFK.quantity}}件<span class="am-fr">订单金额：<span class="c-orange">&yen;{{WFK.totalAmount}}</span></span></p>
              </div>
              <div class="cont-bot">
                <p class="am-margin-vertical-sm am-margin-bottom-0">订单状态：<span class="c-orange">{{orderList.orderStatus | status}}</span><mt-button @click="payMent(WFK.id)"  >付款</mt-button><mt-button @click="MessageBox(WFK.id)" plain>取消订单</mt-button></p>
              </div>
            </div>
            <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus2" @click="loadMore2">点击加载更多</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div class="order-list" v-for="YFK in YFK">
              <div class="cont-top" @click="toDetail(YFK.id)">
                <img :src=YFK.picPath width="50px" height="50px" >
                <div class="title">
                  <p class="am-margin-0 fs12 name" v-if="YFK.isShop == 'YES'">{{YFK.productName}}</p>
                  <p class="am-margin-0 fs12 name" v-if="YFK.isShop == 'NO'">{{YFK.supplierName}}</p>
                  <p class="am-margin-0 fs10 c-999">{{YFK.createTime}}</p>
                </div>
              </div>
              <div class="cont-mid bb-1px">
                <p class="am-margin-vertical-sm">共{{YFK.quantity}}件<span class="am-fr">订单金额：<span class="c-orange">&yen;{{YFK.totalAmount}}</span></span></p>
              </div>
              <div class="cont-bot">
                <p class="am-margin-vertical-sm am-margin-bottom-0">订单状态：<span class="c-orange">{{YFK.orderStatus | status}}</span><mt-button @click="reFundApply(YFK.id,YFK.payAmount,YFK.quantity,YFK.orderItemId)"  >申请退款</mt-button><mt-button @click="toCoupon(YFK.id)"  plain>查看卷码</mt-button></p>
              </div>
            </div>
            <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus3" @click="loadMore3">点击加载更多</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <div class="order-list" v-for="JYC in JYC">
              <div class="cont-top" @click="toDetail(JYC.id)">
                <img :src=JYC.picPath width="50px" height="50px" >
                <div class="title">
                  <p class="am-margin-0 fs12 name" v-if="JYC.isShop == 'YES'">{{JYC.productName}}</p>
                  <p class="am-margin-0 fs12 name" v-if="JYC.isShop == 'NO'">{{JYC.supplierName}}</p>
                  <p class="am-margin-0 fs10 c-999">{{JYC.createTime}}</p>
                </div>
              </div>
              <div class="cont-mid bb-1px">
                <p class="am-margin-vertical-sm">共{{JYC.quantity}}件<span class="am-fr">订单金额：<span class="c-orange">&yen;{{JYC.totalAmount}}</span></span></p>
              </div>
              <div class="cont-bot">
                <p class="am-margin-vertical-sm am-margin-bottom-0">订单状态：<span class="c-orange">{{JYC.orderStatus | status}}</span><mt-button v-if="JYC.workflowStatus=='CONFIRMATION_OF_RECEIPT'" @click="toEvaluate(JYC.id)"  >评价</mt-button></p>
              </div>
            </div>
            <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus4" @click="loadMore4">点击加载更多</p>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <div class="order-list" v-for="YQX in YQX">
              <div class="cont-top" @click="toDetail(YQX.id)">
                <img :src=YQX.picPath width="50px" height="50px" >
                <div class="title">
                  <p class="am-margin-0 fs12 name" v-if="YQX.isShop == 'YES'">{{YQX.productName}}</p>
                  <p class="am-margin-0 fs12 name" v-if="YQX.isShop == 'NO'">{{YQX.supplierName}}</p>
                  <p class="am-margin-0 fs10 c-999">{{YQX.createTime}}</p>
                </div>
              </div>
              <div class="cont-mid bb-1px">
                <p class="am-margin-vertical-sm">共{{YQX.quantity}}件<span class="am-fr">订单金额：<span class="c-orange">&yen;{{YQX.totalAmount}}</span></span></p>
              </div>
              <div class="cont-bot">
                <p class="am-margin-vertical-sm am-margin-bottom-0">订单状态：<span class="c-orange">{{YQX.refundStatus | status}}</span></p>
              </div>
            </div>
            <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus5" @click="loadMore5">点击加载更多</p>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <form name="myForm" id="myForm" class="form1" :action=url method="post">
        <input type="text" name="desc" :value=item.desc >
        <input type="text" name="inputCharset" :value=item.inputCharset >
        <input type="text" name="notifyUrl" :value=item.notifyUrl >
        <input type="text" name="orderNo" :value=item.orderNo >
        <input type="text" name="partnerId" :value=item.partnerId >
        <input type="text" name="payAmount" :value=item.payAmount >
        <input type="text" name="returnUrl" :value=item.returnUrl >
        <input type="text" name="service" :value=item.service >
        <input type="text" name="sign" :value=item.sign >
        <input type="text" name="signType" :value=item.signType >
        <input type="text" name="title" :value=item.title >
      </form>


    </div>
</template>

<script>
	import myHeader from 'components/header2'
  import axios from 'axios'
  import querystring from 'querystring'
  import { Indicator,Toast,MessageBox,InfiniteScroll } from 'mint-ui'
	import api from 'api/api'
  	export default {
  		components: {
          myHeader,
      },
      data() {
        return {
          orderList: '',
          selected: '1',
          title: '服务订单',
          WFK: '',
          YFK: '',
          JYC: '',
          YQX: '',
          YGB: '',
          url: '',
          item: '',
          page: 1,
          page2: 1,
          page3: 1,
          page4: 1,
          page5: 1,
          loadStatus: false,
          loadStatus2: false,
          loadStatus3: false,
          loadStatus4: false,
          loadStatus5: false,
        }
      },
      computed: {
        status: function() {
          let self = this;
          if(self.orderList.orderStatus == 'WFK'){
            return '待付款'
          }
        }
      },
      methods: {
        getFetch() {
          let self = this
          Indicator.open('加载中...');
          api.postData('/app/orderList.htm',{productVary: self.$route.query.type,orderType: self.$route.query.type2}).then(function(data){
            if (data.code == 1) {
              self.orderList = data.list
              if(data.list.length == 10){
                self.loadStatus = true
              }
              
            }else{
              Toast(data.message)
            }
          })
          api.postData('/app/orderList.htm',{orderStatus: 'WFK',productVary: self.$route.query.type,orderType: self.$route.query.type2}).then(function(data){
            if (data.code == 1) {
              self.WFK = data.list
              if(data.list.length == 10){
                self.loadStatus2 = true
              }
            }else{
              Toast(data.message)
            }
          })
          api.postData('/app/orderList.htm',{orderStatus: 'YFK',productVary: self.$route.query.type,orderType: self.$route.query.type2}).then(function(data){
            if (data.code == 1) {
              self.YFK = data.list
              if(data.list.length == 10){
                self.loadStatus3 = true
              }
            }else{
              Toast(data.message)
            }
          })
          api.postData('/app/orderList.htm',{orderStatus: 'JYC',productVary: self.$route.query.type,orderType: self.$route.query.type2}).then(function(data){
            if (data.code == 1) {
              self.JYC = data.list
              if(data.list.length == 10){
                self.loadStatus4 = true
              }
            }else{
              Toast(data.message)
            }
          })
          api.postData('/app/orderList.htm',{refundStatus : 'ALL',productVary: self.$route.query.type,orderType: self.$route.query.type2}).then(function(data){
            Indicator.close()
            if (data.code == 1) {
              self.YQX = data.list
              if(data.list.length == 10){
                self.loadStatus5 = true
              }
            }else{
              Toast(data.message)
            }
          })

        },
        payMent(id) {
          let self = this
          Indicator.open('加载中...');
          api.postData('/app/gotoPay.htm',{ids: id, payWay: 'WECHATS_PAY'}).then(function(data){
            Indicator.close()
            if (data.code == 1) {
              //self.toWeixin(data.url,data.map);
              self.url = data.url
              self.item = data.map
              self.$nextTick(function () {
                self.payAll()
              })
            }else{
              Toast(data.message)
            }
          })
        },
        toEvaluate(id) {
          let self = this
          self.$router.push({name: 'evaluate',query: {id: id}})
        },
        loadMore() {
            let self = this
            Indicator.open('加载中...');
            ++self.page
            api.postData('/app/orderList.htm',{productVary: self.$route.query.type,pageNumber: self.page,orderType: self.$route.query.type2}).then(function(data){
              Indicator.close()
              if (data.code == 1) {
                 self.orderList = self.orderList.concat(data.list)
                 if(self.page >= data.totalPage){
                    self.loadStatus = false
                 }
              }else{
                Toast(data.message)
              }
            })
        },
        loadMore2() {
            let self = this
            Indicator.open('加载中...');
            ++self.page2
            api.postData('/app/orderList.htm',{orderStatus: 'WFK',pageNumber: self.page2,productVary: self.$route.query.type,orderType: self.$route.query.type2}).then(function(data){
              Indicator.close()
              if (data.code == 1) {
                 self.WFK = self.WFK.concat(data.list)
                 if(self.page2 >= data.totalPage){
                    self.loadStatus2 = false
                 }
              }else{
                Toast(data.message)
              }
            })
        },
        loadMore3() {
            let self = this
            Indicator.open('加载中...');
            ++self.page3
            api.postData('/app/orderList.htm',{orderStatus: 'YFK',productVary: self.$route.query.type,pageNumber: self.page,orderType: self.$route.query.type2}).then(function(data){
              Indicator.close()
              if (data.code == 1) {
                 self.orderList = self.orderList.concat(data.list)
                 if(self.page3 >= data.totalPage){
                    self.loadStatus3 = false
                 }
              }else{
                Toast(data.message)
              }
            })
        },
        loadMore4() {
            let self = this
            Indicator.open('加载中...');
            ++self.page4
            api.postData('/app/orderList.htm',{orderStatus: 'JYC',productVary: self.$route.query.type,pageNumber: self.page,orderType: self.$route.query.type2}).then(function(data){
              Indicator.close()
              if (data.code == 1) {
                 self.orderList = self.orderList.concat(data.list)
                 if(self.page4 >= data.totalPage){
                    self.loadStatus4 = false
                 }
              }else{
                Toast(data.message)
              }
            })
        },
        loadMore5() {
            let self = this
            Indicator.open('加载中...');
            ++self.page5
            api.postData('/app/orderList.htm',{refundStatus : 'ALL',productVary: self.$route.query.type,pageNumber: self.page,orderType: self.$route.query.type2}).then(function(data){
              Indicator.close()
              if (data.code == 1) {
                 self.orderList = self.orderList.concat(data.list)
                 if(self.page5 >= data.totalPage){
                    self.loadStatus5 = false
                 }
              }else{
                Toast(data.message)
              }
            })
        },
        reFundApply(id,money,amount,productId) {
          this.$router.push({name: 'refundApply',params: {id: id,money: money,amount: amount,orderItemId: productId}})
        },
        payAll() {
          document.getElementById("myForm").submit();
        },
        toDetail(id) {
          this.$router.push({name: 'orderDetail',query: {id: id}})
        },
        toCoupon(id) {
          this.$router.push({name: 'coupon',query: {id: id}})
        },
        MessageBox(id) {
          MessageBox.confirm('确定要取消订单?').then(action => {
            this.cancleOrder(id)
          });
        },
        cancleOrder(id) {
          let self = this
          Indicator.open('加载中...');
          api.postData('/app/cancelOrder.htm',{id: id}).then(function(data){
            Indicator.close()
            Toast(data.message)
            if (data.code == 1) {
              self.getFetch()
            }
          })
        },
        deleteOrder(id) {
          let self = this
          Indicator.open('加载中...');
          api.postData('/app/cancelOrder.htm',{id: id}).then(function(data){
            Indicator.close()
            Toast(data.message)
            if (data.code == 1) {
              this.getFetch()
            }
          })
        }

      },
      mounted() {
        let self = this
        this.getFetch()
        if(self.$route.query.type == 'ticket'){
          self.title = '门票订单'
        }else if(self.$route.query.type == 'ticket'){

        }
      }
  }
</script>

<style lang="less">
	#order{
		background-color: #f6f6f6;
		padding-top: 40px;
    label{margin-bottom: 0;font-weight: normal}
    min-height: 570px;
    .form1{display: none;}
		.order-list{
			padding: 10px;
			background-color: #fff;
      margin-top: 10px;
			.cont-top{
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;
				padding-bottom: 10px;
				.title{
					margin-left: 5px;
					.name{min-height: 38px}
				}
			}
      .mint-button--default{
          background-color: #a51612;
          color: #fff;
          float: right;
          border-color: #a51612;
          width: 70px;
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          font-weight: normal;
          padding: 0;
          margin-left: 5px;
      }
      .mint-button--default.is-plain{
          color: #a51612;
          background-color: #fff;
      }
		}
    .mint-navbar{
      .mint-tab-item{
        font-size: 14px;
        color: #333;
        &.is-selected{
         color: #a51612 !important;
         border-bottom-color: #a51612;
        }
      }
    }
	}
</style>
