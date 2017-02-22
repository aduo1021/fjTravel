<template>
    <div id="evaluateList">
      <myHeader title="评价列表" backUrl=""></myHeader>
      <div class="content">
        <div class="evaluate">
          <p>好评率：</p>
          <div class="list" v-for="items in evaList">
            <div class="name">{{items.userName}}<i class="am-icon-star" v-for="a in parseInt(items.score)"></i></div>
            <div class="content am-padding-vertical-xs">{{items.PComment}}</div>
            <!--<div class="time">时间：{{items.createTime}}<span class="am-fr"><i class="am-icon-thumbs-up"></i>有用({{items.likeCount}})</span></div>-->
            <div class="time">时间：{{items.createTime}}<span class="am-fr"></div>
          </div>
          <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
        </div>
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
          evaList: '',
          loadStatus: false,
          page: 1
        }
      },
      methods: {
        fetchData() {
          self = this
          Indicator.open('加载中...');
          api.postData('/app/pingjia.htm',{ supplierId: self.$route.query.id, discussType: 'all',pageNumber: self.page}).then((data) =>{
            Indicator.close()
            if (data.code == 1) {
              self.evaList = data.list
              if(self.page>1){
                self.evaList = self.evaList.concat(data.list)
              }else{
                  self.evaList = data.list
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
        this.fetchData();
      }
    }
</script>

<style lang="less">
    #evaluateList{
      background-color: #f6f6f6;
      padding-top: 40px;
      .content{
        background-color: #fff;
        .evaluate{
          p{
            background-color: #fff;
            margin: 0;
            padding: 10px;
            border-bottom: 1px solid #eee;
            line-height: 25px;
          }
          background-color: #fff;
          .list{
            padding: 10px;
            border-bottom: 1px solid #eee;
          .time{
            color: #666;
            font-size:10px;
          }
          .name{
            i{color: #f46a0a;}
          }
          }
        }
      }
    }
</style>
