<!--
 * @Author: niumengfei
 * @Date: 2022-04-24 16:50:58
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-10 16:01:22
-->
<template>
  <div :class="'sideBar ' + activeClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
// export default {
//     name: 'SideBar',
//     props: ['isOpen'],
//     setup(props, context) {
      const store = useStore();
      /* 定义属性 */
      let isInit = ref(false) //初始化为false，如果侧边栏点击过则置为true
      /* 计算属性 */
      let activeClass = '' || computed(()=>{ //计算属性回调不接收值
        if(store.getters.deviceType == 'mobile'){
          /* if(props.isOpen) isInit.value = true //若点击过/父组件传递为true 则置为true
          if(isInit.value){ //如果点击过/默认为true 则自动展开侧边栏
            return props.isOpen ? 'animate__animated animate__slideInLeft' : 'animate__animated animate__slideOutLeft'
          }
          return '' */
          // return props.isOpen ? 'sideBar_active' : ''
        }
        return ''
      })
      /* 返回对象 */
//       return {
//         activeClass
// 			}
//     }
// }
</script>

<style lang="less" scope>
.sideBar{
  position: absolute;
  width: 14rem;
  z-index: 999;
  top: 3.5rem;
  bottom: 0px;
  border-right: 1px solid #e6dfdf;;
  background: #fff;
  /* 方案1 */
  // transform: translateX(-100%);
  // transition: transform .2s ease
  /* 方案2 */
  left: -100%;
  transition: left linear 0.2s;
}
.sideBar_active{
  /* 方案1 */
  // transform: translateX(0);
  /* 方案2 */
  left: 0;
}
</style>