/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-31 11:13:31
 */
/* 引入路由模块，和vue2.0方式不同 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'; //导入
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// 简单配置  进度条,可以不配置：在axios中我们不再做配置，以用来区分。
// NProgress.inc(0.2)
// NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 2. 定义一些路由：每个路由都需要映射到一个组件。 我们后面再讨论嵌套路由。
const routes: Array<RouteRecordRaw> = [
    { 
        path: '/', 
        redirect: '/home',
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
              path: 'home',
              component: () => import('@/views/home/index.vue'),
              name: 'FrontHome',
            },
            {
                path: 'article',
                component: () => import('@/views/article/index.vue'),
                name: 'FrontArticle',
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
    },
    {
        path: '/test',
        component: () => import('@/views/test/index.vue'),
    },
    {
        path: '/admin',
        name: 'Admin',
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
                meta: { title: '文章管理', permiss: '2' },
            },{
                path: 'repassword',
                component: () => import('@/vdmin/setting/Repassword.vue'),
                name: 'AdminRepassword',
                meta: { title: '修改密码', permiss: '4' },
            },{
                path: 'logout',
                component: () => import('@/vdmin/setting/Logout.vue'),
                name: 'AdminLogout',
                meta: { title: '退出登录', permiss: '5' },
            },{
                path: 'statistics',
                component: () => import('@/vdmin/statistics/index.vue'),
                name: 'AdminStatistics',
                meta: { title: '统计模块', permiss: '6' },
            },{
                path: 'writter',
                // component: () => import('@/vdmin/writter/index.vue'),
                // name: 'AdminEditor',
                // meta: { title: '富文本编辑器', permiss: '1' },
                children: [{
                    path: 'editor',
                    component: () => import('@/vdmin/writter/index.vue'),
                    name: 'AdminEditor',
                    meta: { title: '富文本编辑器', permiss: '7' },
                },{
                    path: 'markdown/:row',
                    component: () => import('@/vdmin/writter/Markdown.tsx'),
                    name: 'AdminMarkdown',
                    meta: { title: 'Markdown编辑器', permiss: '8' },
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
    document.title = '夜语清梦'
});

export default router;