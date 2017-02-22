<template>
    <div id="cate">
        <myHeader title="精品酒店" backUrl="index"></myHeader>
        <div class="content" v-for="items in supplierList" @click="toDetail(items.supplierId)">
            <img :src=items.merchantPicPath1 :title=items.storeName height="110px" width="100%">
            <p class="title">{{items.storeName}}<span class="am-fr"><i class="c-orange">&yen;{{items.spendPer}}</i>起</span></p>
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
    data() {
      return {
        supplierList: '',
        loadStatus: false,
        page: 1
      }
    },
    components: {
      myHeader,
      myFooter
    },
    methods: {
      toDetail(id) {
        this.$router.push({ name: 'hotelDetail', query: { id: id }})
      },
      getFetch() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/supplierList.htm',{recommend: 'YES', saleType: 'HOTELS',pageNember: self.page}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            if(self.page>1){
                self.supplierList = self.supplierList.concat(data.list)
            }else{
                self.supplierList = data.list
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
      this.getFetch();
    }
  }
</script>

<style lang="less">
    #cate{
      background-color: #f6f6f6;
      overflow: hidden;
      min-height: 560px;
      padding: 50px 0;
      .c-orange{
        color: #eb6100;
      }
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
      }
    }
</style>
