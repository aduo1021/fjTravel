<template>
    <div id="home">
        <!--<myHeader></myHeader>-->
        <!--<mySearch></mySearch>-->
        <div style="height: 180px;">
            <mt-swipe>
                <mt-swipe-item v-for="item in imgs"><a :href=item.linkUrl><img :src=item.imgUrl height="100%" width="100%"></a></mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="nav am-padding-sm">
            <router-link to="scenery">
                <img src="../../assets/home-icon-1.png" width="47px" alt="">
                <p>诗橙精华</p>
            </router-link>
            <router-link to="cate">
                <img src="../../assets/home-icon-2.png" width="47px" alt="">
                <p>诗橙尝鲜</p>
            </router-link>
            <router-link to="hotel">
                <img src="../../assets/home-icon-3.png" width="47px" alt="">
                <p>夜宿诗橙</p>
            </router-link>
            <router-link to="travel">
                <img src="../../assets/home-icon-4.png" width="47px" alt="">
                <p>畅游诗橙</p>
            </router-link>
        </div>
        <div class="recommend">
            <p class="title">奉节景区</p>
            <div class="content" v-for="item in slist" @click="toProduct(item.scenicId,item.name)">
                <img :src=item.imagePath1 alt="" width="100%" height="120px">
                <p class="name">{{item.cityName}} - {{item.name}}</p>
            </div>
        </div>
        <myFooter></myFooter>
    </div>
</template>

<script>
    import myHeader from 'components/header';
    import myFooter from 'components/footer';
    import mySearch from 'components/search';
    import { Indicator } from 'mint-ui';
    import api from 'api/api'
    export default {
        data() {
            return {
                imgs: '',
                slist: '',
                sceneryList: [],
                sceneryIdList: []
            }
        },
        components: {
            myHeader,
            myFooter,
            Indicator,
            mySearch
        },
        methods: {
          toProduct(id,name) {
            this.$router.push({ name: 'product' , query: {scenicId: id,name: name} });
          },
          loadImgs() {
            return  api.postData('/app/indexImg.htm', {type: 'WEIXIN_BANNER'})
          },
          loadScenicList() {
            return  api.getData('/app/scenicList.htm')
          }
        },
        mounted() {
            self = this
            Indicator.open('加载中...');
            Promise.all([self.loadImgs(),self.loadScenicList()]).then((data) =>{
                self.imgs = data[0].list;
                self.slist = data[1].list;
                Indicator.close()
                for(let i=0; i<self.slist.length; i++){
                  self.sceneryList.push(self.slist[i].name)
                  self.sceneryIdList.push(self.slist[i].scenicId)
                }
                api.setSession('scenList',self.sceneryList)
                api.setSession('scenId',self.sceneryIdList)

            })
        }
    }
</script>

<style lang="less" type="text/css">
    #home{
        background-color: #f6f6f6;
        .nav{
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            text-align: center;
            p{
                font-size: 10px;
                color: #333;
                line-height: 30px;
                margin: 0 !important;
            }
        }
        .recommend{
            margin: 10px auto;
            padding: 10px;
            padding-bottom: 50px;
            background-color: #fff;
            height: 100%;
            p{
                margin: 0;
            }
            .title{
                color: #a51612;
                font-size: 13px;
                border-left: 2px solid #a51612;
                text-indent: 5px;
                margin: 10px auto;
            }
            .content{
                position: relative;
                overflow: hidden;
                margin-bottom: 10px;
                .name{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    height: 22px;
                    line-height: 22px;
                    color: #fff;
                    font-size: 12px;
                    font-weight: bold;
                    text-indent: 10px;
                    background-color: rgba(57,57,57,.5);
                    width: 100%;
                }
            }
        }
    }

</style>
