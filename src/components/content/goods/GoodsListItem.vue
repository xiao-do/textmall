<template>
    <div class="good-list-item" @click="itemClick">
      <img v-lazy="showImages" alt="" @load="imageLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
      props:{
          goodsItem:{
            type:Object,
            default(){
              return {}
            }
          }
      },
      computed:{
          showImages(){
            return  this.goodsItem.image || this.goodsItem.show.img
          }
      },
      methods:{
          imageLoad(){
            this.$bus.$emit("itemImageLoad")
          },
        itemClick(){
            this.$router.push("/detail/" + this.goodsItem.iid)
        }

      }
    }
</script>

<style scoped>
  .good-list-item {
    width: 48%;
  }
  .good-list-item img {
    width: 100%;
    border-radius: 5px;
    /*border: 1px solid var(--color-tint);*/
  }
  .good-list-item p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
    text-align: center;
  }
  .goods-info {
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }
  .goods-info .price {
    color: #eb3068;
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
