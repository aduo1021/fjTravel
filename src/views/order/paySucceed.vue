<template>
    <div id="payMent">
      <myHeader title="支付成功" backUrl="order"></myHeader>
      <div class="content">
        <div class="message">
          <div style="color: #7DC827;" class="am-margin-top-lg"><i class="am-icon-check-circle am-margin-right-xs"></i>订单支付成功!</div>
          <div class="fs12 am-margin-top-sm">支付方式：在线支付</div>
          <div class="fs12 am-margin-bottom-sm">订单金额：&yen;228</div>
        </div>
        <mt-button size="large" @click="toOrder" >查看订单</mt-button>
        <mt-button size="large" @click="toIndex" type="default" class="toOrder" plain>返回首页</mt-button>
      </div>
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
      methods: {
        toOrder() {
          this.$router.push('order')
        },
        toIndex() {
          this.$router.push('index')
        },
      }
    }
</script>

<style lang="less">
    #payMent{
      background-color: #f6f6f6;
      padding-top: 40px;

      label{margin-bottom: 0px}
      .content{
        background-color: #fff;
        margin-top: 10px;
        overflow: hidden;
        .message{
          width: 140px;
          margin: 20px auto;
          text-align: left;
          display: flex;
          flex-direction: column;
        }
      }
      .mint-button--large{
        margin: 40px 10px 0px 10px;
        width: 94%;
        background-color: #a51612;
        border-color: #a51612;
        color: #fff;
        &.toOrder{
          background-color: #fff;
          color: #a51612;
          border-color: #a51612;
          margin-top: 20px;
         }
      }
    }
</style>
