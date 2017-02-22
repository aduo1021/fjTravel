<template>
    <div id="findPsw" >
    	<myHeader title="修改用户名" backUrl=""></myHeader>
    	<div class="content">
    		<mt-field label="用户名" v-model="userName" :value="userName" placeholder="请输入用户名"></mt-field>

    	</div>
    	<mt-button size="large" @click="upDate">完成</mt-button>
    </div>
</template>

<script>
	import myHeader from 'components/header2'
	import { Toast,Indicator } from 'mint-ui';
	import api from 'api/api'
  	export default {
  		components: {
  			myHeader
  		},
  		data() {
  			return {
  				userName: '',
  			}
  		},
  		methods: {
  			upDate() {
  				let self = this;
  				Indicator.open('加载中...');
  				api.postData('/app/updateUserInfo.htm',{userName: self.userName}).then((data) =>{
  					Indicator.close();
  					Toast(data.message)
  					if (data.code == 1) {
  						self.$router.push('me')
  					}
  				})
  			}
  		},
  		created() {
  			this.userName = api.getSession('userName');
  		}
  	}
</script>

<style lang="less">
	#findPsw{
		background-color: #f6f6f6;
		padding-top: 40px;
		min-height: 580px;

			.mint-button--large{
				width: 94%;
				background-color: #a51612;
				color: #fff;
				border-color: #a51612;
				margin: 40px 10px;
			}

	}
</style>
