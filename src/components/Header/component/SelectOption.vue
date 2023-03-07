<!--
 * @Author: niumengfei
 * @Date: 2022-04-27 17:25:41
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-06 14:18:01
-->
<template>
	<div :class="'rg-options' + (' rg-options-' + deviceType())">
		<el-dropdown v-for="v in menuList" class="hidden-dropdown" v-show="!v.disabled">
			<span class="el-dropdown-link" @click="v.handleClick">{{ v.label }}
				<span class="break-line"></span>
			</span>
		</el-dropdown>
		<!-- <el-dropdown class="hidden-dropdown">
			<span class="el-dropdown-link" @click="turnPage('/category')">关于博客
				<span class="break-line"></span>
			</span>
		</el-dropdown> -->

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
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { Message, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

const router = useRouter();
const store = useStore();
const isCollapse = store.state.admin.isCollapse;
const deviceType = () => store.getters.deviceType;
const userInfo = store.getters.userInfo;

const menuList = reactive([
	{
		label: '首页',
		handleClick: () => turnPage('/')
	},{
		label: '归档',
		handleClick: () => turnPage('/')
	},{
		label: '分类',
		handleClick: () => turnPage('/category')
	},{
		label: '标签',
		handleClick: () => turnPage('/tag')
	},{
		label: '笔记',
		handleClick: () => openPage('https://sakuras.group/sakuras-docs/')
	},{
		label: '发布',
		disabled: !userInfo.username,
		handleClick: () => openPage(`${window.location.origin}/#/writter`)
	},{
		label: '关于博客',
		handleClick: () => turnPage('/about')
	}
])

// watch(() => userInfo.username, (val) => {
// 	console.log('xxxxxxxxsss', val);
// 	if(val == '1'){
// 		menuList[5].disabled = true;
// 	}
// })
onUpdated(() => {
	console.log('x更新了>>>');
	
})
const openPage = (url: string) => window.open(url);

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