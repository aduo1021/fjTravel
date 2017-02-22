<template>
    <div id="editeMobile2">
      <myHeader title="修改手机号" backUrl=""></myHeader>
      <div class="content">
        <mt-field label="新手机号码" v-model="phone" placeholder="请输入新的手机号码" :attr="{maxlength: 11,required: true}" type="tel"></mt-field>
        <mt-field label="短信验证码" v-model="code" class="bb-1px" placeholder="短信验证码" type="tel" :attr="{maxlength: 6,required: true}">

        </mt-field>
        <button id="getCode" :disabled="db" @click="getCode">{{getCodetext}}</button>
        <mt-button type="default" class="m-top40" @click="submit" size="large">完成</mt-button>
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
           phone: '',
           code: '',
           src: '/app/getImgCode.htm'
        }
    },
    components: {
      myHeader,

    },
    methods: {
      getCode() {
        self = this;
        return api.postData('/app/sendSmsCode.htm', {
            mobile: this.phone,
            business: 'newCellphone',
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
      submit() {
        let self = this;
        Indicator.open('加载中...')
        api.postData('/app/appChangeToNewPhone.htm', {code: this.code, newMobile: this.phone, md5UserBaseId: api.getSession('md5')}).then((data) =>{
          Indicator.close()
          Toast(data.message)
          if (data.code == 1) {
            self.$router.push('me')
          }
        })
      }
    }
  }
</script>

<style lang="less">
  #editeMobile2{
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
    }

    label{
        margin-bottom: 0px;
    }

  }

</style>
