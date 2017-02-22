<template>
    <div id="coupon">
      <myHeader title="查看卷码" backUrl="order"></myHeader>
      <div class="content">
        <div class="cont-top">
          <img src="../../assets/me-banner.jpg" width="50px" height="50px" >
          <div class="title">
            <p class="am-margin-0 fs12 name">{{orderDetail.productName}}</p>
            <p class="am-margin-0 fs10 c-999">{{orderDetail.createTime}}</p>
          </div>
        </div>
        <p>密码：{{psw}}</p>
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
      data() {
        return {
          orderDetail: '',
          psw: ''
        }
      },
      methods: {
        getFetch() {
          let self = this
          Indicator.open('加载中...');
          api.postData('/app/orderDetail.htm',{id: this.$route.query.id}).then(function(data){
            if (data.code == 1) {
              self.orderDetail = data.info

            }else{
              Toast(data.message)
            }
          })
          api.postData('/app/makeQrCode.htm',{id: this.$route.query.id}).then(function(data){
            Indicator.close()
            if (data.code == 1) {
              self.psw = data.qrCode
            }else{
              Toast(data.message)
            }
          })
        },
        toIndex() {
          this.$router.push('index')
        },
      },
      mounted() {
        this.getFetch();
      }
    }
</script>

<style lang="less">
    #coupon{
      background-color: #f6f6f6;
      padding-top: 40px;

      label{margin-bottom: 0px}
      .content{
        padding: 10px;
        background-color: #fff;
        margin-top: 10px;
        overflow: hidden;
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
