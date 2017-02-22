<template>
    <div id="userSet">
    	<myHeader title="账户管理" backUrl="me"></myHeader>
    	<mt-cell title="头像" is-link>
    	  <img src="../../assets/icon-touxiang.png" class="b-1px" width="35px" height="35px">
    	</mt-cell>
    	<mt-cell title="用户名" :value="userName" :to=editeName  is-link></mt-cell>
    	<mt-cell title="登录密码" value="修改登录密码" to="editePsw" is-link></mt-cell>
    	<mt-cell title="手机号" value="修改手机号" to="editeMobile"  is-link></mt-cell>
    	<mt-button size="large" @click="loginOut">退出登录</mt-button>
    </div>
</template>

<script>
	import myHeader from 'components/header2'
	import { Toast } from 'mint-ui';
	import api from 'api/api'
  	export default {
  		components: {
  			myHeader
  		},
  		data() {
  			return {
  				userName: '',
				editeName: 'editeName'
  			}
  		},
  		methods: {
  			loginOut() {
  				let self = this;
  				api.getData('/app/logOut.htm').then((data) =>{
  					if (data.code == 1) {
  						Toast('退出登陆成功');
              sessionStorage.clear();
              self.$router.push('login');
  					}else{
  						Toast(data.message);
  					}
  				})
  			}
  		},
  		created() {
  			this.userName = api.getSession('userName');
			if(this.userName){
				this.editeName = false
			}
  		}
  	}
</script>

<style lang="less">
	#userSet{
		background-color: #f6f6f6;
		padding-top: 40px;
		min-height: 570px;
		label{ margin-bottom: 0px; }
		.mint-button--large{
			width: 94%;
			margin: 40px 10px;
			background-color: #a51612;
			color: #fff;
			font-weight: normal;
		}
	}
</style>
