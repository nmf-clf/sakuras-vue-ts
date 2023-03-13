/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-08 11:38:14
 */
/* 引入路由模块，和vue2.0方式不同 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'; //导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Utils } from "@/utils";

// 简单配置  进度条,可以不配置：在axios中我们不再做配置，以用来区分。
// NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false, minimum: 0 });

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
              meta: { title: '主页', keepAlive: true }
            },{
                path: 'article/:_id', // 由于可能查看文章会开启新窗口，所以这里采用 params 参数传递文章唯一id，通过 id 查询文章数据
                component: () => import('@/views/article/index.vue'),
                name: 'FrontArticle',
                meta: { title: '文章', noNeedLogin: true }
            },{
                path: 'category',
                component: () => import('@/views/category/index.vue'),
                name: 'FrontCategory',
                meta: {  title: '分类', noNeedLogin: true }
            },{
                path: 'tag',
                component: () => import('@/views/tag/index.vue'),
                name: 'FrontTag',
                meta: {  title: '标签', noNeedLogin: true }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index.vue'),
        meta: {  title: '登录' }
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
              meta: { title: '创作者中心', permiss: '1' },
            },{
                path: 'article',
                component: () => import('@/vdmin/article/index.vue'),
                name: 'AdminArticle',
                meta: { title: '文章管理', permiss: '2' },
            },{
                path: 'dictionary',
                component: () => import('@/vdmin/dictionary/index.vue'),
                name: 'AdminDictionary',
                meta: { title: '字典管理', permiss: '2' },
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
                path: 'editor',
                children: [{
                    path: 'richtext',
                    component: () => import('@/vdmin/editor/RichText.vue'),
                    name: 'AdminRichText',
                    meta: { title: '富文本编辑器', permiss: '7' },
                },{
                    path: 'markdown/:row',
                    component: () => import('@/vdmin/editor/Markdown.tsx'),
                    name: 'AdminMarkdown',
                    meta: { title: 'Markdown编辑器', permiss: '8' },
                }]
            }
        ]
    },
    {
        path: '/writter',
        component: () => import('@/vdmin/writter/index.vue'),
        name: 'Writter',
        meta: { title: '创作' },
    }
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
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '') : {};
    if(['/home', '/article'].includes(to.path) || to.meta.noNeedLogin) { //排除不需要登录的页面
        next();
    }else if (!userInfo.username && (to.path.indexOf('/admin') > -1 || ['/writter'].includes(to.path))) { //未登录的需要登录
        next('/login');
    }else{
        next();
    }
});

/* 路由后置守卫 */
router.afterEach((to, from, next) => {
    console.log('router.afterEach>>>', to, from);
    const title = to.meta.title as string;
    if(to.name){
        let _t =  title ? title + ' - 夜语清梦' : '夜语清梦' as string;
        if(to.name === 'FrontArticle'){
            document.title = localStorage.getItem('DOCUMENT_TITLE') || '夜语清梦';
        }else{
            localStorage.setItem('DOCUMENT_TITLE', _t);
            document.title = localStorage.getItem('DOCUMENT_TITLE') || '夜语清梦';
        }
    }
    // NProgress.done()
    loadingProgress();
});

// 统一处理阅读进度条
const loadingProgress = () => {
    document.documentElement.scrollTop = 0; // 每次切换路由应该使滚动条滚动到最上面，如需特殊设置，则配置路由限制
    setTimeout(() => {
        let scrollHeight = document.documentElement.scrollHeight; // 获取文档总高度
        let clientHeight = document.documentElement.clientHeight; // 获取窗口高度
        let hiddenHeight = scrollHeight - clientHeight; // 获取隐藏高度

        let loadingProgress =  Utils.debounce(()=>{
            // 处理顶部进度条
            let scrollTop = document.documentElement.scrollTop; // 获取当前滚动距离
            let percent = scrollTop / hiddenHeight; // 获取滚动进度百分比
            let _p = Number(percent.toFixed(2));
            if(!_p){
                NProgress.set(0); console.log('scroll:0');
            }else{
                if(_p > 0.99){
                    NProgress.set(0.999); console.log('scroll:end');
                }else{
                    console.log('滑动百分比>>>', Number(percent.toFixed(2)))
                    NProgress.set(Number(percent.toFixed(2)));  console.log('scroll:ing');
                }
            }
        }, 100)
        console.log('文档总高度>>', scrollHeight, hiddenHeight);
        window.addEventListener('scroll', ()=>{0
            // 1. 原则上滚动条做出响应的等待时间间隔应较小才能表现丝滑，因此采用防抖处理顶部进度条也可以;
            // 2. 同时由于节流表现出问题是第一次滚动不会被记载需要特殊处理，况且即便是节流仍然需要指定实践触发的单位时间间隔.
            loadingProgress(); 
        })
    }, 500);
}
export default router;