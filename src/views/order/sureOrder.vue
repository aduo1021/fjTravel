<template>
    <div id="sureOrder">
		<myHeader title="确认订单" backUrl="" ></myHeader>
		<div class="content">
			<mt-cell :title=scenic :label=tickets></mt-cell>
			<mt-cell title="数量">
			  <input type="number"  v-model="num" placeholder="请输入数量">人
			</mt-cell>
			<mt-cell title="总价" :value=totalPrice></mt-cell>
			<mt-cell title="有效期" class="date" :value=date></mt-cell>
			<!--<mt-cell title="积分" :label="'可使用积分'+userScore"><mt-switch v-model="value"></mt-switch></mt-cell>-->
			<mt-cell title="请输入积分" v-show="value">
			  <input type="number" :disabled=status @focus="scoreInit=''" v-model="scoreInit" placeholder="请输入积分">分
			</mt-cell>
			<mt-cell title="总需支付" class="total bb-1px" :value=totalPrice2></mt-cell>
			<mt-button class="surebtn" @click="submit" size="large">确认</mt-button>

		</div>
		<form name="myForm" id="myForm" class="form1" :action=url method="post">
        <input type="text" name="desc" :value=item.desc >
        <input type="text" name="inputCharset" :value=item.inputCharset >
        <input type="text" name="notifyUrl" :value=item.notifyUrl >
        <input type="text" name="orderNo" :value=item.orderNo >
        <input type="text" name="partnerId" :value=item.partnerId >
        <input type="text" name="payAmount" :value=item.payAmount >
        <input type="text" name="returnUrl" :value=item.returnUrl >
        <input type="text" name="service" :value=item.service >
        <input type="text" name="sign" :value=item.sign >
        <input type="text" name="signType" :value=item.signType >
        <input type="text" name="title" :value=item.title >
      </form>
    </div>
</template>

<script>
	import myHeader from 'components/header2'
	import { Indicator,Toast,MessageBox } from 'mint-ui'
	import api from 'api/api'
  	export default {
  		data() {
  		  return {
  		    value: false,
  		    status: false,
  		    num: 1,
					url: '',
          item: '',
  		    scoreInit: 0,
  		    userScore: '1000',
  		    scenic: this.$route.params.scenic,
  		    tickets: this.$route.params.ticket,
  		    price: this.$route.params.price,
  		    date: this.$route.params.date,
  		  }
  		},
  		components: {
  		  myHeader,
  		},
  		watch: {
  			totalPrice: function() {
  				this.totalPrice2 = this.totalPrice;
  			},
  			value: function() {
  				if (!this.value) {
  					this.scoreInit = 0
  				}
  			}
  		},
  		computed: {
  		    totalPrice2: function() {
  		    	let self = this;
  				if(self.scoreInit < 0) {
  					Toast('积分不能小于0')
  					self.scoreInit = 0
  				}else if(self.scoreInit > self.userScore) {
  					Toast('您的积分不够')
  					self.scoreInit = self.userScore
  					return (self.totalPrice -  self.scoreInit/100).toFixed(2)
  				}else{
  					return (self.totalPrice -  self.scoreInit/100).toFixed(2)
  				}
  		    	//return this.totalPrice - this.scoreInit
  		    },
  		    totalPrice: function() {
  		    	let self = this;
            if (self.num < 0) {
              Toast('至少选择一张门票')
              self.num = 1
              return self.price
            }else {
              return (self.price*self.num).toFixed(2);
            }
  		    }

  		},
  		methods: {
  			fetchUser() {
  				self = this
  				Indicator.open('加载中...');
  				api.postData('/app/userInfo.htm').then((data) =>{
  				    Indicator.close()
  				    if (data.code == 1) {
  				    	//self.userScore = data.info.userIntegral
  				    	if (self.userScore == 0) {
							this.status = true
						}
  				    }else{
  				    	MessageBox.alert(data.message).then((action) => {
    	    				self.$router.push('login');
    	    			});
  				    }

  				})
  			},
  			openScore() {
  				if (this.userInfo.userIntegral == 0) {
  					return false;
  				}
  			},
  			submit() {
  				let self = this;
          const dataForm = {
            productId: self.$route.params.productId,
            counts: self.num,
            userPoint: self.scoreInit,
            payType: 'TICKET'
          }
    			Indicator.open('提交中...');
  				api.postData('/app/confirmOrderSub.htm',dataForm).then((data) =>{
	    		    if (data.code == 1) {
								self.payMent(data.info.id)
	    		    }else{
                self.$router.push('index')
	    		    }

	    		})
  			},
				payMent(id) {
          let self = this
          api.postData('/app/gotoPay.htm',{ids: id, payWay: 'WECHATS_PAY',returnUrl: encodeURIComponent(window.location.host+'/mobile/index.html#/order')}).then(function(data){
            if (data.code == 1) {
              //self.toWeixin(data.url,data.map);
              self.url = data.url
              self.item = data.map
              console.log(self.item)
              self.$nextTick(function () {
                self.payAll()
              })
            }else{
              Toast(data.message)
            }
          })
        },
				payAll() {
          document.getElementById("myForm").submit();
					Indicator.close()
        },
  		},
  		mounted() {
  			this.fetchUser();

  		}
  	}
</script>

<style lang="less">
	#sureOrder{
		background-color: #f6f6f6;
		padding-top: 40px;
		.form1{display: none;}
		input{
			width: 100%;
		}
		.content{
			background-color: #fff;
			label{margin-bottom: 0px}
		}
		.mint-switch-input:checked + .mint-switch-core{
			background-color: #a51612;
			color: #a51612;
			border-color: #a51612;
		}
		.mint-cell-value{
			flex: 1;
			justify-content: flex-end;
		}
		.total .mint-cell-value span{ color: #eb6100; }
		.surebtn.mint-button{
			background-color: #a51612;
			color: #fff;
			margin: 40px 10px;
			width: 94%;
		}
	}
</style>
