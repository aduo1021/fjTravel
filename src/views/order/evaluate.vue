<template>
    <div id="evaluate">
      <myHeader title="发表评价" backUrl=""></myHeader>
      <div class="content">
        <div class="cont-top">
          <img src="../../assets/me-banner.jpg" width="50px" height="50px" >
          <div class="title">
            <p class="am-margin-0 fs12 name">{{orderDetail.productName}}</p>
            <p class="am-margin-0 fs10 c-999">{{orderDetail.createTime}}</p>
          </div>
        </div>
        <div class="cont-mid am-padding-vertical-xs ">
          评分：<i :class="[active1 ? 'am-icon-star' : 'am-icon-star-o']" @click="changePoint(1)"></i>
          <i :class="[active2 ? 'am-icon-star' : 'am-icon-star-o']" @click="changePoint(2)"></i>
          <i :class="[active3 ? 'am-icon-star' : 'am-icon-star-o']" @click="changePoint(3)"></i>
          <i :class="[active4 ? 'am-icon-star' : 'am-icon-star-o']" @click="changePoint(4)"></i>
          <i :class="[active5 ? 'am-icon-star' : 'am-icon-star-o']" @click="changePoint(5)"></i>
        </div>
        <div class="cont-bot">
          <mt-field label="请输入评价" v-model="ratings" placeholder="请输入内容" type="textarea" rows="4"></mt-field>
        </div>
      </div>
      <mt-button class="surebtn" @click="submit" size="large">提交</mt-button>
    </div>
</template>

<script>
    import myHeader from 'components/header2'
    import { Indicator,Toast } from 'mint-ui'
    import api from 'api/api'
    export default {
      components: {
        myHeader,
      },
      data() {
        return {
          orderList: '',
          selected: '1',
          point: 0,
          ratings: '',
          orderDetail: '',
          active1: false,
          active2: false,
          active3: false,
          active4: false,
          active5: false,
        }
      },
      computed() {

      },
      methods: {
        getFetch() {
          let self = this
          Indicator.open('加载中...');
          api.postData('/app/orderDetail.htm',{id: this.$route.query.id}).then(function(data){
            Indicator.close()
            if (data.code == 1) {
              self.orderDetail = data.info

            }else{
              Toast(data.message)
            }
          })
        },
        submit() {
          let self = this
          Indicator.open('提交中...');
          api.postData('/app/pingjiaSub.htm',{id: self.$route.query.id, product: self.point,remark: self.ratings }).then(function(data){
            Indicator.close()
            Toast(data.message)
            if (data.code == 1) {
              self.$router.push('order')
            }
          })
        },
        changePoint(index) {
          let self = this
          self.point = index
          if(index == 5){
            self.active1 = true
            self.active2 = true
            self.active3 = true
            self.active4 = true
            self.active5 = true
          }else if(index == 4){
            self.active1 = true
            self.active2 = true
            self.active3 = true
            self.active4 = true
            self.active5 = false
          }else if(index == 3){
            self.active1 = true
            self.active2 = true
            self.active3 = true
            self.active4 = false
            self.active5 = false
          }else if(index == 2){
            self.active1 = true
            self.active2 = true
            self.active3 = false
            self.active4 = false
            self.active5 = false
          }else if(index == 1){
            self.active1 = true
            self.active2 = false
            self.active3 = false
            self.active4 = false
            self.active5 = false
          }
        }
      },
      mounted() {
        this.getFetch();
      }
    }
</script>

<style lang="less">
    #evaluate{
      padding-top: 40px;
      background-color: #f6f6f6;
      min-height: 570px;
      .content{
        padding: 10px;
        background-color: #fff;
        margin-top: 10px;
        height:100%;
        .cont-top{
          display: flex;
          align-items: center;
          border-bottom: 1px solid #e2e2e2;
          padding-bottom: 10px;
        .title{
          margin-left: 5px;
        .name{min-height: 38px}
        }
        }
        .cont-mid{
          i{margin-right: 5px}
        }

      }
      .surebtn.mint-button{
        background-color: #a51612;
        color: #fff;
        margin: 40px 10px;
        width: 94%;
      }
    }
</style>
