<template>
    <div id="sellerDetail">
        <myHeader title="详情" backUrl=""></myHeader>
        <div class="content">
            <div style="height: 180px;">
              <mt-swipe>
                <mt-swipe-item v-for="item in supplierInfo.imgList"><img :src=item height="100%" width="100%"></mt-swipe-item>
              </mt-swipe>
            </div>
            <p>{{supplierInfo.storeName}}<mt-button type="default" @click="toBuy" >优惠买单</mt-button></p>
            <!--<i class="am-icon-phone-square am-icon-sm"></i>-->
            <p><i class="am-icon-location-arrow"></i>{{supplierInfo.address}}<a :href="'tel:'+supplierInfo.mobile"><i class="am-icon-phone-square am-icon-sm"></i></a></p>
            <p class="fs12 time">营业时间：{{supplierInfo.openTime}}-{{supplierInfo.closeTime}} <span class="am-fr">人均消费：<i>{{supplierInfo.spendPer}}</i>元/人</span></p>
            <mt-cell class="bb-1px" title="查看全部点评" :to="{ name: 'evaluateList', query: { id: supplierInfo.supplierId }}" is-link></mt-cell>
            <div class="commodity">
                <div class="title"><div>店内商品</div></div>
                <div class="content2" @click="toDetail(items.productId)" v-for="items in lineList">
                    <p class="title2">{{items.productName}}<span class="c-red am-fr">{{items.price1}}元</span></p>
                    <img :src=items.bigProductImg[0] height="110px" width="100%">
                    
                </div>
                <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
            </div>
        </div>
        <span class="collect" @click="collect(supplierInfo.supplierId)"><i :class="[isCollected ? 'am-icon-heart' : 'am-icon-heart-o' ]"></i></span>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import { Indicator,Toast } from 'mint-ui'
  import api from 'api/api'
  export default {
    data() {
      return {
        selected: '1',
        supplierInfo: '',
        isCollected: '',
        lineList: '',
        sid: '',
        loadStatus: false,
        page: 1
      }
    },
    components: {
      myHeader,
    },
    computed() {
       
    },
    methods: {
      toBuy() {
        this.$router.push({name: 'payMent', params: {id2: this.supplierInfo.supplierId, dis: this.supplierInfo.productDiscount}})
      },
      toDetail(id) {
        this.$router.push({ name: 'foodDetail', query: { id: id,dis: this.supplierInfo.productDiscount}})
      },
      fetchData() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/supplierInfo.htm',{supplierId: self.$route.query.id,saleType: 'O2O',pageNumber: self.page}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            self.supplierInfo = data.info
            if(self.page>1){
              self.lineList = self.lineList.concat(data.info.producList)
            }else{
              self.lineList = data.info.producList
            }
            if(data.info.producList.length == 10){
              self.loadStatus = true
            }
            if(self.page >= data.totalPage){
              self.loadStatus = false
            }
            
            if(data.info.isCollected == 0) {
              self.isCollected = false
            }else{
              self.isCollected = true
            }
          }else{
            Toast(data.message)
          }
        })
      },
      collect(supplierId) {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/collect.htm',{supplierId: supplierId}).then(function(data){
          Indicator.close()
          Toast(data.message)
          if (data.code == 1) {


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
    #sellerDetail{
        label{margin-bottom: 0;}
        .c-blue{color: #00a0e9;}
        .c-orange{color: #eb6100;}
        .c-green{color: #2ecc71;}
        .c-666{color: #666;}
        .old-price{color: #666; text-decoration: line-through; font-size: 10px;}
        background-color: #f6f6f6;
        padding: 40px 0 0 0;
    .content{
        p{
            background-color: #fff;
            margin: 0;
            padding: 10px;
            border-bottom: 1px solid #eee;
            line-height: 25px;
            .am-icon-location-arrow{
                color: #a51612;
                margin-right: 5px;
            }
            .am-icon-phone-square{
                color: #a51612;
                float: right;
                margin-right: 5px;
                border-left: 1px solid #eee;
                padding-left: 20px;
            }
            &.time{
                border-bottom: 0px;
                i{font-size: 16px; color: #eb6100}
            }

        }
        .mint-navbar{
            .mint-tab-item{
                font-size: 14px;
                color: #333;
            &.is-selected{
                 color: #a51612 !important;
                 border-bottom-color: #a51612;
             }
            }
        }
        .mint-navbar{
            padding: 0 10px;
        }
        .commodity{
            margin-top: 10px;
            background-color: #fff;
            .title{
                padding: 10px;
                border-bottom: 1px solid #eee;
                div{
                    color: #a51612;
                    font-size: 13px;
                    border-left: 2px solid #a51612;
                    text-indent: 5px;
                    margin: 0;
                }

            }
            .detail{
                padding: 5px;
            }
            .content{
                margin: 10px;
            }
        }
        .mint-button--default{
            background-color: #fea101;
            color: #fff;
            width: 70px;
            height: 30px;
            float: right;
            font-size: 12px;
            padding: 0;
        }
        .commodity .content2{
            margin: 10px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            .title2{
                margin:  0;
                padding: 0 5px; 
                border-bottom: 0px;
                img{
                    margin-top: -4px;
                }
            }
        }
        }
        .collect{
          position: absolute;
          top: 6px;
          right: 15px;
          z-index: 2;
          color: #a51612;
        }
    }
</style>
