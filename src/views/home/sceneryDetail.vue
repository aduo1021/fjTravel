<template>
    <div id="sceneryDetail">
    	<myHeader title="详情" backUrl=""></myHeader>
    	<div class="content">
    		<img :src=items.imagePath1 width="100%" height="180px">
    		<p>{{items.name}}</p>
			<!--<i class="am-icon-phone-square am-icon-sm"></i>-->
    		<p style="display: flex"><i class="am-icon-location-arrow"></i><span class="address">{{items.address}}</span><a :href="'tel:'+items.phone"><i class="am-icon-phone-square am-icon-sm"></i></a></p>
    		<p>营业时间：{{items.openTime}}-{{items.closeTime}}</p>
    		<div class="am-margin-top-sm">
    			<mt-navbar v-model="selected" class="m-bottom2">
				  <mt-tab-item id="1">购票</mt-tab-item>
				  <mt-tab-item id="2">详情</mt-tab-item>
				  <mt-tab-item id="3">评价</mt-tab-item>
				</mt-navbar>
				<mt-tab-container v-model="selected">
				  	<mt-tab-container-item id="1">
				  		<div class="tickets" v-for="tickets in ticketList">
				  			<div class="c-left">
				  				<div class="c-blue">{{tickets.productName}}</div>
				  				<div class="c-orange am-margin-vertical-xs">&yen;{{tickets.price1}} <span class="old-price">&yen;{{tickets.marketPrice}}</span></div>
				  				<div class="fs12">有效期：{{tickets.date}}</div>
				  			</div>
				  			<div class="c-right">
				  				<mt-button type="default" @click="toBuy(tickets.productName,tickets.price1,tickets.date,tickets.productId)" >购票</mt-button>
				  				<div class="c-green am-margin-top-xs"><i class="am-icon-check-circle"></i><span class="c-666">随时退</span></div>

				  			</div>
				  		</div>
						<p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
				  	</mt-tab-container-item>
				  	<mt-tab-container-item id="2">
				  		<div class="details">
				  			<div class="title">景点介绍</div>
				  			<div class="words">
				  				{{items.detail}}
				  			</div>
				  		</div>
				  	</mt-tab-container-item>
				  	<mt-tab-container-item id="3">
				  		<div class="evaluate">
				  			<p>好评率：<spn class="am-fr fs12" @click="toEval(items.scenicId)">查看全部评价 ></spn></p>
				  			<div class="list" v-for="pingjia in pingjiaList">
				  				<div class="name">{{pingjia.userName}}<i class="am-icon-star" v-for="a in parseInt(pingjia.score)"></i></div>
				  				<div class="content am-padding-vertical-xs">{{pingjia.PComment}}</div>
				  				<div class="time">时间：{{pingjia.createTime}}<span class="am-fr" ></div>
								  <!--<i class="am-icon-thumbs-up"></i>有用({{pingjia.likeCount}})</span>-->
				  			</div>
				  		</div>
				  	</mt-tab-container-item>
				</mt-tab-container>
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
  			items: '',
			loadStatus: false,
  			ticketList: '',
  			marketPrice: '',
        	pingjiaList: '',
			scenicId:'',
			page: 1
  		}
  	},
    components: {
      myHeader,
    },
    methods: {
    	toBuy(tickName,price,date,id) {
    		this.$router.push({name: 'sureOrder', params: {scenic: this.items.name, ticket: tickName, price: price, date: date, productId: id }})
    	},
    	fetchData() {
    		self = this
    		Indicator.open('加载中...');
    		api.postData('/app/scenicInfo.htm',{ scenicId: self.$route.query.id,pageNumber: self.page}).then((data) =>{
    		    Indicator.close()
    		    if (data.code == 1) {
    		    	self.items = data
					self.scenicId = data.scenicId
					if(self.page>1){
						self.ticketList = self.ticketList.concat(data.ticketList)
					}else{
						self.ticketList = data.ticketList
					}
					if(data.ticketList.length == 10){
						self.loadStatus = true
					}
					if(self.page >= data.totalPage){
						self.loadStatus = false
					}
					
    		    }else{
    		    	Toast(data.message)
    		    }

    		})
			api.postData('/app/pingjia.htm',{ supplierId: self.scenicId}).then((data) =>{
				if(data.code == 1) {
				self.pingjiaList = data.list
				}else{
				Toast(data.message)
				}
			})
    	},
		loadMore() {
			this.page++
			this.fetchData()
		},
		toEval(id) {
			this.$router.push({name: 'evaluateList',query: {id: id}})
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
	#sceneryDetail{
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

			}
      .address{
        width: 75%;
        display: inline-block;
        overflow: hidden;
        height: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
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
			.tickets{
				display: flex;
				align-items: center;
				padding: 20px 10px;
				background-color: #fff;
				border-bottom: 1px solid #eee;
				.c-left{
					flex: 2;
				}
				.c-right{
					flex: 1;
					display: flex;
					justify-content: flex-end;
					flex-wrap: wrap;
				}
				.mint-button--default{
					background-color: #fea101;
					color: #fff;
					width: 70px;
					height: 30px;
				}
			}
			.details{
				background-color: #fff;
				padding: 20px 10px;
				.title{
					color: #333;
				}
				.words{
					font-size: 12px;
					color: #666;
				}
			}
			.evaluate{
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
