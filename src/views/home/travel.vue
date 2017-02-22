<template>
    <div id="travel">
        <myHeader title="畅游诗橙" backUrl="index"></myHeader>
        <div class="content" @click="toDetail(items.productId)" v-for="items in lineList">
            <img :src=items.bigProductImg[0] height="110px" width="100%">
            <p class="title">{{items.productName}}</p>
            <p class="am-margin-0 detail fs10 c-666">{{items.groupBuyDetail}}</p>
        </div>
        <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
        <myFooter></myFooter>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import myFooter from 'components/footer'
  import { Indicator,Toast } from 'mint-ui'
  import api from 'api/api'
  export default {
    components: {
      myHeader,
      myFooter
    },
    data() {
      return {
        lineList: '',
        loadStatus: false,
        page: 1
      }
    },
    methods: {
      toDetail(id) {
        this.$router.push({ name: 'travelDetail', query: { id: id }})
      },
      fetchData() {
        self = this
        Indicator.open('加载中...');
        api.postData('/app/lineList.htm',{pageNumber: self.page}).then((data) =>{
          Indicator.close()
          if (data.code == 1) {
            if(self.page>1){
                self.lineList = self.lineList.concat(data.list)
            }else{
                self.lineList = data.list
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
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
  }
</script>

<style lang="less">
    #travel{
      background-color: #f6f6f6;
      overflow: hidden;
      min-height: 560px;
      padding: 50px 0;
      .c-666{ color: #666; }
      .fs10{ font-size: 10px;}
      .content{
        margin: 10px;
        padding: 5px;
        background-color: #fff;
        .title{
          margin: 5px 0;
          img{
            margin-top: -4px;
          }
        }
        .detail{
          max-height: 56px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
      }
    }
</style>
