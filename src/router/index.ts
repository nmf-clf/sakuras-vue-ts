/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-20 17:35:31
 */
/* 引入路由模块，和vue2.0方式不同 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'; //导入
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// console.log(createRouter);
// 1. 定义路由组件 (也可以从其他文件导入)
import FrontHome from '@/views/home/index.vue';
import Login from '@/views/login/index.vue';
import Test from '@/views/test/index.vue';

// 简单配置  进度条,可以不配置：在axios中我们不再做配置，以用来区分。
// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 2. 定义一些路由：每个路由都需要映射到一个组件。 我们后面再讨论嵌套路由。
const routes: Array<RouteRecordRaw> = [
    { 
        path: '/', 
        redirect: '/home',
        component: () => import('@/views/home/index.vue'),
        children: [
            {
              path: 'home',
              component: () => import('@/views/home/index.vue'),
              name: 'FrontHome',
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/test',
        component: () => import('@/views/test/index.vue'),
    },
    {
        path: '/admin',
        component: () => import('@/vdmin/home/index.vue'),
        children: [
            {
              path: 'index',
              component: () => import('@/vdmin/home/Home.vue'),
              name: 'AdminHome',
              meta: { title: '首页', permiss: '1' },
            },{
                path: 'article',
                component: () => import('@/vdmin/article/index.vue'),
                name: 'AdminArticle',
                meta: { title: '文章模块', permiss: '2' },
            },{
                path: 'repassword',
                component: () => import('@/vdmin/setting/Repassword.vue'),
                name: 'AdminRepassword',
                meta: { title: '修改密码', permiss: '3' },
            },{
                path: 'logout',
                component: () => import('@/vdmin/setting/Logout.vue'),
                name: 'AdminLogout',
                meta: { title: '退出登录', permiss: '3' },
            },{
                path: 'statistics',
                component: () => import('@/vdmin/statistics/index.vue'),
                name: 'AdminStatistics',
                meta: { title: '统计模块', permiss: '1' },
            },{
                path: 'writter',
                // component: () => import('@/vdmin/writter/index.vue'),
                // name: 'AdminEditor',
                // meta: { title: '富文本编辑器', permiss: '1' },
                children: [{
                    path: 'editor',
                    component: () => import('@/vdmin/writter/index.vue'),
                    name: 'AdminEditor',
                    meta: { title: '富文本编辑器', permiss: '1' },
                }]
            }
        ]
    },
];
// 3. 创建路由实例并传递 `routes` 配置
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});

/* 路由前置守卫 */
router.beforeEach((to, from, next) => {
    // NProgress.start()
    // document.title = `${to.meta.title} | sakuras`;
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '') : {};
    if(['/home'].includes(to.path)) { //排除不需要登录的页面
        next();
    }else if (!userInfo.username && to.path !== '/login') { //未登录的需要登录
        next('/login');
    }else{
        next();
    }
});

/* 路由后置守卫 */
router.afterEach((to, from, next) => {
    // console.log(to, from, s);
    // NProgress.done()
    document.title = 'sakuras'
});

export default router;