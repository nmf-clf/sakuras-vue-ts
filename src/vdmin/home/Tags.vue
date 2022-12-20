<template>
	<div class="tags" v-if="tags.show">
		<ul>
			<li
				class="tags-li"
				v-for="(item, index) in tags.list"
				:class="{ active: isActive(item.path) }"
				:key="index"
			>
				<router-link :to="item.path" class="tags-li-title">{{ item.title }}</router-link>
				<el-icon @click="closeTags(index)"><Close /></el-icon>
			</li>
		</ul>
		<div class="tags-close-box">
			<el-dropdown @command="handleTags">
				<el-button size="small" type="primary">
					标签选项
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</el-button>
				<template #dropdown>
					<el-dropdown-menu size="small">
						<el-dropdown-item command="other">关闭其他</el-dropdown-item>
						<el-dropdown-item command="all">关闭所有</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";
import { Close } from '@element-plus/icons-vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const tags = store.state.admin.tags;

const isActive = (path: string) => path === route.fullPath;

// 关闭单个标签
const closeTags = (index: number) => {
	if(tags.list.length === 1){ //如果tags标签只有一个
		// console.log('tabs标签页只有一个...');
		if(tags.list[index].path !== '/admin/index'){ //且不是首页，则需要转回到首页
			// console.log('当前标签页不是首页，需要跳转到首页...');
			router.push({
				path: '/admin/index'
			})
			store.dispatch('admin/resetTags', {
				path: '/admin/index',
				title: '首页',
			});
		}else{ //如果是首页，则直接删除即可，且不展示show
			// console.log('当前标签页是首页，直接删除即可...');
			store.dispatch('admin/deleteTags', index);
		}
	}else{ //如果tags标签有多个
		// console.log('tags标签页有多个...');
		if(tags.list[index].path === route.path){ //如果删除是当前页
			let toRoute;
			if(index === tags.list.length - 1){ //如果删除的当前标签页是最后一个，则需要跳转到上一个标签页对应的路由，同时删除当前对应的tag
				// console.log('当前标签页是最后一个，路由需要跳转到上一个标签页');
				toRoute = tags.list[index-1]; //获取上一个路由对象
			}else{ //如果删除的当前标签页不是最后一个，则需要跳转到下一个标签页对应的路由，同时删除当前对应的tag
				// console.log('当前标签页不是最后一个，路由需要跳转到下一个标签页');
				toRoute = tags.list[index+1]; //获取下一级路由对象
			}
			// console.log('跳转路由...');
			router.push(toRoute.path);
		}
		// console.log('删除当前tag对应的标签页...');
		store.dispatch('admin/deleteTags', index);
	}
};
// 设置标签
const addTags = (route: any) => {
	// console.log('设置标签...');
	store.dispatch('admin/addTags', {
		title: route.meta.title || '未知模块',
        path: route.fullPath
	})
};
addTags(route);
onBeforeRouteUpdate(to => {
	// console.log('onBeforeRouteUpdateLL', to);
	addTags(to); //关键：用于 关闭上一个标签后，回退路由时，重新设置上一个标签
});

// 关闭全部标签
const closeAll = () => {
	router.push({
		path: '/admin/index'
	})
	store.dispatch('admin/resetTags', {
		path: '/admin/index',
		title: '首页',
	});
};
// 关闭其他标签
const closeOther = () => {
	store.dispatch('admin/resetTags', {
		path: route.path,
		title: route.meta.title,
	});
};
const handleTags = (command: string) => {
	command === 'other' ? closeOther() : closeAll();
};
</script>

<style>
.tags {
	position: relative;
	height: 30px;
	overflow: hidden;
	background: #fff;
	padding-right: 120px;
	box-shadow: 0 5px 10px #ddd;
}

.tags ul {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}

.tags-li {
	display: flex;
	align-items: center;
	float: left;
	margin: 3px 5px 2px 3px;
	border-radius: 3px;
	font-size: 12px;
	overflow: hidden;
	cursor: pointer;
	height: 23px;
	border: 1px solid #e9eaec;
	background: #fff;
	padding: 0 5px 0 12px;
	color: #666;
	-webkit-transition: all 0.3s ease-in;
	-moz-transition: all 0.3s ease-in;
	transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
	background: #f8f8f8;
}

.tags-li.active {
	color: #fff;
	border: 1px solid #409EFF;
    background-color: #409EFF;
}

.tags-li-title {
	float: left;
	max-width: 80px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin-right: 5px;
	color: #666;
}

.tags-li.active .tags-li-title {
	color: #fff;
}

.tags-close-box {
	position: absolute;
	right: 0;
	top: 0;
	box-sizing: border-box;
	padding-top: 1px;
	text-align: center;
	width: 110px;
	height: 30px;
	background: #fff;
	box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
	/* z-index: 10; */
}
</style>
