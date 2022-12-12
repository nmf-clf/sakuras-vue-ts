<!--
 * @Author: niumengfei
 * @Date: 2022-04-27 17:25:41
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 18:54:17
-->
<template>
  <div :class="'rg-options' + (' rg-options-' + deviceType())">
    <!-- 首页 -->
    <div class="hidden-dropdown">
      <span class="el-dropdown-link" @click="turnPage('/')">首页</span>
    </div>
    <!-- 学习笔记 -->
    <el-dropdown class="hidden-dropdown">
      <span class="el-dropdown-link" @click="openPage('https://sakuras.group/sakuras-docs/')">学习笔记</span>
    </el-dropdown>
    <!-- 个人中心 trigger="click"-->
    <el-dropdown class="hidden-dropdown">
      <span class="el-dropdown-link">个人中心
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="userInfo.username"><el-icon><user /></el-icon>{{userInfo.username}}</el-dropdown-item>
          <el-dropdown-item :divided="userInfo.username ? true : false" @click="loginOrOut('/login')">{{userInfo.username ? '注销' : '登录'}}</el-dropdown-item>
          <el-dropdown-item divided @click="toAdmin('/admin')">进入后台</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import UserStore from "@/store/modules/user";

const router = useRouter();
const store = useStore();
const deviceType = () => store.getters.deviceType;
const userInfo = store.getters.userInfo;

const openPage = (url: string) => window.open(url);

const turnPage = (path: string, pdfUrl?: string) =>{
    // context.emit('changeColor', '666')
    const datas = { 
        path,
        name: path.charAt(0) == '/' ? '' : path,  //(使用params传参时，必须使用name属性进行路由跳转，不能使用path配置项跳转)
        params: {
            pdfUrl
        }
    }
    router.push(datas)
}

const loginOrOut = (e: string) =>{
    if(userInfo.username){ //退出登录
        store.dispatch('user/saveUserInfo', {})
        ElMessage({
            message: '注销成功',
            type: 'success',
            center: true,
        })
    }else{
        turnPage(e)
    }
}

const toAdmin = (path: string) =>{
    router.push({ path })
}
</script>

<style lang="less" scope>
.rg-options{
  display: flex;
  .search{
    .search-input{
      // ::v-deep input{
      :deep(input){
        border-radius: 14px !important;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 15px;
    text-align: center;
    // color: var(--el-color-primary);
  }
 
}
.el-dropdown-menu__item{
  justify-content: center !important;
}
.rg-options-pc{
  align-items: center;
  .el-dropdown-link {
    margin-left: 25px;
  }
}
.rg-options-mobile{
  flex-direction: column;
  padding: 10px 0px 10px 20px;
  .hidden-dropdown{
    padding: 15px 0px;
    .el-dropdown-link {
      font-weight: bold;
    }
  }
}
</style>