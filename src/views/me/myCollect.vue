<template>
    <div id="myCollect">
    	<myHeader title="我的收藏" backUrl=""></myHeader>
      <div class="navbar">
        <div class="min-bar" :class="{ 'active': boo }" @click="shanghu">商户</div>
        <div class="min-bar" :class="{ 'active': boo2 }" @click="shangpin">商品</div>
      </div>

    	<!-- tab-container -->

      <mt-cell-swipe  :right="[{content: '删除',
              style: { background: 'red', color: '#fff' },
              handler: () => $messagebox('已删除').then((data) =>{deleteCollect(list.supplierId,list.productId)})}]" v-for="list in collectList" >
              <div class="collect-list" @click="toDetail(list.productId,list.supplierId,list.saleTypeO2o)">
                <div class="p-r">
                <img v-show="boo" :src=list.merchantPicPath width="50px" height="50px" >
                <img v-show="boo2" :src=list.pSmallPicPath width="50px" height="50px" >
                  <!--<div class="cover">已下架</div>-->
                </div>
                <div class="content">
                  <p v-show="boo" class="am-margin-buttom-sm fs12 c-333">{{list.storeName}}</p>
                  <p v-show="boo" class="am-margin-vertical-xs fs14 c-orange">{{list.scenicName}}</p>
                  <p v-show="boo2" class="am-margin-buttom-sm fs12 c-333">{{list.productName}}</p>
                  <p v-show="boo2" class="am-margin-vertical-xs fs14 c-orange">{{list.storeName}}</p>
                  <!--<p class="am-margin-0 fs10 c-999">20元代金券</p>-->
                </div>

              </div>
        </mt-cell-swipe>	

    </div>
</template>

<script>
	import myHeader from 'components/header2'
  import { Indicator,Toast } from 'mint-ui'
	import api from 'api/api'
  	export default {
  		data() {
  			return {
          productCol: '',
          supplierCol: '',
          collectList: '',
          boo: true,
          boo2: false
  			}
  		},
  		components: {
  			myHeader
  		},
      methods: {
        getFetch() {
          let self = this
          Indicator.open('加载中...');
          api.postData('/app/collectList.htm',{type: 'SUPPLIER_COL'}).then(function(data){
            if (data.code == 1) {
              self.supplierCol = data.list
              self.collectList = data.list
            }else{
              Toast(data.message)
            }
          })
          api.postData('/app/collectList.htm',{type: 'PRODUCT_COL'}).then(function(data){
            Indicator.close()
            if (data.code == 1) {
              self.productCol = data.list
            }else{
              Toast(data.message)
            }
          })
          
        },
        shanghu() {
          this.collectList = this.supplierCol
          this.boo2 = false
          this.boo = true
        },
        shangpin() {
          this.collectList = this.productCol
          this.boo2 = true
          this.boo = false
        },
        toDetail(productId,supplierId,type) {
          let self = this
          if(productId == 0){
            if(type == 'YES') {
              self.$router.push({name: 'cateDetail',query: {id: supplierId}})
            }else{
              self.$router.push({name: 'hotelDetail',query: {id: supplierId}})
            }
            
          }else{
            if(type == 'YES') {
              self.$router.push({name: 'foodDetail',query: {id: productId}})
            }else{
              self.$router.push({name: 'roomDetail',query: {id: productId}})
            }
          }
          self.$router.push({name: 'orderDetail',query: {id: id}})
        },
        deleteCollect(supplierId,productId) {
          let self = this
          if(self.boo){
            api.postData('/app/deletCollect.htm',{supplierId: supplierId}).then(function(data){
              Toast(data.message)
              if (data.code == 1) {
                self.getFetch()
              }
            })
          }else{
            api.postData('/app/deletCollect.htm',{productId: productId}).then(function(data){
            Toast(data.message)
            if (data.code == 1) {
              self.getFetch()
            }
          })
          }
          
        }
      },
      mounted() {
        this.getFetch()
      }
  	}
</script>

<style lang="less">
	#myCollect{
		background-color: #f6f6f6;
		padding-top: 40px;
		.mint-cell-title{
			position: absolute;
		}
    .mint-tab-container-item{
      display: block!important;
    }
    .navbar{
      display: flex;
      background-color: #fff;
      .min-bar{
        flex: 1;
        text-align: center;
        padding: 17px 0px;
        font-size: 14px;
        &.active{
          border-bottom: 2px solid #a51612
        }
      }
    }
		.collect-list{
			display: flex;
			align-items: center;
			padding: 10px 0;
			.content{
				margin-left: 10px
			}
			.cover{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				text-align: center;
				height: 20px;
				line-height: 20px;
				background: rgba(30,30,30,.7);
				color: #fff;
				font-size: 10px;
			}
		}
		.mint-cell-swipe-button{
			background-color: #a51612 !important;
			line-height: 70px;
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
    .mint-tab-item-label{font-size: 14px;}

	}
</style>
