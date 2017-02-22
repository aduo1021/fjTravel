<template>
    <div id="search">
        <div class="content">
            <input type="text" v-model="searchCont" ><span class="search-btn" @click="search">搜索</span>
        </div >
    </div>

</template>

<script>
  export default {
    data() {
      return {
        searchCont: ''
      }

    },
    methods: {
      search(){
        let self = this
        self.$router.push({name: 'product',query: {text: self.searchCont}})
      }
    }
  }
</script>

<style lang="less">
    #search{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 30px;
        z-index: 9;
        .content{
            overflow: hidden;
            padding-top: 5px;
            input{
                width: 80%;
                border-radius: 10px;
                vertical-align: center;
                margin-left: 10px;
                height: 25px;
                float: left;
                padding-left: 15px;
                background-color: rgba(110, 110,110, .5)
            }
           
            .search-btn{
                display: inline-block;
                float: left;
                margin-left: 5px;
                color: #a51612;
            }
        }
    }
</style>
