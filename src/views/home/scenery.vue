<template>
    <div id="scenery">
        <myHeader title="诗橙精华" backUrl="index"></myHeader>
        <div class="content" v-for="list in items" @click="toDetail(list.scenicId)">
            <img :src=list.imagePath1 height="110px" width="100%" :alt=list.name>
            <p class="title"><img src="../../assets/icon-jing.png" width="18px" >{{list.name}}</p>
            <p class="am-margin-0 detail">{{list.note}}</p>
        </div>
        <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
        
        <myFooter></myFooter>
    </div>
</template>

<script>
    import myHeader from 'components/header2'
    import myFooter from 'components/footer'
    import { Indicator } from 'mint-ui'
    import api from 'api/api'
    export default {
        components: {
            myHeader,
            myFooter
        },
        data() {
            return {
                items: '',
                loadStatus: false,
                page: 1
            }
        },
        methods: {
            toDetail(id) {
                this.$router.push({ name: 'sceneryDetail', query: { id: id }})
            },
            fetchData() {
                self = this
                Indicator.open('加载中...');
                api.postData('/app/scenicList.htm',{pageNumber: self.page}).then((data) =>{
                    Indicator.close()
                    if(data.code == 1){
                        if(self.page>1){
                            self.items = self.items.concat(data.list)
                        }else{
                            self.items = data.list
                        }
                        if(data.list.length == 10){
                            self.loadStatus = true
                        }
                        if(self.page >= data.totalPage){
                            self.loadStatus = false
                        }
                        
                    }
                    
                })
            },
            loadMore() {
                this.page++
                this.fetchData()
            }
        },
        mounted() {
            this.fetchData()
        }
    }
</script>

<style lang="less">
    #scenery{
      background-color: #f6f6f6;
      overflow: hidden;
      min-height: 560px;
      padding: 50px 0;
      .content{
        margin: 10px;
        padding: 5px;
        background-color: #fff;
        .title{
          margin: 5px 0;
          img{
            margin-top: -4px;
          }
        }
        .detail{
          height: 26px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
}
}
</style>
