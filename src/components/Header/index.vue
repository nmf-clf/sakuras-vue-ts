<!--
 * @Author: niumengfei
 * @Date: 2022-04-12 15:56:02
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-17 16:48:07
-->
<template>
  <el-header :class="'myHeader' + (' myHeader-' + deviceType())">
    <div class="lf-box">
      <el-icon class='lf-select' :size="25" @click="openLeftSideBar"><Expand /></el-icon>
      <span class="lf-title">夜语清梦</span>
    </div>
    <SelectOption />
  </el-header>
  <MySideBar :isOpen="isOpen">
    <SelectOption v-if="isOpen" :showSearch="false" />
  </MySideBar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from "vuex";
// import { Expand } from '@element-plus/icons-vue'
import MySideBar from '../SideBar/index.vue'
import SelectOption from './component/SelectOption.vue'

const store = useStore();
/* 定义数据 */
const isOpen = ref(false)
/* 定义方法 */
let openLeftSideBar = () =>{ isOpen.value = !isOpen.value }
const deviceType = () => store.getters.deviceType;
</script>

<style lang="less" scope>
.myHeader{
  position: fixed;
  width: 100%;
  padding: 0.7rem 1.5rem;
  // border-bottom: 1px solid #eaecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  z-index: 999;
  // position: fixed;
  // width: 100%;
  .lf-box{
    display: flex;
    align-items: center;
    .lf-select{
      cursor: pointer;
    }
    .lf-title{
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      align-items: center;
      margin-left: 10px;
      min-width: 100px;
    }
  }
  
}
.myHeader:hover{
  background: #fff;
}
.myHeader-pc{
  .lf-select{
    display: none;
  }
}
.myHeader-mobile{
  .hidden-dropdown{
    display: none;
  }
}
</style>