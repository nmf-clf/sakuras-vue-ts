<!--
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-20 11:44:09
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
// import NProgress from 'nprogress';
// import 'nprogress/nprogress.css'
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false, minimum: 0 });

const store = useStore();
const _fontSize = 17;
store.dispatch('user/setFontSize', _fontSize); // 通过 getter 获取字体大小，如果不使用 dispatch 直接修改 store.state数据 是无效的

const font_size = () => store.getters.userInfo.fontSize; 

console.log(`设备类型: ${store.getters.deviceType} | 字号: ${store.getters.userInfo.fontSize}`);

onMounted(()=>{
    document.documentElement.style.fontSize = font_size() + 'px'; // 设置文本默认字体
    /* 监听视图宽度和高度的变化 */
    window.addEventListener('resize', ()=>{
        let wh = [document.documentElement.clientWidth, document.documentElement.clientHeight]
        store.dispatch('user/setWidthAndHeight', wh)
    })
    /* 设置顶部进度条 */
    setTimeout(() => {
        // let percent = 0;
        // let loadingProgress =  Utils.debounce(()=>{
        //     // 处理顶部进度条
        //     let scrollTop = document.documentElement.scrollTop; // 获取当前滚动距离
        //     percent = scrollTop / hiddenHeight; // 获取滚动进度百分比
        //     let _p = Number(percent.toFixed(2));
        //     if(!_p){
        //         console.log('scroll:0');
        //         NProgress.set(0);
        //     }else{
        //         if(_p > 0.99){
        //             console.log('scroll:end');
        //             NProgress.set(0.999);
        //         }else{
        //             console.log('scroll:ing');
        //             NProgress.set(Number(percent.toFixed(2)));
        //         }
        //     }
           
        // }, 100)
        // let scrollHeight = document.documentElement.scrollHeight; // 获取文档总高度
        // let clientHeight = document.documentElement.clientHeight; // 获取窗口高度
        // let hiddenHeight = scrollHeight - clientHeight; // 获取隐藏高度
        window.addEventListener('scroll', ()=>{
            // loadingProgress(); // 防抖处理顶部进度条
            // 处理md预览 目录
            let SkMdPreviewDOM = document.documentElement.getElementsByClassName('sk-md-preview')[0];
            if(document.documentElement.scrollTop >= 19 * _fontSize){ // 19 * _fontSize 为图片高度  19 是图片 rem
                SkMdPreviewDOM?.classList.add('sk-preview-fixed');
            }else{
                SkMdPreviewDOM?.classList.remove('sk-preview-fixed');
            }
        })
        // console.log('文档总高度>>', scrollHeight);
    }, 500); // 300毫秒等待DOM API可以获取到最新的 高度 ，暂时不清楚为何 DOM挂载完毕，API获取的不是最新的
}) 

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

</style>
