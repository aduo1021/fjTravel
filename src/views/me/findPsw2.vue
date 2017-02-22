<template>
    <div id="findPsw2">
        <myHeader title="设置密码" backUrl=""></myHeader>
        <div class="content">

            <mt-field label="" v-model="newPsw" placeholder="请设置登录密码" :attr="{maxlength: 12,required: true}" type="password">
                <i class="c-red m-right5">*</i><img src="../../assets/icon-psw.png" width="50%" alt="">
            </mt-field>
            <mt-field label="" v-model="newPsw2" placeholder="请再次输入登录密码" :attr="{maxlength: 12,required: true}" type="password">
                <i class="c-red m-right5">*</i><img src="../../assets/icon-psw.png" width="50%" alt="">
            </mt-field>
            <mt-button type="default" class="m-top40" @click="submit" size="large">提交</mt-button>
        </div>

    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import { Toast,Indicator } from 'mint-ui';
  import api from 'api/api'
  export default {
    data() {
      return {
        newPsw: '',
        newPsw2: '',
      }
    },
    components: {
      myHeader,

    },
    methods: {
      checkPsw() {

      },
      submit() {
        let self = this;
         if (!self.newPsw || !self.newPsw2 || self.newPsw.length < 6 || self.newPsw2.length < 6) {
          Toast('请输入6-12位密码')
         }else if (self.newPsw != self.newPsw2) {
          Toast('两次新密码不一样')
         }else{
          Indicator.open('加载中...')
          api.postData('/app/forgetLoginPwdSub.htm',{code: self.$route.params.forgetCode, newPassword: self.newPsw, mobile: self.$route.params.forgetPhone, ex: 'ex'}).then((data) =>{
            Indicator.close();
            Toast(data.message)
            if (data.code == 1) {
              self.$router.push('login')
            }
          })
         }
      }
    }
  }
</script>

<style lang="less">
    #findPsw2{
      padding-top: 40px;
      background-color: #f6f6f6;
      label{
          margin-bottom: 0px;
      }
    .mint-cell{
      padding-left: 5px;
    }
    .content{
      .mint-button--default{
          background-color: #a51612;
          color: #fff;
          width: 94%;
          margin: 40px 10px;
      }
      .mint-field-other{
        right: auto;
        left: 10px;
        top:auto;
      }
      .mint-field-core{
        width: 80%;
        margin-left: 40px;
      }
    }


    }

</style>
