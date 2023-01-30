<!--
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-30 19:34:51
-->
<template>
	  <router-view />
    <!-- <div id="app" :class="'app-' + deviceType()">
        <router-view></router-view>
    </div> -->
    <!-- 按需加载时-使用全局配置size和zIndex的组件包裹跟组件 -->
    <!--  <el-config-provider :size="size" :z-index="zIndex">
    <div id="app">
        <router-view></router-view>
    </div>
    </el-config-provider> -->
</template>

<script lang="ts" setup>
import { onMounted, nextTick } from 'vue';
import { useStore } from "vuex";
import { Utils } from "@/utils";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false, minimum: 0 });

const store = useStore();

onMounted(()=>{
    document.documentElement.style.fontSize = '18px'; // 设置文本默认字体
    /* 监听视图宽度和高度的变化 */
    window.addEventListener('resize', ()=>{
        let wh = [document.documentElement.clientWidth, document.documentElement.clientHeight]
        store.dispatch('user/setWidthAndHeight', wh)
    })
    /* 设置顶部进度条 */
    setTimeout(() => {
        let percent = 0;
        let _t =  Utils.debounce(()=>{
            console.log('sssssssssssss', percent, Number(percent.toFixed(2)));
            let _p = Number(percent.toFixed(2));
            if(!_p){
                console.log('0滚动');
                NProgress.set(0);
            }else{
                if(_p > 0.99){
                    console.log('滚动到头了');
                    NProgress.set(0.999);
                }else{
                    console.log('继续滚动');
                    NProgress.set(Number(percent.toFixed(2)));
                }
            }
           
        }, 100)
        let scrollHeight = document.documentElement.scrollHeight; // 获取文档总高度
        let clientHeight = document.documentElement.clientHeight; // 获取窗口高度
        let hiddenHeight = scrollHeight - clientHeight; // 获取隐藏高度
        console.log('隐藏高度::', hiddenHeight);
        window.addEventListener('scroll', ()=>{
            let scrollTop = document.documentElement.scrollTop; // 获取当前滚动距离
            percent = scrollTop / hiddenHeight; // 获取滚动进度百分比
            // console.log('percent::', scrollTop, hiddenHeight, percent);
            _t();
        })
    }, 300);
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

#nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 50% !important;
    right: 50% !important;
}
</style>
