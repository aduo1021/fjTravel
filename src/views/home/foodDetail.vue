<template>
    <div id="foodDetail">
        <myHeader title="菜品详情" backUrl=""></myHeader>
        <div class="content">
            <div style="height: 180px;">
              <mt-swipe>
                <mt-swipe-item v-for="item in productInfo.imgList"><img :src=item height="100%" width="100%"></mt-swipe-item>
              </mt-swipe>
            </div>
            <div class="theme">
                <div class="cont">
                    <div>{{productInfo.storeName}}</div>
                </div>

                <mt-button type="default" @click="toBuy(productInfo.productId)" >优惠买单</mt-button>

            </div>
            <!--<i class="am-icon-phone-square am-icon-sm"></i>-->
            <p><i class="am-icon-location-arrow"></i>{{productInfo.address}}<a :href="'tel:'+productInfo.mobile"><i class="am-icon-phone-square am-icon-sm"></i></a></p>
            <p>特价：<span class="c-red">{{productInfo.price1}}</span>元<span class="old-price am-margin-left-xs">{{productInfo.marketPrice}}元</span></p>
            <div class="commodity">
                <div class="title"><div>消费提示：</div></div>
                <div class="content">
                    <div>
                        <div class=" am-margin-left-xs">使用有效期：<div class="c-red">{{productInfo.date}}</div></div>
                        <div class=" am-margin-left-xs">温馨提示：<div class="c-red">{{productInfo.transportDetail}}</div><div class="c-red">{{productInfo.wholesaleDetail}}</div></div>
                    </div>
                </div>
                <div class="title"><div>商品简介：</div></div>
                <div class="content">
                    <div class="lineHide" :class="{'lineHides': zhankai}" @click="zhankail">
                        <div>{{productInfo.groupBuyDetail}}</div>
                    </div>
                </div>
                <div class="title"><div>商品详情：</div></div>
                <div class="content">
                    <div class="miaosu">
                        <div  v-html=productInfo.productDetail>{{productInfo.productDetail}}</div>
                    </div>
                </div>
            </div>
        </div>
        <span class="collect" @click="collect(productInfo.productId)"><i :class="[isCollected ? 'am-icon-heart' : 'am-icon-heart-o' ]"></i></span>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import { Indicator,Toast,MessageBox } from 'mint-ui'
  import api from 'api/api'
  export default {
    data() {
      return {
        selected: '1',
        productInfo: '',
        isCollected: '',
        zhankai: false
      }
    },
    components: {
      myHeader,
    },
    methods: {
      toBuy(id) {
        let self = this;
        
        Indicator.open('提交中...');
        api.getData('/app/userInfo.htm').then((data) =>{
    		Indicator.close();
    		if (data.code == 1) {
    			self.$router.push({name: 'payMent',params: {id2: self.productInfo.supplierId,dis: self.$route.query.dis}});
    		}else{
    			MessageBox.alert(data.message).then((action) => {
    				self.$router.push('login');
    			});
    		}
    	})
      },
      
      getFetch() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/productDetail.htm',{productId: self.$route.query.id}).then(function(data){
            Indicator.close()
            if (data.code == 1) {
                self.productInfo = data.info
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
      collect(productId) {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/collect.htm',{productId: productId}).then(function(data){
          Indicator.close()
          Toast(data.message)
          if (data.code == 1) {


          }
        })
      },
      zhankail() {
        this.zhankai = !this.zhankai
      },
    },
    mounted() {
      this.getFetch();
    }

  }
</script>

<style lang="less">
    #foodDetail{
        label{margin-bottom: 0;}
        .c-blue{color: #00a0e9;}
        .c-orange{color: #eb6100;}
        .c-green{color: #2ecc71;}
        .c-666{color: #666;}
        .old-price{color: #666; text-decoration: line-through; font-size: 10px;}
        background-color: #f6f6f6;
        padding: 40px 0 0 0;
    .content{
        .old-price{color: #666; text-decoration: line-through; font-size: 10px;}
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
        .miaosu{
            p{
                border-bottom: 0px;
            }
        }
        .lineHide{
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            word-break: break-all;
            height: 72px;
        }
        .lineHides{
            height: auto;
            -webkit-line-clamp: 99
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
