<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 15:54:42
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-10 17:36:15
-->
<template>
    <div class="admin-header">
        <div class="expand" @click="changeIsCollapse">
            <el-icon><Expand /></el-icon>
        </div>
        <div class="title">创作者中心</div>
        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <span>{{userInfo.nickname || userInfo.username}}</span>
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="turnTo('github')">项目仓库</el-dropdown-item>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item divided @click="turnTo('back')">返回前台</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const userInfo = store.getters.userInfo;

const changeIsCollapse = () =>{
    store.dispatch('admin/changeIsCollapse')
}

onMounted(() => {
	if (document.body.clientWidth < 1500) {
		// collapseChage();
	}
});

const turnTo = (type: string) => {
    switch (type) {
        case 'github':
            window.open('https://github.com/NMF-Mengfei/sakuras-vue-ts');
            break;
        case 'personal':
            console.log('1');
            break;
        case 'back':
            router.push('/home');
            break;
        default:
            break;
    }
}
</script>

<style lang="less" scoped>
@import '@/styles/index';
.admin-header{
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 3.5rem;
    font-size: 22px;
    color: #fff;
    // background-color: @theme-color-dark;
    background-color: #000;
    line-height: 3.5rem;
    .expand{
        color: #fff;
        float: left;
        padding: 0 20px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .title{
        float: left;
    }
    .right{
        float: right;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        margin-right: 20px;
        .el-dropdown{
            color: #fff;
            font-size: 16px;
            .el-dropdown-link {
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 15px;
                text-align: center;
            }
        }
    }
}
</style>