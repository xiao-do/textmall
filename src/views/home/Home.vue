<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"
                   ref="tabControl1" v-show="isTabFixed"
      ></tab-control>

      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recmmend-view :recommends="recommends"></recmmend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
        ref="tabControl2"
        ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>

      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>


    </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import HomeSwiper from  './childComps/HomeSwiper'
  import RecmmendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goods/GoodsList'
  import BackTop from '@/components/content/backtop/BackTop'

  import {getHomeMultidata,getGoods} from "@/network/home"
  import {debounce} from "@/common/utils";
  import {itemListenerMixin,backTopMixin} from "@/common/mixin";
  import Scroll from '@/components/common/scroll/Scroll'

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecmmendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        banners: [],
        recommends: [],
        goods:{
          "pop":{page:0,list:[]},
          "new":{page:0,list:[]},
          "sell":{page:0,list:[]}
        },
        currentType: 'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0);

      this.$refs.scroll.refresh()
    },
    deactivated(){
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY();
      //取消全局事件监听
      this.$bus.$off("itemImageLoad", this.itemImgListener)
    },
    created() {
      // 请求多个数据
      this.getHomeMultidata()

      // 请求商品数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')

    },
    mounted(){

    },

    methods:{
      /**
       * 事件监听相关的方法*/


      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position){
        //1.判断返回顶部是否显示
        this.isShowBackTop = (-position.y) > 1000

        //2.决定吸顶问题
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关的方法**/
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getGoods(type){
        const page = this.goods[type].page + 1
        getGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          //完成上啦加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top:44px;*/
    height: 100vh;
    position: relative;
  }
.home-nav{
  /*position: fixed;*/
  /*top: 0;*/
  /*left: 0;*/
  /*right: 0;*/
  background: #eb3068;
  color: #ffffff;
  /*z-index: 9;*/
}
  .tab-control{
    position: relative;
    z-index: 9;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
