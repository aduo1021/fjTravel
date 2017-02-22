<template>
    <div id="hotelDetail">
        <myHeader title="详情" backUrl=""></myHeader>
        <div class="content">
            <div style="height: 180px;">
              <mt-swipe>
                <mt-swipe-item v-for="item in supplierInfo.imgList"><img :src=item height="100%" width="100%"></mt-swipe-item>
              </mt-swipe>
            </div>
            <div class="theme">
                <div class="cont">
                    <div>{{supplierInfo.storeName}}</div>
                </div>

                <mt-button type="default" @click="toBuy" >优惠买单</mt-button>

            </div>
            <!--<i class="am-icon-phone-square am-icon-sm"></i>-->
            <p><i class="am-icon-location-arrow"></i>{{supplierInfo.address}}<a :href="'tel:'+supplierInfo.mobile"><i class="am-icon-phone-square am-icon-sm"></i></a></p>
            <p class="fs12 time">营业时间：{{supplierInfo.openTime}}-{{supplierInfo.closeTime}}</p>
            <mt-cell class="bb-1px" title="查看全部点评" :to="{ name: 'evaluateList', query: { id: supplierInfo.supplierId }}" is-link></mt-cell>
            <div class="commodity">
                <div class="title"><div>酒店介绍</div></div>
                <div class="content">
                    <div class="lineHide" :class="{'lineHides': zhankai}" @click="zhankail"  v-html=supplierInfo.introduction>
                        {{supplierInfo.introduction}}
                    </div>
                </div>
            </div>
            <div class="commodity">
                <div class="title"><div>周边交通</div></div>
                <div class="content">
                    <div class="lineHide2" :class="{'lineHides': zhankai2}" @click="zhankail2" v-html=supplierInfo.aroundLine>
                        {{supplierInfo.aroundLine}}
                    </div>
                </div>
            </div>
            <div class="commodity">
                <div class="title"><div>酒店房间</div></div>
                <div class="content" v-for='producList in producList'>
                    <div class="room-list" @click='toRoomDetail(producList.productId)'>
                        <img :src=producList.bigProductImg[0] width="75px" height="50px">
                        <div class="list-r">
                            <div class="fs12">{{producList.productName}}</div>
                            <div class="fs10 am-padding-vertical-xs"><span class="fs14 c-orange">&yen;{{producList.price1}}</span>起</div>
                        </div>
                    </div>
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
        producList:'',
        zhankai: false,
        zhankai2: false,
        loadStatus: false,
        page: 1
      }
    },
    components: {
      myHeader,
    },
    methods: {
      toBuy() {
        this.$router.push({name: 'payMent', params: {id2: this.supplierInfo.supplierId, dis: this.supplierInfo.productDiscount}})
      },
      toRoomDetail(id) {
        this.$router.push({name: 'roomDetail', query: {id: id, dis: this.supplierInfo.productDiscount}})
      },
      getFetch() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/supplierInfo.htm',{supplierId: self.$route.query.id,saleType: 'HOTELS',pageNumber: self.page}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            self.supplierInfo = data.info
            if(self.page>1){
                self.producList = self.producList.concat(data.info.producList)
            }else{
                self.producList = data.info.producList
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
        // api.postData('/app/supplierInfo.htm',{supplierId: self.$route.query.id}).then(function(data){
        //   Indicator.close()
        //   if (data.code == 1) {
        //     self.supplierInfo = data.info
        //   }else{
        //     Toast(data.message)
        //   }
        // })
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
          this.getFetch();
      },
      zhankail() {
        this.zhankai = !this.zhankai
      },
      zhankail2() {
        this.zhankai2 = !this.zhankai2
      }
    },
    mounted() {
      this.getFetch();
    }

  }
</script>

<style lang="less">
    #hotelDetail{
        label{margin-bottom: 0;}
        .c-blue{color: #00a0e9;}
        .c-orange{color: #eb6100;}
        .c-green{color: #2ecc71;}
        .c-666{color: #666;}
        .old-price{color: #666; text-decoration: line-through; font-size: 10px;}
        background-color: #f6f6f6;
        padding: 40px 0 0 0;
    .content{
        .theme{
            background-color: #fff;
            padding: 10px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .des{
                color: #eb6100;
                margin-left: 5px;
                .old-price{
                    font-size: 10px;
                    text-decoration: line-through;
                    color: #666;
                }
            }
        }
        
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
        .commodity{
            p{
                border-bottom: 0px;
            }
            .lineHide{
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                word-break: break-all;
                height: 72px;
            }
            .lineHide2{
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                word-break: break-all;
                height: 69px;
            }
            .lineHides{
                height: auto;
                -webkit-line-clamp: 99
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
                padding: 10px;
                border-bottom: 1px solid #eee;
                .room-list{
                    display: flex;
                    .list-r{
                        display: flex;
                        flex-direction: column;
                        padding-left: 5px;
                    }
                }
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
