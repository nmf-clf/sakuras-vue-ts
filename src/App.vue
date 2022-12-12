<!--
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 16:07:58
-->
<template>
    <div id="app" :class="'app-' + deviceType()">
        <router-view></router-view>
    </div>
    <!-- 按需加载时-使用全局配置size和zIndex的组件包裹跟组件 -->
    <!--  <el-config-provider :size="size" :z-index="zIndex">
    <div id="app">
        <router-view></router-view>
    </div>
    </el-config-provider> -->
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from "vuex";

const store = useStore();
onMounted(()=>{
    document.documentElement.style.fontSize = '16px';
    /* 监听视图宽度和高度的变化 */
    window.addEventListener('resize', ()=>{
        let wh = [document.documentElement.clientWidth, document.documentElement.clientHeight]
        store.dispatch('user/setWidthAndHeight', wh)
    })
}) 
console.log('设备类型::', store.getters.deviceType);

const deviceType = () => store.getters.deviceType;

/* 按需加载时-全局配置size和zIndex */
/* import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'large',
    }
  },
}) */
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
#nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 50% !important;
    right: 50% !important;
}
</style>
