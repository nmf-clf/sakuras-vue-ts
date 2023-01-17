<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 15:54:42
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-17 10:59:41
-->
<template>
     <div class="admin-aside" >
        <el-scrollbar>
            <el-menu
                :default-active="currentBarkey()"
                class="el-menu-vertical-demo"
                :collapse="isCollapse()"
            >
                <!-- 一级菜单 -->
                <template v-for="v1 in sideBarList">
                    <template v-if="v1.subs">
                        <!-- 开始递归渲染 -->
                        <sideBarItem :subItems="v1" />
                    </template>
                    
                    <template v-else>
                        <el-menu-item :index="v1.path" @click="handleClick(v1)"> <!-- 一级菜单标题 -->
                            <el-icon><component :is="v1.icon"></component></el-icon>
                        <template #title>{{v1.title}}</template>
                        </el-menu-item>
                    </template>
                </template>
                
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType, DefineComponent } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Document, Menu as IconMenu, Location, Setting, Message, HomeFilled } from '@element-plus/icons-vue';
import { Utils } from "@/utils";
import sideBarItem from "./SideBarItem.vue";

interface PathsType {
    path: string,
    title: string,
    icon: DefineComponent,
    disabled?: boolean,
    subs?: PathsType[],
}

const store = useStore();
const route = useRoute();
const router = useRouter();
//坑点：vue3中使用store里的state数据，如果涉及到当前页面DOM更新的值，则需要通过函数形式使用
const isCollapse = () => store.state.admin.isCollapse;
const currentBarkey = () => {
    return route.path
};

const sideBarList = [{
    title: '首页',
    name: 'AdminHome',
    path: '/admin/index',
    icon: HomeFilled,
},{
    title: '文章管理',
    name: 'AdminArticle',
    path: '/admin/article',
    icon: IconMenu,
},{
    title: '统计模块',
    path: '/admin/statistics',
    disabled: true,
    icon: Document,
},{
    title: '功能模块',
    icon: Setting,
    path: '5',
    subs: [{
        title: 'Markdown编辑器',
        name: 'AdminMarkdown',
        path: `/admin/writter/markdown/${Utils.utoa(JSON.stringify({ noneHeader: true }))}`,
        icon: Message,
    },{
        title: '富文本编辑器',
        name: 'AdminEditor',
        path: '/admin/writter/editor',
        icon: Message,
    }]
},{
    title: '设置',
    icon: Setting,
    path: '4',
    subs: [{
        title: '密码相关',
        icon: Message,
        path: '4-1',
        subs: [{
            title: '修改密码',
            path: '/admin/repassword',
            icon: Location,
        }]
    },{
        title: '退出登录',
        path: '/admin/logout',
        icon: Message,
    }]
}]

const handleClick = (params: any) => {
    router.push(params.path)
    store.dispatch('admin/addTags', {
        title: params.title,
        path: params.path,
        name: params.name,
    })
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
    //     width: 200px;
    // }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
}
</style>

<!-- <el-sub-menu v-if="false" :index="v1.path">
    <template #title> 
        <el-icon><component :is="v1.icon"></component></el-icon>
        <span>{{v1.title}}</span>
    </template>
    <template v-for="v2 in v1.subs">
        <template v-if="v2.subs">
            <el-sub-menu :index="v2.path">
                <template #title>
                    <el-icon><component :is="v2.icon"></component></el-icon>
                    <span>{{v2.title}}</span>
                </template>
                <template v-for="v3 in v2.subs">
                    <el-menu-item :index="v3.path" @click="handleClick(v3.path)">
                        <el-icon><component :is="v3.icon"></component></el-icon>
                        <template #title>{{v3.title}}</template>
                    </el-menu-item>
                </template>
            </el-sub-menu>
        </template>

        <template v-else>
            <el-menu-item :index="v2.path" @click="handleClick(v2.path)"> 
                <el-icon><component :is="v2.icon"></component></el-icon>
                <template #title>{{v2.title}}</template>
            </el-menu-item>
        </template>
    </template>
</el-sub-menu> -->