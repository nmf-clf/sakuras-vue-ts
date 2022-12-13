<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 15:54:42
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-13 19:56:52
-->
<template>
     <div class="admin-aside" >
            <el-scrollbar>
                <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="(isCollapse())"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>首页</span>
      </template>
      <!-- <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group> -->
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
            </el-scrollbar>
        </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from "vuex";
import { Document, Menu as IconMenu, Location, Setting, Message } from '@element-plus/icons-vue';
const store = useStore();
//坑点：vue3中使用store里的state数据，如果涉及到当前页面DOM更新的值，则需要通过函数形式使用
const isCollapse = () => store.state.admin.isCollapse;

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="less" scoped>
.admin-aside{
    display: block;
    position: absolute;
    left: 0;
    top: 3.5rem;
    bottom: 0;
    overflow-y: scroll;
    // .el-menu{
    //     width: 250px;
    // }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 250px;
        min-height: 400px;
    }
}
</style>