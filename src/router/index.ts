/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-13 14:54:52
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

import AdminHome from '@/vdmin/home/index.vue';
// 简单配置  进度条,可以不配置：在axios中我们不再做配置，以用来区分。
// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 2. 定义一些路由：每个路由都需要映射到一个组件。 我们后面再讨论嵌套路由。
const routes: Array<RouteRecordRaw> = [
    { 
        path: '/', 
        redirect: '/home',
        component: FrontHome,
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
        component: Login,
    },
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/admin',
        component: AdminHome,
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