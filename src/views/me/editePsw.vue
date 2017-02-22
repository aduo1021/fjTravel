<template>
    <div id="editePsw">
        <myHeader title="修改登录密码" backUrl=""></myHeader>
        <div class="content">
            <mt-field label="登录密码" v-model="oldPsw" placeholder="请输入登录密码" :attr="{maxlength: 12,required: true}" type="password">
                <i class="c-red m-right5">*</i>
            </mt-field>
            <mt-field label="新的登录密码" v-model="newPsw" placeholder="请输入新的登录密码" :attr="{maxlength: 12,required: true}" type="password">
                <i class="c-red m-right5">*</i>
            </mt-field>
            <mt-field label="新的登录密码" v-model="newPsw2" placeholder="请输入新的登录密码" :attr="{maxlength: 12,required: true}" type="password">
                <i class="c-red m-right5">*</i>
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
        oldPsw: '',
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
         if (!self.oldPsw || !self.newPsw || !self.newPsw2 || self.newPsw.length < 6 || self.newPsw2.length < 6) {
          Toast('请输入6-12位密码')
         }else if (self.newPsw != self.newPsw2) {
          Toast('两次新密码不一样')
         }else{
          Indicator.open('加载中...')
          api.postData('/app/appChangePwd.htm',{password: self.oldPsw, newPassword: self.newPsw, ex: 'ex'}).then((data) =>{
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
    #editePsw{
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
        left: 3px;
        top:auto;
      }
    }


    }

</style>
