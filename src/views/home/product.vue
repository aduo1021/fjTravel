<template>
    <div id="product">
        <myHeader title="商品列表" backUrl=""></myHeader>
        <div class="select">
          <div class="scenery" @click="getPicker">
            {{mydefault[0]}}
          </div>
          <div class="type" @click="getPicker">
            {{mydefault[1]}}
          </div>
          <div class="sort" @click="getPicker">
            {{mydefault[2]}}
          </div>
        </div>
        <div class="list">
          <div class="content" v-for="items in productList" @click="toDetail(items.supplierId,items.saleTypeHotels)">
            <img :src=items.bigProductImg[0] height="135px" width="100%" >
            <div class="am-margin-top-xs fs14 pname">{{items.productName}}</div>
            <div class="c-orange">&yen;{{items.price1}}<span class="old-price">&yen;{{items.marketPrice}}</span></div>
            <div class="c-999 fs14 pname">{{items.storeName}}</div>
          </div>  
        </div>
        <p class="am-margin-vertical-xs am-text-center" v-show="loadStatus" @click="loadMore">点击加载更多</p>
        <mt-popup  v-model="popupVisible"  position="bottom" popup-transition="popup-fade">
          <mt-picker :slots="slots" :showToolbar="true" @change="changeValues">
            <span class="mint-datetime-action mint-datetime-cancel" @click="popupVisible = false">取消</span>
            <span class="mint-datetime-action mint-datetime-confirm" @click="confirm(1)" >确定</span>
          </mt-picker>
        </mt-popup>
        <myFooter></myFooter>
    </div>
</template>

<script>
  import myHeader from 'components/header2'
  import { Indicator,Toast } from 'mint-ui'
  import myFooter from 'components/footer'
  import api from 'api/api'
  export default {
    data() {
      return {
        scenicId: this.$route.query.scenicId,
        popupVisible: false,
        productList: '',
        loadStatus: false,
        index: '',
        page: 1,
        priceSort: '',
        saleCountSort: '',
        //mydefault: [((api.getSession('scenList')).split(','))[0],'全部','智能排序'],
        mydefault: [this.$route.query.name,'全部','智能排序'],
        chooseValues: [],
        slots: [
          {
            flex: 1,
            values: (api.getSession('scenList')).split(','),
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: ['全部', '吃一顿', '住一宿'],
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: ['智能排序', '销量排序', '价格排序'],
            className: 'slot5',
            textAlign: 'center'
          },
        ],
      }
    },
    components: {
      myHeader,
      myFooter
    },
    computed: {
      defaultScen: function() {
        return this.slots[0].values[0]
      }
    },
    methods: {
      getPicker() {
        let self = this;
        self.popupVisible = true;
      },
      changeValues(picker,values) {
        this.chooseValues = values
        if (!!!values[0]) {
          this.chooseValues[0] = this.slots[0].values[0]
        }
      },
      confirm(flag) {
        let self = this
        self.popupVisible = false;
        if(self.chooseValues != ''){
          self.mydefault = self.chooseValues;
        }
        if(flag){
          self.page = 1
        }
        //console.log(self.slots[0].values)
        for(var i=0; i<self.slots[0].values.length;i++){
          if(self.mydefault[0] == self.slots[0].values[i]){
            self.index = i;
          }
        }
        let scenIds = (api.getSession('scenId')).split(',')
        if(self.mydefault[1] == '吃一顿'){
          self.saleType = 'O2O'
        }else if(self.mydefault[1] == '住一宿'){
          self.saleType = 'HOTELS'
        }else if(self.mydefault[1] == '全部'){
          self.saleType = ''
        }
        if(self.mydefault[2] == '销量排序'){
          self.priceSort = ''
          self.saleCountSort = 'desc'
        }else if(self.mydefault[2] == '价格排序'){
          self.priceSort = 'asc'
          self.saleCountSort = ''
        }else if(self.mydefault[2] == '智能排序'){
          self.priceSort = ''
          self.saleCountSort = ''
        }

        self.fetchData(scenIds[self.index],self.saleType,self.priceSort,self.saleCountSort,self.page);
      },
      fetchData(id,type,priceSort,saleCountSort,page) {
        let self = this
        if(!page){
          page = 1
        }
        Indicator.open('加载中...');
        api.postData('/app/b2cProductList.htm', {scenicId: id,saleType: type,priceSort: priceSort,saleCountSort: saleCountSort,pageNumber: page}).then((data) =>{
          Indicator.close()
          if(data.code ==1 ) {
            
            if(page>1){
              self.productList = self.productList.concat(data.list)
            }else{
              self.productList = data.list
            }
            if(data.list.length == 10){
              self.loadStatus = true
            }
            if(self.page >= data.totalPage){
              self.loadStatus = false
            }
            
            if(data.list == ''){
              Toast('暂时没有商品')
            }
          }else{
            Toast(data.message)
          }
        })
      },
      toDetail(id,saleType) {
        if(saleType == 'YES'){
          this.$router.push({name: 'hotelDetail',query: {id: id}})
        }else{
          this.$router.push({name: 'cateDetail',query: {id: id}})
        }
      },
      loadMore() {
        this.page++
        this.confirm()
      }
    },
    
    mounted() {
      this.fetchData(this.scenicId)
    }
  }
</script>

<style lang="less">
  #product{
    background-color: #f6f6f6;
    min-height: 570px;
    padding: 40px 0 50px 0;
    .c-orange{color: #eb6100;}
    .c-999{ color: #999; }
    .old-price{color: #666; text-decoration: line-through; font-size: 10px;}
    .mint-popup-bottom{ width: 100%; }
    .picker-toolbar{ border-bottom: 1px solid #eee; }
    .select{
      display: flex;
      position: fixed;
      width: 100%;
      justify-content: space-between;
      background-color: #fff;
      .scenery,.type,.sort{
        flex: 1;
        text-align: center;
        height: 40px;
        overflow: hidden;
        line-height: 40px;
        border: 1px solid #eee;
        position: relative;
        background: url('../../assets/icon-sanjiao.png') right bottom no-repeat;
        background-size: 6px 6px;
      }

    }
    .list{
      margin: 5px;
      margin-top: 45px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      background-color: #f6f6f6;
      .content{
        width: 46%;
        padding: 5px;
        background-color: #fff;
        .pname{
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
</style>
