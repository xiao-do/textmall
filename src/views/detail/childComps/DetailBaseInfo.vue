<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="services" >
      <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
      props:{
          goods:{
            type:Object,
            default(){
              return {}
            }
          }

      }
    }
</script>

<style scoped>
.base-info{
  margin-top: 15px;
  padding: 0 8px;
  color: #999999;
  border-bottom: 5px solid #f2f5f8;
}
  .info-title{
    color: #222;
  }
  .info-price{
    margin-top: 10px;
  }
  .info-price .n-price{
    font-size: 24px;
    color: var(--color-high-text);
  }
  .info-price .o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration:line-through ;
    color: #a8a5a5;
  }


.discount {
  padding: 4px 6px;
  border-radius: 8px;
  background-color: var(--color-tint);
  margin-left: 4px;
  font-size: 11px;
  color: #fff;
  position: relative;
  top: -7px;
}
.info-other {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.services {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}

.info-services-item img {
  position: relative;
  top: 2px;
  width: 14px;
  height: 14px;
}

.info-services-item span {
  font-size: 13px;
  margin-left: 5px;
  color: #333333;
}
</style>
