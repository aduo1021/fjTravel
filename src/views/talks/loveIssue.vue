<template>
    <div id="loveIssue">
        <myHeader title="爱的印记" backUrl="index"></myHeader>
        <div class="content">
            <mt-field label="男主角" v-model="boy" :attr="{ maxlength: 6 }" placeholder="请输入男主角"></mt-field>
            <mt-field label="女主角" v-model="girl" :attr="{ maxlength: 6 }" placeholder="请输入女主角"></mt-field>
            <mt-field label="星语星愿" v-model="loveCont" placeholder="50字内" type="textarea" rows="4"></mt-field>
        </div>
        <div class="footer">
          <mt-button size="large" @click="Issue">发布</mt-button>
        </div>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import {Indicator,Toast,MessageBox} from 'mint-ui'
  import api from 'api/api'
  import wxs from 'api/weixinService'
  export default {
    components: {
      myHeader,
    },
    data() {
      return {
        boy: '',
        girl: '',
        loveCont: '',
        wxList: ['chooseImage','uploadImage']
      }
    },
    methods: {
      Issue() {
        let self = this
        Indicator.open('提交中...');
        api.postData('/app/addMessageLoveWall.htm',{boy: self.boy, girl: self.girl, message: self.loveCont, image: 'img'}).then(function(data){
          Indicator.close()
          if (data.code == 1) {
            Toast(data.message)
            self.$router.push('loveMark')
          }else{
            MessageBox.alert(data.message).then((action) => {
              self.$router.push('login');
            });
          }
        })
      }
    },
    mounted() {
        wxs.weixinService().register(this.wxList)

      
    }
  }
</script>

<style lang="less">
    #loveIssue{
      background-color: #f6f6f6;
      overflow: hidden;
      min-height: 560px;
      padding: 40px 0 60px 0;
      label{ margin-bottom: 0; }
      .c-orange{
        color: #eb6100;
      }
      .content{
        .title{
          margin: 10px 5px;
          img{
            margin-top: -4px;
          }
        }
        .detail{
          display: flex;
          align-items: center;
          padding: 0 10px;
          .divide{
            border: 1px solid #eee;
            width: 100%;
            height: 1px;
          }
          .name{
            color: #a51612;
            width: 110px;
          }
        }
        .worlds{
          padding: 10px 5px;
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
