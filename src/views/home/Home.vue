<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import {getHomeMultidata} from "@/network/home";

  export default {
    name: "Home",
    data(){
      return {
        banners: [],
        dKeywords: []
      }
    },
    components:{
        NavBar
    },
    created() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list
        this.dKeywords = res.data.dKeyword.list
      })
    }
  }
</script>

<style scoped>
.home-nav{
  background: #eb3068;
  color: #ffffff;
}
</style>
