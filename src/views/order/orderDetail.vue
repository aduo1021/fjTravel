<template>
  <div id="orderDetail">
    <myHeader title="订单详情" backUrl="order"></myHeader>
    <div class="content am-padding-sm">
      <p>订单信息</p>
      <p>订单号：{{orderDetail.id}}</p>
      <p>订单状态：<span class="c-orange">{{orderDetail.orderStatus | status}}</span></p>
      <p>下单时间：{{orderDetail.createTime}}</p>
    </div>
    <!--<div class="refundDetail">
      退款详情
    </div>-->
    <div class="content">
      <div class="order-list">
        <div class="cont-top">
          <img :src=orderDetail.picPath width="50px" height="50px" >
          <div class="title">
            <p class="am-margin-0 fs12 name" v-if="orderDetail.isShop == 'YES'">{{orderDetail.productName}}</p>
            <p class="am-margin-0 fs12 name" v-if="orderDetail.isShop == 'NO'">{{orderDetail.supplierName}}</p>
          </div>
        </div>
        <div class="cont-mid bb-1px">
          <p class="am-margin-vertical-sm">共{{orderDetail.quantity}}件<span class="am-margin-left-xl">订单金额：<span class="c-orange">&yen;{{orderDetail.payAmount}}</span></span><mt-button v-if="orderDetail.orderStatus == 'WFK'" @click="payMent(orderDetail.id)">付款</mt-button></p>
        </div>


      </div>
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
  import { Indicator,Toast } from 'mint-ui'
  import api from 'api/api'
  export default {
    data() {
      return {
        orderDetail: '',
        url: '',
        item: '',
      }
    },
    components: {
      myHeader
    },
    methods: {
      payMent(id) {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/gotoPay.htm',{ids: id, payWay: 'WECHATS_PAY'}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            //self.toWeixin(data.url,data.map);
            self.url = data.url
            self.item = data.map
            console.log(self.item)
            self.$nextTick(function () {
              self.payAll()
            })
          }else{
            Toast(data.message)
          }
        })
      },
      payAll() {
          document.getElementById("myForm").submit();
      },
      getFetch() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/orderDetail.htm',{id: this.$route.query.id}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            self.orderDetail = data.info

          }else{
            Toast(data.message)
          }
        })
      }
    },
    mounted() {
      this.getFetch();
    }
  }
</script>

<style lang="less">
  #orderDetail{
    background-color: #f6f6f6;
    padding-top: 40px;
    min-height: 570px;
    label{margin-bottom: 0px}
    .form1{display: none;}
    .content {
      background-color: #fff;
      margin-top: 10px;
      overflow: hidden;
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
    }
    .refundDetail{
      border-top: 1px solid #eee;
      background-color: #fff;
      color: #999;
      text-align: center;
      padding: 10px 0px;
    }
    .order-list{
      padding: 10px 10px 0px 10px;
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
    }

  }
</style>
