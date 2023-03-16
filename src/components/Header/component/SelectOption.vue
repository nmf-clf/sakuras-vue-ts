<!--
 * @Author: niumengfei
 * @Date: 2022-04-27 17:25:41
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-14 17:26:39
-->
<template>
	<div :class="'rg-options' + (' rg-options-' + deviceType())" class="animate__animated animate__fadeInRight">
		<el-dropdown v-for="(v, i) in menuList" class="hidden-dropdown" :class="routeInfo.routeTitle == v.label ? 'active' : null" v-show="!v.disabled">
			<span class="el-dropdown-link" @click="handleClick(v, i)">{{ v.label }}
				<span class="break-line line-active"></span>
			</span>
		</el-dropdown>

		<!-- 个人中心 trigger="click"-->
		<el-dropdown class="hidden-dropdown">
			<span class="el-dropdown-link">个人中心
				<el-icon class="el-icon--right"><arrow-down /></el-icon>
				<span class="break-line"></span>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
				<el-dropdown-item v-if="userInfo.username"><el-icon><user /></el-icon>{{userInfo.nickname || userInfo.username}}</el-dropdown-item>
				<el-dropdown-item :divided="userInfo.username ? true : false" @click="loginOrOut('/login')">{{userInfo.username ? '注销' : '登录'}}</el-dropdown-item>
				<el-dropdown-item divided @click="toAdmin('/admin/index')">进入后台</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onUpdated } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";
import { Message, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const store = useStore();
const isCollapse = store.state.admin.isCollapse;
const deviceType = () => store.getters.deviceType;
const userInfo = store.getters.userInfo;
const routeInfo = store.getters.routeInfo;

const menuList = reactive([
	{
		label: '首页',
		active: false,
		url: '/',
	},{
		label: '归档',
		url: '/file',
	},{
		label: '分类',
		url: '/category',
	},{
		label: '标签',
		url: '/tag',
	},{
		label: '笔记',
		url: 'https://sakuras.group/sakuras-docs/',
		outPage: true,
	},{
		label: '发布',
		disabled: !userInfo.username,
		url: `${window.location.origin}/#/writter`,
		outPage: true,
	},{
		label: '关于博客',
		url: `about`,
	}
])

const handleClick = (v: any, i: number) => {
	switch (v.outPage) {
		case true:
			window.open(v.url)
			break;
	
		default:
			turnPage(v.url);
			break;
	}
}


const turnPage = (path: string) =>{
    const datas = { 
        path,
        name: path.charAt(0) == '/' ? '' : path,  //(使用params传参时，必须使用name属性进行路由跳转，不能使用path配置项跳转)
        params: {}
    }
    router.push(datas);
}

const loginOrOut = (e: string) =>{
    if(userInfo.username){ //退出登录
		menuList[5].disabled = true;
        store.dispatch('user/saveUserInfo', {});
        ElMessage.success('注销成功');
		
    }else{
        turnPage(e);
    }
}

const toAdmin = (path: string) =>{
    if(!userInfo.username) return ElMessage.warning('请先登录！');
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
	.hidden-dropdown{
		.el-dropdown-link{
			position: relative;
			cursor: pointer;
			display: flex;
			align-items: center;
			font-size: 1rem;
			text-align: center;
			// color: var(--el-color-primary);
			padding-bottom: 2px;
			transition: all .5s ease-in-out;
		}
		.break-line{
			position: absolute;
			bottom: -7px;
			display: inline-block;
			height: 3px;
			background: #FE9600;
			width: 0%;
			border-radius: 10px;
			transition: all .5s ease-in-out;
		}
		.el-dropdown-link:hover{
			color: #FE9600;
		}
		.el-dropdown-link:hover .break-line{
			width: 100%;
		}
	}
	.active{
		.el-dropdown-link{
			color: #FE9600;
		}
		.break-line{
			width: 100%;
		}
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