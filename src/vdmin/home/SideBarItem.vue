<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 15:54:42
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-15 14:29:45
-->
<template>
    <el-sub-menu :index="subItems?.path">
        <template #title> <!-- 上一级菜单标题 -->
            <el-icon><component :is="subItems?.icon"></component></el-icon>
            <span>{{subItems?.title}}</span>
        </template>
        <!-- 下一级菜单 -->
        <template v-for="v2 in subItems?.subs">
            <template v-if="v2.subs">
                <!-- 递归渲染 -->
                <side-bar-item :subItems="v2" />
            </template>

            <template v-else>
                <el-menu-item :index="v2.path" @click="handleClick(v2)"> <!-- 下一级菜单标题 -->
                    <el-icon><component :is="v2.icon"></component></el-icon>
                    <template #title>{{v2.title}}</template>
                </el-menu-item>
            </template>
        </template>
    </el-sub-menu>
</template>

<script lang="ts" setup>
import { toRefs, PropType } from 'vue';
import { useStore } from "vuex";
import router from '@/router';
// vue3与vue2的区别之一: 再setup语法糖内子组件接收props方式改变
interface ItemType {
    title: string,
    path: string,
    icon: any,
    disabled?: boolean
    subs: ItemType[]
}

const store = useStore();

const handleClick = (params: any) => {
    router.push(params.path)
    store.dispatch('admin/addTags', {
        title: params.title,
        path: params.path
    })
}

const props = defineProps({ //子组件接收父组件传递过来的值
    subItems: Object,
});
// const subItems: any = props.subItems; 坑点：不太懂这里的ts类型如何标注
const { subItems }: { subItems?: any } = toRefs(props); //使用父组件传递过来的值
</script>