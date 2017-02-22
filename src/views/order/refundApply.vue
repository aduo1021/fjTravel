<template>
    <div id="refundApply">
    	<myHeader title="申请退款" backUrl=""></myHeader>
    	<!--<div class="cont-top"> 
				<img src="../../assets/test-img-1.jpg" width="50px" height="50px" >
				<div class="title">
					<p class="am-margin-0 fs12 name">奉节夔奉节节夔门奉节夔门</p>
					<p class="am-margin-0 fs12 c-333">&yen;330.00<span class="fs10 am-fr c-999">2017-1-03 12:00</span></p>
				</div>
			</div>-->
		<div class="cont-bot">
			<p>退款金额：{{money}}元</p>
			<p>退款方式：原路返回<span class="fs12">（1-7个工作日内）</span></p>
			<!-- <p>退款原因(只能选一项)</p> -->
			<div class="checkList">
				<mt-radio
				  align="right"
				  title="退款原因(只能选一项)"
				  v-model="value"
				  :options="options">
				</mt-radio>
			</div>
		</div>
		<div class="footer">
          <mt-button size="large" @click="reFund">申请退款</mt-button>
        </div>
    </div>
</template>

<script>
	import myHeader from 'components/header2'
	import api from 'api/api'
	import { Indicator,Toast } from 'mint-ui'
  	export default {
  		data() {
  			return {
  				value: '预约不上',
					money: this.$route.params.money,
  				options: [
  				  {
  				    label: '预约不上',
  				    value: '预约不上',
  				  },
						{
  				    label: '商家营业但不接待',
  				    value: '商家营业但不接待'
  				  },
						{
  				    label: '去过了，不太满意',
  				    value: '去过了，不太满意'
  				  },
  				  {
  				    label: '计划有变,没时间消费',
  				    value: '计划有变,没时间消费'
  				  },
  				  {
  				    label: '买错了/买多了',
  				    value: '买错了/买多了'
  				  },
						{
  				    label: '后悔了,不想要了',
  				    value: '后悔了,不想要了'
  				  },
						{
  				    label: '联系不上商家',
  				    value: '联系不上商家'
  				  },
						{
  				    label: '其他',
  				    value: '其他'
  				  },
  				]
  			}
  		},
  		components: {
  			myHeader
  		},
			methods: {
				reFund() {
					let self = this
					console.log(self.value)
					Indicator.open('加载中...');
					api.postData('/app/refundApply.htm',{id: self.$route.params.id,refundType: 'REFUND',orderItemId: self.$route.params.orderItemId, refundAmount: self.money,refundQuantity: self.$route.params.amount,refundReason: self.value}).then(function(data){
						Indicator.close()
						if (data.code == 1) {
							Toast('退款提交成功！')
							self.$router.push('order')
						}else{
							Toast(data.message)
						}
					})
				}
			}
  	}
</script>

<style lang="less">
	#refundApply{
		background-color: #f6f6f6;
		padding-top: 40px;
		padding-bottom: 62px;
		label{margin-bottom: 0px;}
		.mint-cell-wrapper{
			padding: 0;
		}
		.mint-radio-input:checked + .mint-radio-core{
			background-color: #a51612;
			border-color: #a51612;
		}
		.cont-top{
			background-color: #fff;
			padding: 10px;
			display: flex;
			align-items: center;
			.title{
				margin-left: 10px;
				width: 100%;
				.name{min-height: 38px}
			}
		}
		.cont-bot{
			background-color: #fff;
			margin-top: 10px;
			p{border-bottom: 1px solid #eee;padding: 10px;margin:0;}
			.checkList{
				.mint-cell-left{display: none;}
			}
		}
		.footer{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        background-color: #fff;
      }
			.mint-button--large{
        width: 94%;
        margin: 10px;
        background-color: #a51612;
        color: #fff;
        font-weight: normal;
      }
	}
</style>