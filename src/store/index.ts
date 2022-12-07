import { createStore } from 'vuex'

// export default createStore({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
      userInfo: {
      }, //用户信息
    }
  },
  actions: {
    setWidthAndHeight({ commit }, value){
      commit('SET_WIDTH_AND_Height', value)
    },
    saveUserInfo({ commit }, value){
      commit('SAVE_USER_INFO', value)
    }
  },
  mutations: {
    SET_WIDTH_AND_Height(state: any, value){
      state.screenWidth = value[0]
      state.screenHeight = value[1]
    },
    SAVE_USER_INFO(state: any, value){
      state.userInfo = value
    }
  },
  getters: {
    deviceType(state: any){
      /*  (()=>{
        let power = this.$store.state.screenWidth / 375; //以iphoneX(宽度375px)为基准
        let bigSize = 10 * power;  //设置rem基准单位, 在iphoneX上 bigSize = 10px = 1rem
        let realSize = bigSize > 40 ? '40px' : bigSize + 'px'; //浏览器最大字体为40px
        document.documentElement.style.fontSize = realSize;
      })() */
      return state.screenWidth > 700 ? 'pc' : 'mobile'
    }
  }
})

export default store;
