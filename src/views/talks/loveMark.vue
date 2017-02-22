<template>
    <div id="loveMark">
        <myHeader title="爱的印记" backUrl=""></myHeader>
        <div class="content" @click="toDetail(loveList.id)" v-for="loveList in loveList">
            <img :src=loveList.image height="110px" width="100%">
            <p class="title">{{loveList.boy}}+{{loveList.girl}}的爱情见证<span class="am-fr c-666">{{loveList.day}}</span></p>
        </div>
        <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
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
        loveList: '',
        loadStatus: false,
        page: 1
      }
    },
    methods: {
      toDetail(id) {
        this.$router.push({ name: 'loveDetail', query:{id: id}})
      },
      toIssue() {
        this.$router.push({ name: 'loveIssue'})
      },
      fetchData() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/messageLoveWallList.htm',{pageNumber: self.page}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            if(self.page>1){
              self.loveList = self.loveList.concat(data.list)
            }else{
              self.loveList = data.list
            }
            if(data.list.length == 10){
              self.loadStatus = true
            }
            if(self.page >= data.totalPage){
              self.loadStatus = false
            }
            
          }else{
            Toast(data.message)
          }
        })
      },
      loadMore() {
        this.page++
        this.fetchData()
      }
    },
    mounted() {
      this.fetchData()
    }
  }
</script>

<style lang="less">
    #loveMark{
      background-color: #f6f6f6;
      overflow: hidden;
      min-height: 560px;
      padding: 40px 0 60px 0;
      label{ margin-bottom: 0; }
      .c-orange{
        color: #eb6100;
      }
      .content{
        margin: 10px;
        padding: 5px;
        background-color: #fff;
        .title{
          margin: 5px 0;
          font-size: 14px;
          color: #333;
          img{
            margin-top: -4px;
          }
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
