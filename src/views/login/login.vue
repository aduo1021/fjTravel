<template>
    <div id="login">
        <myHeader title="登录" backUrl="index"></myHeader>
        <mt-navbar class="m-top40 m-bottom2" v-model="selected">
            <mt-tab-item id="1">账号密码登录</mt-tab-item>
            <mt-tab-item id="2">手机号快捷登录</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-field label="" v-model="phone" placeholder="请输入手机号" :attr="{maxlength: 11,required: true}" type="tel"><i class="c-red m-right5">*</i><img src="../../assets/icon-phone.png" width="50%" alt=""></mt-field>
                <mt-field label="" v-model="psw" class="bb-1px" placeholder="请输入您的密码" type="password"><i class="c-red m-right5">*</i><img src="../../assets/icon-psw.png" width="50%" alt=""></mt-field>
                <mt-button type="default" class="m-top40" @click="login" size="large">登录</mt-button>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-field label="" v-model="zcphone" placeholder="请输入11位手机号" :attr="{maxlength: 11,required: true}" type="tel">
                    <i class="c-red m-right5">*</i><img src="../../assets/icon-phone.png" width="50%" alt="">
                </mt-field>
                <mt-field label="" v-model="imgcode" placeholder="请输入图片验证码" type="tel" :attr="{maxlength: 4,required: true}">
                    <i class="c-red">*</i>
                    <img src="../../assets/icon-check.png" width="50%">
                </mt-field>
                <mt-field label="" v-model="code" class="bb-1px" placeholder="短信验证码" type="tel" :attr="{maxlength: 6,required: true}">
                    <i class="c-red m-right5">*</i><img src="../../assets/icon-email.png" width="50%" alt="">
                </mt-field>
                <button id="getCode" :disabled="db" @click="sendCode">{{getCodetext}}</button>
                <img class="checkimg" @click="freshImg" :src="src" width="72px" height="30px">
                <!--<div v-show="ok1" class="prompt1">{{phonemsg}}</div>
                <div v-show="ok2" class="prompt2">{{codemsg}}</div>
                <div v-show="ok3" class="prompt3">{{pswmsg1}}</div>
                <div v-show="ok4" class="prompt4">{{pswmsg2}}</div>-->
                <mt-button type="default" class="m-top40" @click="login2" size="large">登录</mt-button>
            </mt-tab-container-item>
        </mt-tab-container>
        <p class="forget"><router-link to="register">立即注册</router-link><router-link to="findPsw">忘记密码</router-link></p>
    </div>
</template>

<script>
    import myHeader from 'components/header2'
    import api from 'api/api'
    import { Toast,Indicator } from 'mint-ui';
    export default {
        data() {
            return {
               db: false,
               flag: false,
               timerIndex: 60,
               getCodetext: '发送验证码',
               phone: '',
               zcphone: '',
               imgcode: '',
               psw: '',
               code: '',
               selected: '1',
               src: '/app/getImgCode.htm'
            }
        },
        components: {
          myHeader
        },
        methods: {
          //验证手机号
          checkMobile() {
            return api.postData('/app/verifyUser.htm',{userName: this.zcphone})
          },
          //验证图片验证码
          checkImgCode() {
            return api.postData('/app/verifyImgCode.htm',{imgCode: this.imgcode})
          },
          //发送短信验证码
          sendCode() {
            self = this;
            return api.postData('/app/sendSmsCode.htm', {
                        mobile: this.zcphone,
                        business: 'login',
                        imgCode: this.imgcode
                      }).then(function (data) {
                        if (data.code != 1) {
                          Toast(data.message);
                          return false;
                        } else {
                          Toast(data.message);
                          self.flag = true;
                          //进入倒计时
                          self.codeTimer();
                        }
                      })
          },
          sendMobilseCode() {
            //表单验证
            let self = this
            self.checkMobile()
              .then((data) => {
                if (data.code != 1) {
                  Toast(data.message)
                }else{
                  return self.checkImgCode()
                }
              })
              .then((data) => {
                //发短信
                if (data.code != 1) {
                  Toast(data.message)
                }else{
                  return self.sendCode()
                }
              })
              .catch((data) => {
                console.log(data.message)
              })

          },
            login() {
                let self = this;
                const formData = {
                    userName: self.phone,
                    passWord: self.psw,
                    ex: 'ex',
                    loginFromType:'WEIXIN_USER',
                    equipmentNo:''
                };
                if(!self.phone || !self.psw){
                  Toast('手机号或密码不能为空');
                  return false;
                }else{
                  Indicator.open('登录中...');
                  api.postData('/app/login.htm', formData).then(function(data){
                    Indicator.close();
                    if (data.code == 1){
                      self.$router.push('me');
                    } else{
                      Toast(data.message);
                      return false;
                    }
                  })
                }


            },
            getCode() {
                let self = this;
                if(!this.zcphone || this.zcphone.length !=11) {
                  Toast('请输入正确的手机号');
                  return false;
                }else if(!this.imgcode){
                  Toast('请输入图片验证码')
                  return false;
                }else{
                  self.sendMobilseCode()
                }

            },
            codeTimer() {
              let self = this
              if (self.timerIndex <= 1) {

                // 还原按钮
                // 隐藏倒计时层
                // 还原倒计时
                self.timerIndex = 60;
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
            login2() {
                let self = this;
                if(self.flag){
                  Indicator.open('登录中...');
                  api.postData('/app/quickLogin.htm',{mobile: self.zcphone, code: self.code, imgCode: self.imgcode}).then(function(data){
                    Indicator.close()
                    if (data.code != 1){
                      Toast(data.message);
                      return false;
                    }else{
                      Toast(data.message);
                      self.$router.push({path: '/me'})
                    }
                  })
                }else{
                  Toast('请输入完整的信息')
                }

            },
            freshImg() {
                this.src = '/app/getImgCode.htm?dateTag=' + new Date().getTime();
            },


        }
    }
</script>

<style lang="less">
    #login{
        padding: 0 10px;
    }
    label{
        margin-bottom: 0px;
    }
    .mint-button--default{
        background-color: #a51612;
        color: #fff;
    }
    .mint-tab-item-label{
        font-size: 14px;
    }
    .mint-navbar{
        .mint-tab-item{
            font-size: 14px;
            color: #333;
            &.is-selected{
                color: #a51612 !important;
                 border-bottom-color: #a51612;
             }
        }
    }
    .mint-field-other{
        left: 0;
      right: auto;
        top:auto;
    }
    .mint-field-core{
        width: 80%;
        margin-left: 40px;
    }
    .checkimg{
        position: absolute;
        right: 0;
        bottom: 140px;
    }
    .forget{
        display: flex;
        justify-content: space-between;
        color: #00a0e9;
    }
    #getCode{
        position: absolute;
        right: 0;
        top: 108px;
        height: 25px;
        line-height: 25px;
        color: #00a0e9;
        border: none;
        background: none;
        border-left: 1px solid #eee;
        padding: 0 10px;
    }
</style>
