<template>

    <mt-header :fixed="true" class="theme" :title="title">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

</template>

<script>
  export default {
    data() {
        return {
          title: '奉节旅游服务平台'
        }

    }
  }
</script>

<style lang="less">
    .theme{
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
