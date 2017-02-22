<template>
    <div id="register">
        <myHeader title="注册" backUrl=""></myHeader>
        <div class="m-top40">
            <mt-field label="" v-model="phone" placeholder="请输入11位手机号" :attr="{maxlength: 11,required: true}" type="tel">
                <i class="c-red m-right5">*</i><img src="../../assets/icon-phone.png" width="50%" alt="">
            </mt-field>
            <mt-field label="" v-model="imgCode" placeholder="请输入图片验证码" type="tel" :attr="{maxlength: 4,required: true}">
                <i class="c-red">*</i>
                <img src="../../assets/icon-check.png" width="50%">
            </mt-field>
            <mt-field label="" v-model="code" placeholder="请输入短信验证码" :attr="{maxlength: 6,required: true}" type="tel">
                <i class="c-red m-right5">*</i><img src="../../assets/icon-email.png" width="50%" alt="">
            </mt-field>
            <mt-field label="" v-model="psw1" placeholder="设置密码" type="password">
                <i class="c-red m-right5">*</i><img src="../../assets/icon-psw.png" width="50%" alt="">
            </mt-field>
            <mt-field label="" v-model="psw2" placeholder="确认登录密码" type="password" class="bb-1px">
                <i class="c-red m-right5">*</i><img src="../../assets/icon-psw.png" width="50%" alt="">
            </mt-field>
            <button id="getCode" @click="getCode">{{getCodetext}}</button>
            <img class="checkimg" @click="freshImg" :src="src" width="72px" height="30px">
            <!--<div v-show="ok1" class="prompt1">{{phonemsg}}</div>
            <div v-show="ok2" class="prompt2">{{codemsg}}</div>
            <div v-show="ok3" class="prompt3">{{pswmsg1}}</div>
            <div v-show="ok4" class="prompt4">{{pswmsg2}}</div>-->
            <mt-button type="default" class="register-btn" @click="register" size="large">注册</mt-button>
            <p class="toLogin">已有账号？<span @click="toLogin">立即登录</span></p>
        </div>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import api from 'api/api'
  import { Toast,Indicator } from 'mint-ui';

  export default {
    data() {
      return {
        phone: '',
        code: '',
        psw1: '',
        psw2: '',
        imgCode: '',
        timerIndex: 60,
        flag: false,
        getCodetext: '获取验证码',
        src: '/app/getImgCode.htm'
      }
    },
    components: {
      myHeader
    },
    mounted() {

    },
    methods: {
        toLogin() {
            this.$router.push('login');
        },
        //刷新图片验证码
        freshImg() {
            this.src = '/app/getImgCode.htm?dateTag=' + new Date().getTime();
        },
        checkPsw() {
            let self = this
            if (!self.psw1 || !self.psw2) {
                Toast('请输入密码')
                return false;
            }else if(self.psw1 != self.psw2){
                Toast('两次输入的密码不一样')
                return false;
            }else{
                return true
            }
        },
        checkMobile() {
            return api.postData('/app/verifyUser.htm',{userName: this.phone})
        },
        //验证图片验证码
        checkImgCode() {
            return api.postData('/app/verifyImgCode.htm',{imgCode: this.imgCode})
        },
        sendCode() {
            self = this;
            return api.postData('/app/sendSmsCode.htm', {
                mobile: this.phone,
                business: 'register'
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
                      this.flag = true;
                    }
                })
                .catch((data) => {
                    console.log(data.message)
                })

        },
        getCode() {
            let self = this;
                if(!this.phone || this.phone.length !=11) {
                  Toast('请输入正确的手机号');
                  return false;
                }else if(!this.imgCode){
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
        register() {
            if(!this.flag){
                Toast('请输入正确的信息')
            }else if (this.checkPsw()) {
                Indicator.open('提交中...');
                api.postData('/app/registerSubmit.htm',{
                    userName: this.phone,
                    mobile: this.phone,
                    imgCode: this.imgCode,
                    logPassword: this.psw1,
                    code: this.code,
                    ex: 'ex'

                }).then((data) =>{
                    Indicator.close()
                    if (data.code != 1) {
                        Toast(data.message)
                    }else{
                        Toast({
                           message: '注册成功',
                           iconClass: 'icon icon-success'
                        });
                        this.$router.push('me')
                    }
                })
            }
        }
    }
  }
</script>

<style lang="less">
    label{
        margin-bottom: 0px;
    }
    .mint-field-other{
        right: auto;
        top:auto;
    }
    .mint-field-core{
        width: 80%;
        margin-left: 40px;
    }
    .register-btn{
        background-color: #a51612;
        color: #fff;
        margin: 40px 10px;
        width: 93%;
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
    .checkimg{
        position: absolute;
        right: 10px;
        top: 58px;
    }
    .toLogin{
        text-align: right;
        padding-right: 10px;
        span{
            color: #00a0e9;
        }
    }
</style>
