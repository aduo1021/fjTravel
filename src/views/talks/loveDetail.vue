<template>
    <div id="loveDetail">
        <myHeader title="爱的印记" backUrl=""></myHeader>
        <div class="content">
            <img src="../../assets/me-banner.jpg" height="170px" width="100%">
            <p class="title">{{loveInfo.boy}}+{{loveInfo.girl}}的爱情见证<div class="am-fr am-margin-right-xs c-666">{{loveInfo.day}}</div></p>
            <div class="detail">
              <img src="../../assets/icon-love.png" width="22px" height="15px">
              <div class="name">心语星愿</div>
              <div class="divide"></div>
            </div>
            <div class="worlds">
              {{loveInfo.message}}
            </div>
        </div>
        <div class="footer">
          <mt-button size="large" @click="toIssue">我也要晒</mt-button>
        </div>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import {Indicator,Toast} from 'mint-ui'
  import api from 'api/api'
  export default {
    components: {
      myHeader,
    },
    data() {
      return {
        loveInfo: ''
      }
    },
    methods: {
      toIssue() {
        this.$router.push({ name: 'loveIssue'})
      },
      fetchData() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/messageLoveWallInfo.htm',{id: self.$route.query.id}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            self.loveInfo = data.info
          }else{
            Toast(data.message)
            self.$router.back();
          }
        })
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style lang="less">
    #loveDetail{
      background-color: #f6f6f6;
      overflow: hidden;
      min-height: 560px;
      padding: 40px 0 60px 0;
      label{ margin-bottom: 0; }
      .c-orange{
        color: #eb6100;
      }
      .content{
        .title{
          margin: 10px 5px;
          img{
            margin-top: -4px;
          }
        }
        .detail{
          display: flex;
          align-items: center;
          padding: 0 10px;
          width: 100%;
          .divide{
            border: 1px solid #eee;
            width: 100%;
            height: 1px;
          }
          .name{
            color: #a51612;
            width: 110px;
          }
        }
        .worlds{
          padding: 10px 15px;
          color: #a51612;
        }
      }
      .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        background-color: #fff;
      }
      .mint-button--large{
        width: 94%;
        margin: 10px;
        background-color: #a51612;
        color: #fff;
        font-weight: normal;
      }
    }
</style>
