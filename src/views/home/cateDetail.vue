<template>
    <div id="cateDetail">
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
                    <div class="des">&yen;22.00<span class="old-price">&yen;50.00</span></div>
                </div>

                <mt-button type="default" @click="toBuy" >优惠买单</mt-button>

            </div>
            <p><i class="am-icon-location-arrow"></i>{{supplierInfo.address}}<a :href="'tel:'+supplierInfo.mobile"><i class="am-icon-phone-square am-icon-sm"></i></a></p>
            <p class="fs12 time">营业时间：{{supplierInfo.openTime}}-{{supplierInfo.closeTime}} <span class="am-fr">人均消费：<i>{{supplierInfo.spendPer}}</i>元/人</span></p>
            <mt-cell class="bb-1px" title="查看全部点评" :to="{ name: 'evaluateList', query: { id: supplierInfo.supplierId }}" is-link></mt-cell>
            <div class="commodity">
                <div class="title"><div>商品详情</div></div>
                <div class="content">
                    <div>
                        <div>消费提示</div>
                        紫阳鸡
                    </div>
                </div>
            </div>
        </div>
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
      }
    },
    components: {
      myHeader,
    },
    methods: {
      toBuy() {
        this.$router.push({name: 'sureOrder', query: {id: 1}})
      },
      getFetch() {
        let self = this
        Indicator.open('加载中...');
        api.postData('/app/supplierInfo.htm',{supplierId: self.$route.query.id,saleType: 'O2O'}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            self.supplierInfo = data.info

          }else{
            Toast(data.message)
          }
        })
      }
    },
    mounted() {
      this.getFetch();
    }

  }
</script>

<style lang="less">
    #cateDetail{
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

        }
    }
</style>
