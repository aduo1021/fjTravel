<template>
    <div id="travelDetail">
    	<myHeader title="线路详情" backUrl=""></myHeader>
    	<div class="content">
    		<div class="title"><p >线路详情</p></div>
    		<div class="detail" v-html="lyglDetail.productDetail" >
    			{{lyglDetail.productDetail}}
    		</div>
    	</div>
      <span class="collect" @click="collect(lyglDetail.supplierId)"><i :class="[isCollected ? 'am-icon-heart' : 'am-icon-heart-o' ]"></i></span>
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
          lyglDetail: '',
          isCollected: '',
        }
      },
      methods: {
        fetchData() {
          self = this
          Indicator.open('加载中...');
          api.postData('/app/productDetail.htm',{ productId: self.$route.query.id}).then((data) =>{
            Indicator.close()
            if (data.code == 1) {
              self.lyglDetail = data.info
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
	#travelDetail{
		padding-top: 40px;
		.content{
			.title{
				padding: 10px;
				border-bottom: 1px solid #eee;
				p{
					color: #a51612;
					font-size: 13px;
					border-left: 2px solid #a51612;
					text-indent: 5px;
					margin: 0;
				}

			}
			.detail{
				padding: 5px;
        img{
          width: 100%;
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
