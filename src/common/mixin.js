import {debounce} from "./utils";


export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null
    }
  },
  mounted() {
    //this.$refs.scroll.refresh对这个函数进行防抖操作
    const refresh = debounce(this.$refs.scroll.refresh,100)

    //对监听的事件进行保存
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  }
}

export const backTopMixin = {
  data(){
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}
