<!--
 * @Author: niumengfei
 * @Date: 2022-04-24 16:50:58
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 16:42:38
-->
<template>
  <div :class="'sideBar ' + activeClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
/* computed 函数会先于 onMounted 执行 */
const props = defineProps({
    isOpen: Boolean,
});

const store = useStore();

let activeClass = computed(()=>{ //计算属性回调不接收值 
    if(store.getters.deviceType == 'mobile'){
        return props.isOpen ? 'sideBar_active' : ''
    }
    return ''
})

onMounted(() => {
   /* 监视点击事件 */
   document.addEventListener('mouseup', (e) => {
        let sideBar = document.querySelector('.sideBar') //选择返回的第一个出现的元素
        if (sideBar) {
            if (!sideBar.contains((event as any).target)) { //判断某个元素不是目标元素的子元素 即目标元素以外的区域
                console.log('outside sideBar...');
                sideBar.className = 'sideBar'
            }
        }
    })
})

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