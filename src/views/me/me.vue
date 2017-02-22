<template>
    <div id="me">
        <myHeader title="我的账户" backUrl="index" ></myHeader>
        <div class="m-top40">
          	<div class="account">
	          	<div class="content">
	          		<img src="../../assets/icon-touxiang.png">
					<div class="username">
						<p class="am-margin-0">{{userData.userName}}</p>
						<p class="am-margin-0"><span @click="toSet" class="am-fr am-margin-right-sm">账户管理 ></span></p>
					</div>
	          	</div>
          	</div>
          	<div class="myOrder am-margin-top-sm">
          		<mt-cell title="我的订单" value="全部订单" to="order" is-link></mt-cell>
          	</div>
          	<div class="nav">
	            <router-link :to="{ name: 'order', query: { type: 'ticket', type2: '' }}">
	                <img src="../../assets/icon-ticket.png" width="32px" height="25px" alt="">
	                <p>门票</p>
	            </router-link>
	            <router-link :to="{ name: 'order', query: { type: 'product', type2: 'O2O' }}">
	                <img src="../../assets/icon-cate.png" width="18px" height="25px" alt="">
	                <p>餐饮</p>
	            </router-link>
	            <router-link :to="{ name: 'order', query: { type: 'product', type2: 'HOTELS' }}">
	                <img src="../../assets/icon-hotel.png" width="12px" height="25px" alt="">
	                <p>酒店</p>
	            </router-link>
        	</div>
        	<div class="myCollect am-margin-top-sm">
        		<mt-cell title="我的收藏" icon="am-icon-heart" to="myCollect"  is-link>
        			<img slot="icon" src="../../assets/icon-heart.png" width="17" height="15">
        		</mt-cell>
        	</div>
        </div>

        <myFooter></myFooter>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import myFooter from 'components/footer'
  import { Toast,MessageBox,Indicator } from 'mint-ui';
  import api from 'api/api'
  export default {
  	data() {
  		return {
  			userData: '',
  		}
  	},
    components: {
      myHeader,
      myFooter
    },
    methods: {
    	toSet() {
    		this.$router.push('userSet')
    	}
    },
    created() {
    	let self = this;
    	Indicator.open('加载中...');
    	api.getData('/app/userInfo.htm').then((data) =>{
    		Indicator.close();
    		if (data.code == 1) {
    			self.userData = data.info;
				api.setSession("userName", data.info.userName);
				api.setSession("mobile", data.info.mobile);
    		}else{
    			MessageBox.alert(data.message).then((action) => {
    				self.$router.push('login');
    			});
    		}
    	})
    }
  }
</script>

<style lang="less">
	#me{
		background-color: #f6f6f6;
		.account{
			display: flex;
			align-items: center;
			height: 150px;
      background-size: 100%;
			background: url('../../assets/me-banner.jpg') center no-repeat;
			.content{
				display: flex;
				height: 80px;
				width: 100%;
				overflow: hidden;
				align-items: center;
				img{
					border-radius: 50px;
					width: 50px;
					height: 50px;
					margin-left: 10px;

				}
				.username{
					flex: 2;
					color: #fff;
					margin-left: 10px;
					a{
						color: #fff;
					}
				}
			}
		}
		.nav{
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            text-align: center;
            p{
                font-size: 10px;
                color: #333;
                line-height: 30px;
                margin: 0 !important;
            }
            a{
            	flex: 1;
            	border-right: 1px solid #eee;
            	img{
            		margin-top: 10px;
            	}
            }
        }
	}

</style>
