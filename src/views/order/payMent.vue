<template>
    <div id="payMent">
      <myHeader title="付款" backUrl=""></myHeader>
      <div class="content">
        <mt-field label="消费总额" v-model="money" placeholder="询问客服后输入" type="number"></mt-field>
        <mt-cell :title=discount :value=lastMoney></mt-cell>

      </div>
      <mt-button size="large" @click="payMent">确认付款</mt-button>
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
      components: {
        myHeader
      },
      data() {
        return {
          money: '',
          lastMoney: '',
          discount1: this.$route.params.dis,
          price: this.$route.params.money,
          url: '',
          item: '',
        }
      },
      computed: {
        discount: function() {
          return this.discount1+'折'
        }
      },
      methods: {
        payMent() {
          let self = this
          if(!self.money) {
            Toast('请输入消费金额')
            return false
          }
          Indicator.open('加载中...');
          api.postData('/app/shopOrScanPay.htm',{supplierId: self.$route.params.id2,payWay: 'WECHATS_PAY',counts: '1',amount: self.lastMoney, payType: 'PAY_TO_SHOP',returnUrl: encodeURIComponent(window.location.host+'/mobile/index.html#/order')}).then(function(data){
            Indicator.close()
            if (data.code == 1) {
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
        payAll() {
          document.getElementById("myForm").submit();
        },
      },
      watch: {
        money: function() {
          let self = this
          if(self.discount1 != 0){
            self.lastMoney = (self.discount1/10)*self.money
          }else{
            self.lastMoney = self.money
          }
         
        }
      
      },
    
      
    }
</script>

<style lang="less">
    #payMent{
      background-color: #f6f6f6;
      padding-top: 40px;
      min-height: 570px;
      .form1{display: none;}
      label{margin-bottom: 0px}
      .content{
        background-color: #fff;

      }
      .mint-button--large{
        margin: 40px 10px;
        width: 94%;
        background-color: #a51612;
        border-color: #a51612;
        color: #fff;
      }
      .mint-cell-text{
        color: #a51612;
      }
    }
</style>
