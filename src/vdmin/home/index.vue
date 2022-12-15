<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-15 17:25:01
-->
<template>
    <div class="admin-layout">
        <!-- 顶部 -->
        <Header />
        <!-- 侧边栏 -->
        <SideBar />
        <!-- 内容 -->
        <div class="admin-main" :class="{ 'to-lf': isCollapse() }">
            <Tags />
           
            <div class="content">
                <router-view v-slot="{ Component }">
                    <!-- <transition name="move" mode="out-in"> -->
                        <keep-alive :include="[]">
                            <component :is="Component"></component>
                        </keep-alive>
                    <!-- </transition> -->
                </router-view>
            </div>
        </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "./Header.vue";
import SideBar from "./SideBar.vue";
import Tags from "./Tags.vue";
import { useStore } from "vuex";

const store = useStore();
const isCollapse = () => store.state.admin.isCollapse;

const tags = store.state.admin.tags;
</script>

<style lang="less" scoped>
@import '@/styles/index';

.admin-layout{
    width: 100%;
    height: 100%;
    overflow: hidden;
    ::-webkit-scrollbar {
        width: 0;
    }
    .admin-main{
        position: absolute;
        left: 200px;
        right: 0;
        top: 3.5rem;
        bottom: 0;
        // padding-bottom: 30px;
        transition: left .3s ease-in-out;
        background: #f0f0f0;
        padding-bottom: 30px; //坑点：取消会有滚动条问题
        .el-scrollbar{
            // padding: 10px 0;
        }
        .content{
            width: auto;
            height: 100%;
            padding: 10px;
            overflow-y: scroll;
            box-sizing: border-box;
            // background: yellowgreen;
        }
    }
    .to-lf{
        left: 65px;
    }
    
}

</style>