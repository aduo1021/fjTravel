<template>

    <mt-tabbar :fixed="true">
      <router-link to="index" class="mint-tab-item">
        <mt-tab-item id="home" class="am-padding-0">
          <!--<img slot="icon" src="../assets/nav-icon-home.png">-->
          <i class="am-icon-home am-icon-md"></i>
          <div>首页</div>
        </mt-tab-item>
      </router-link>

      <router-link to="talks" class="mint-tab-item">
        <mt-tab-item id="talks" class="am-padding-0">
          <!--<img slot="icon" src="../assets/nav-icon-list.png">-->
          <i class="am-icon-th-large am-icon-md"></i>
          <div>万花筒</div>
        </mt-tab-item>
      </router-link>

      <router-link to="me" class="mint-tab-item">
        <mt-tab-item id="me" class="am-padding-0">
          <!--<img slot="icon" src="../assets/nav-icon-me.png">-->
          <i class="am-icon-user am-icon-md"></i>
          <div>我的</div>
        </mt-tab-item>
      </router-link>
    </mt-tabbar>

</template>

<script>
  export default {
    methods: {

    }
  }
</script>

<style lang="less">
  a{
    color: #999;
  }
  .router-link-active{
    .mint-tab-item-label{
      color: #a51612;
    }
  }
</style>
