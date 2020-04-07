<template>
    <div class="bottom-bar">
      <div class="check-content">
        <check-button @click.native="checkClick" :is-checked="isSelectAll" class="check-button"/>
        <span>全选</span>
      </div>
      <div class="price">
      合计: {{totaPrice}}
    </div>
      <div class="calculate" @click="calculateClick">
        去计算({{checkLength}})
      </div>
    </div>
</template>

<script>
  import CheckButton from '@/components/content/checkButton/CheckButton'
  import { mapGetters } from "vuex"
    export default {
        name: "CartBottomBar",
      components:{
        CheckButton
      },
      computed:{
        ...mapGetters(["cartList"]),
        totaPrice(){
          return  "¥" + this.cartList.filter(item => {
            return item.checked
          }).reduce((preValue,item) => {
            return preValue + item.price * item.count
          },0).toFixed(2)
        },
        checkLength(){
          return this.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
          // isSelectAll是判断全选按钮的计算属性
          // 默认为不选中
          if(this.cartList.length === 0) return false
          //第一种办法
          // return !(this.cartList.filter(item => !item.checked).length)
          //第二种办法
          return !this.cartList.find(item => !item.checked)
          //第三种办法
          // for(let item of this.cartList){
          //   if(!item.checked){
          //     return false
          //   }
          // }
          // return true
        }
      },
      methods:{
        checkClick(){
          if(this.isSelectAll){//这里是判断是全部选中
            this.cartList.forEach(item => item.checked = false)
          }else {//这里是不选中
            this.cartList.forEach(item => item.checked = true)
          }
        },
        calculateClick(){
          if(!this.isSelectAll){
            this.$toast.show("请求选择购买的商品",1500)
          }
        }
      }
    }
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background: #eeeeee;
    position: relative;
    bottom: 134px;
    line-height: 40px;
    display: flex;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }
  .check-button{
    width: 18px;
    height: 18px;
    line-height: 18px;
    margin-right: 5px;
  }

  .price{
    margin-left: 20px;
    font-size: 16px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background: orangered;
    color: #ffffff;
    text-align: center;
    font-size: 16px;
  }
</style>
