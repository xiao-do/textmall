<template>
    <div ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      props:{
        probeType:{
          type:Number,
          default:0
        },
        pullUpLoad:{
          type:Boolean,
          default:false
        }
      },
      data(){
          return{
            scroll:null
          }
      },
      mounted() {
          // 1.穿件Bscroll实例
          this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad: this.pullUpLoad
          })
        // 2.监听滚动的位置
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll",position)
        })

          // 3.监听上啦加载更多
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp")
        })
      },
      methods:{
          scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
          },
        finishPullUp(){
            this.scroll && this.scroll.finishPullUp()

        },
        refresh(){
          // console.log("---");
          this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        },
        scrollToElement(el, time, x, y) {
          this.scroll && this.scroll.scrollToElement(el, time, x, y);
        }

      }
    }
</script>

<style scoped>

</style>
