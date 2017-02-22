<template>
    <div id="messageWall">
        <myHeader title="到此一游" backUrl=""></myHeader>
        <div class="content" @click="toDetail(loveList.id)" v-for="loveList in loveList">
            <p class="title">{{loveList.title}}<span class="am-fr c-666">{{loveList.day}}</span></p>
        </div>
        <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
        <div class="footer">
          <mt-field label="" v-model="messages" placeholder="输入不超过10个字内容" :attr="{ maxlength: 10 }"></mt-field>
          <mt-button size="normal" @click="toIssue">发表留言</mt-button>
        </div>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import {Indicator,Toast,MessageBox} from 'mint-ui'
  import api from 'api/api'
  export default {
    components: {
      myHeader,
    },
    data() {
      return {
        loveList: '',
        messages: '',
        loadStatus: false,
        page: 1
      }
    },
    methods: {
      toIssue() {
        let self = this
        if(!self.messages) {
          Toast('请输入文字内容！')
          return false
        }
        Indicator.open('加载中...');
        api.postData('/app/addMessageWall.htm',{title: self.messages}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            self.fetchData()
          }else{
            MessageBox.alert(data.message).then((action) => {
              self.$router.push('login');
            });
          }
        })
      },
      fetchData() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/messageWallList.htm',{pageNumber: self.page}).then(function(data){
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
    #messageWall{
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
          color: #a51612;
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        .mint-button--normal{
          background-color: #a51612;
          color: #fff;
          font-weight: normal;
          font-size: 14px;
        }
        .mint-cell{flex: 1}
      }

    }
</style>
