<template>

    <mt-header :fixed="true" class="login" :title=title >
        <a slot="left">
            <mt-button icon="back" @click="back" ></mt-button>
        </a>
        <!--<mt-button icon="more" slot="right"></mt-button>-->
    </mt-header>

</template>

<script>
  export default {
    data() {
      return {
        //backUrl: backUrl
      }

    },
    props: ['title','backUrl'],
    methods: {
      back(){
        //this.$router.back()
        let self = this
        console.log(self.backUrl)
        if (self.backUrl == '') {
            self.$router.back();
        }else{
            self.$router.push({name: self.backUrl});
        }
      },
    }
  }
</script>

<style lang="less">
    .login{
        background-color: #faf9f9;
        color: #393a3f;
    }
    .bgc-2{
        background-color: #393a3f;
    }
    .mint-header{
        label{
            margin-bottom: 0;
        }
        .mint-header-title{
            margin: 0;
            font-size: 16px;
        }
    }
</style>
