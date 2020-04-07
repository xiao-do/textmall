<template>
    <div class="goods-info" v-if="Object.keys(detailInfo).length !== 0">
      <div class="info-desc clear-fix">
        <div class="start">
        </div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
        <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodsInfo",
      props:{
          detailInfo:{
            type:Object,
            default(){
              return{}
            }
          }
      },
      data(){
          return{
            counter:0,
            imagesLength:0
          }
      },
      methods:{
          imgLoad(){
            if(++this.counter === this.imagesLength)
            this.$emit("imageLoad")
          }
      },
      watch:{
          detailInfo(){
            this.imagesLength = this.detailInfo.detailImage[0].list.length
          }
      }
    }
</script>

<style scoped>
  .goods-info {
    margin-top: 20px;
  }

  .info-desc {
    padding: 0 15px;
  }
  .desc{
    margin-bottom: 3px;
    font-size: 14px;
    padding: 15px 0;
  }
  .start{
    margin-bottom: 3px;
  }
  .start,
  .end {
    width: 90px;
    height: 2px;
    background: #a3a3a5;
    position: relative;
  }
  .start::before,
  .end::after {
    width: 5px;
    height: 5px;
    background: #a3a3a5;
    position: absolute;
    bottom: 0;
    content: "";
  }
  .start {
    float: left;
  }
  .end::after {
    right: 0;
  }
  .end {
    float: right;
  }
  .info-key{
    font-size: 18px;
    margin: 5px 0 0 15px;
  }
  .info-list img{
    width: 100%;
  }
</style>
