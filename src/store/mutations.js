import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  //mutations唯一的目的就是修改state中的状态
  //mutations中的方法尽可能完成的事件不叫单一一点
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  }
}
