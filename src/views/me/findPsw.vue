<template>
    <div id="findPsw">
      <myHeader title="找回密码" backUrl=""></myHeader>
      <div class="content">
        <mt-field label="" v-model="phone" placeholder="请输入手机号" :attr="{maxlength: 11,required: true}" type="tel"><i class="c-red m-right5">*</i><img src="../../assets/icon-phone.png" width="50%" alt=""></mt-field>
        <mt-field label="" v-model="code" class="bb-1px" placeholder="短信验证码" type="tel" :attr="{maxlength: 6,required: true}"><i class="c-red m-right5">*</i><img src="../../assets/icon-email.png" width="50%" alt="">
        </mt-field>

        </mt-field>
        <button id="getCode" :disabled="db" @click="getCode">{{getCodetext}}</button>
        <mt-button type="default" class="m-top40" @click="verifyCode" size="large">提交</mt-button>
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
           db: false,
           flag: false,
           timerIndex: 60,
           getCodetext: '发送验证码',
           selected: '1',
           phone: '',
           imgcode: '',
           code: '',
           src: '/app/getImgCode.htm'
        }
    },
    components: {
      myHeader,

    },
    created() {
      this.phone = api.getSession('mobile')
    },
    methods: {
      getCode() {
        self = this;
        if (!self.phone) {
          Toast('手机号不能为空')
        }else{
          self.checkMobile().then((data) =>{
            if (data.code != 1) {
              Toast(data.message)
            }else{
              self.sendCode()
            }
          })
        }


      },
      sendCode() {
        return api.postData('/app/sendSmsCode.htm', {
            mobile: this.phone,
            business: 'ForgetLoginPassWord'
          }).then(function (data) {
            if (data.code != 1) {
              Toast(data.message);
              return false;
            } else {
              Toast(data.message);
              self.flag = true;
              self.codeTimer();
            }
          })
      },
      checkMobile() {
          return api.postData('/app/forgetLoginPwd.htm',{userName: this.phone})
      },
      verifyCode() {
        let self = this;
        if(self.flag){
          api.postData('/app/verifySmsCode.htm',{mobile: this.phone, business: 'ForgetLoginPassWord', code: this.code}).then((data) =>{
           if (data.code == 1) {
             //self.submit();
             self.$router.push({name: 'findPsw2', params: {forgetCode: self.code, forgetPhone: self.phone}})
           }else{
            Toast(data.message);
            return false;
           }
          })
        }else{
          Toast('请输入完整信息')
        }

      },
      codeTimer() {

        let self = this

        if (self.timerIndex <= 1) {

          // 还原按钮
          // 隐藏倒计时层
          // 还原倒计时
          self.timerIndex = 10;
          this.getCodetext =" 重新发送 ";
          this.db = false;
          return

        }
        // 显示倒计时层
        this.db = true;
        self.timerIndex --
        this.getCodetext = this.timerIndex+"秒后重新发送";
        setTimeout(self.codeTimer, 1000)

      },
      /*submit() {
        let self = this;
        Indicator.open('加载中...')
        api.setSession('forgetPhone',this.phone)
        api.postData('/app/forgetLoginPwd.htm', {userName: this.phone}).then((data) =>{
          Indicator.close()
          if (data.code == 1) {
        console.log(self.code)

            //api.setSession('md5',data.md5UserBaseId)
            // self.$router.push({name: 'findPsw2', params: {forgetCode: self.code, forgetPhone: self.phone}})
          }
        })
      }*/
    }
  }
</script>

<style lang="less">
  #findPsw{
    padding-top: 40px;
    background-color: #f6f6f6;
    .content{
      #getCode{
        position: absolute;
        right: 0;
        top: 100px;
        height: 25px;
        line-height: 25px;
        color: #00a0e9;
        border: none;
        background: none;
        border-left: 1px solid #eee;
        padding: 0 10px;
      }
      .mint-button--default{
        background-color: #a51612;
        color: #fff;
        width: 94%;
        margin: 40px 10px;
      }
      .mint-field-other{
        right: auto;
        top:auto;
      }
      .mint-field-core{
        width: 80%;
        margin-left: 40px;
      }
    }

    label{
        margin-bottom: 0px;
    }

  }

</style>
