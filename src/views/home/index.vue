<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-03 17:12:36
-->
<template>
    <!-- 背景图片 -->
    <!-- :src="require('@/assets/imgs/home_bg.jpg')" -->        
    <!-- :src="'https://www.sakuras.group/img/home_bg.db6001f7.jpg'" -->
    <img 
        class="home-bg _bgimg" 
        @error="onErrorImg" 
        @load="onLoadImg" 
        :style="styleObject" 
        :src="require('@/assets/imgs/home_bg.jpg')"
    />
    <!-- 按钮 -->
    <svg t="1674892605582" class="icon-down" @click="scrollTopToBottom" viewBox="0 0 1664 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3900" width="24" height="24"><path d="M1560.32 103.68c-52.48-52.48-136.96-52.48-189.44 0L832 642.56 291.84 103.68C239.36 51.2 154.88 51.2 102.4 103.68c-52.48 52.48-52.48 136.96 0 189.44L730.88 921.6c26.88 26.88 64 39.68 99.84 38.4 35.84 1.28 72.96-10.24 101.12-38.4l628.48-628.48c52.48-52.48 52.48-138.24 0-189.44z" fill="#ffffff" p-id="3901"></path></svg>
    <!-- 内容区域 -->
    <el-main class="new-main">
        <div class="top"></div>
        <div class="content">
            <div class="articles">
                <h1 class="find">
                    <svg t="1674959338516" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3543" width="16" height="16"><path d="M813.521877 189.368043C895.626055 141.572527 980.963924 75.400187 989.087584 24.765333c8.12366-50.634854-110.418684-21.689384-250.808153 70.589087-140.389469 92.278471-323.526743 235.349537-501.616306 493.886998-178.168433 258.616331-264.768229 489.075898-150.484892 423.376781 0 0 189.446913-342.534531 326.050599-399.794505C548.832518 555.484849 680.151881 541.05155 763.360246 448.063244c0 0 37.22687-64.6738-125.404076 0 0 0-56.865622-7.650437 25.080815-47.085682 81.946437-39.356374 252.701045-120.119754 275.888968-188.184985 0 0 36.438166-43.61538-75.242446 0C752.002896 256.565699 731.417699 237.163558 813.521877 189.368043z" fill="#747272" opacity="0.702" p-id="3544"></path><path d="M50.765384 1004.336799c0 0 258.774072-103.556951 382.048646-41.880229s308.068127-19.717622 327.78575-54.262896" p-id="3545"></path></svg>
                    发现
                </h1>
                <el-card 
                    v-for="(item, index) in articles"
                    :key="index"
                    shadow="always" class="item articleItem"
                    @click="viewDetails(item, index)"
                >
                    <div class="bimg" v-if="index % 2 == 0">
                        <img class="limg" v-show="item.loaded" :src="imgUrls[Math.floor( (Math.random() * imgUrls.length) )]" @load="imgLoaded(index)"/>
                        <img class="limg" v-show="!item.loaded" src="@/assets/imgs/img_loading.svg" />
                    </div>
                    <div class="lcnt">
                        <div class="time">
                            <svg t="1674961196823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11337" width="16" height="16"><path d="M949.638897 509.757936c0-241.799068-196.006116-437.805184-437.805184-437.805184-241.800092 0-437.806207 196.006116-437.806207 437.805184 0 241.811348 196.006116 437.817464 437.806207 437.817464 99.262748 0 190.149734-33.771151 263.59242-89.425705 3.015683-3.421936 4.999874-7.789407 4.999874-12.698207 0-10.717086-8.692986-19.407002-19.408025-19.407002-5.562692 0-10.513448 2.207271-14.048971 5.944386l-0.246617 0c-65.719794 48.358381-146.610102 77.313853-234.459916 77.313853-218.947618 0-396.469754-177.544649-396.469754-396.482033 0-218.97013 177.522136-396.470777 396.469754-396.470777 218.969107 0 396.469754 177.500647 396.469754 396.470777 0 66.865897-15.692401 129.814578-44.962028 185.110975l0 0.325411c-0.538259 1.845021-1.12359 3.645017-1.12359 5.627161 0 10.719132 8.688893 19.407002 19.407002 19.407002 8.353248 0 15.331173-5.357008 18.055215-12.742209l0 0.135076C931.289993 650.424676 949.638897 582.250994 949.638897 509.757936zM506.813373 276.017404c0-11.527544-9.367345-20.892843-20.917402-20.892843-11.527544 0-20.892843 9.365298-20.892843 20.892843l0 248.508887c0 0-2.520403 42.010813 41.786709 41.785685L731.994971 566.311976c0.068562 0 0.156566 0.045025 0.228197 0.045025 11.546987 0 20.914332-9.364275 20.914332-20.891819s-9.367345-20.892843-20.892843-20.938891L506.79086 524.526291 506.79086 276.153504C506.79086 276.108478 506.813373 276.06243 506.813373 276.017404z" fill="#A8A8A8" p-id="11338"></path></svg>
                            {{ '发布于'+ item.createDate }}
                        </div>
                        <h3 class="title">{{ item.title }}</h3>
                        <div class="meta">
                            <div class="meta-item">
                                <svg t="1674960208493" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5326" width="0.8rem" height="0.8rem"><path d="M360.725 33c3.526 1.457 7.052 2.909 10.575 4.374 24.202 10.07 48.704 19.484 72.535 30.362 36.75 16.774 71.604 37.031 104.774 60.142 26.75 18.64 51.616 39.576 75.127 62.087 8.946 8.564 17.269 17.852 25.224 27.354 11.313 13.515 22.512 27.179 32.88 41.417 16.44 22.572 30.486 46.615 41.868 72.193 9.157 20.583 17.27 41.491 22.289 63.505 1.506 6.607 2.988 13.217 4.803 21.235 22.57-30.853 27.756-66.112 34.339-102.473 12.856 20.155 25.33 38.876 36.948 58.113 19.011 31.48 37.17 63.487 51.968 97.194 10.17 23.167 20.189 46.494 28.429 70.384 7.825 22.688 14.158 45.995 19.464 69.411 4.837 21.353 8.16 43.128 8.012 65.212-0.008 1.095 0.677 2.192 1.04 3.287v28.275c-0.367 5.083-0.316 10.237-1.177 15.235-3.069 17.82-5.747 35.75-9.874 53.332-6.161 26.25-17.03 50.81-31.715 73.345-9.397 14.419-20.491 27.767-31.257 41.251-12.39 15.518-27.201 28.644-43.358 40.07-14.476 10.239-29.266 20.104-44.455 29.242-21.161 12.732-43.663 22.72-68 30.057 0.362-1.721 0.494-3.108 0.943-4.385 0.256-0.727-0.038-1.391-0.884-1.995 3.78-2.514 7.52-5.092 11.223-7.714 9.023-6.387 17.294-13.725 24.214-22.4 6.013-7.538 12.209-15.001 17.456-23.061 8.202-12.599 14.272-26.329 17.712-41.003 2.305-9.83 3.801-19.853 5.514-29.815 0.482-2.794 0.453-5.675 0.658-8.517v-15.806c-0.203-0.613-0.585-1.226-0.58-1.838 0.082-12.346-1.774-24.519-4.475-36.456-2.963-13.09-6.5-26.12-10.87-38.804-4.602-13.355-10.197-26.396-15.877-39.347-8.265-18.843-18.406-36.737-29.023-54.335-6.488-10.754-13.455-21.22-20.634-32.488-3.677 20.327-6.573 40.039-19.178 57.287-1.013-4.483-1.841-8.178-2.682-11.872-2.804-12.306-7.334-23.994-12.448-35.501-6.357-14.3-14.2-27.74-23.381-40.359-5.791-7.96-12.046-15.598-18.364-23.153-4.442-5.313-9.09-10.505-14.086-15.293-13.13-12.584-27.017-24.288-41.957-34.708-18.524-12.92-37.99-24.245-58.513-33.622-13.31-6.081-26.993-11.345-40.51-16.974-1.966-0.819-3.936-1.63-5.905-2.445h-1.823c2.422 5.634 5.001 11.206 7.237 16.915 5.352 13.666 9.691 27.673 12.132 42.149 1.853 10.98 3.211 22.066 4.24 33.156 0.716 7.715 1.045 15.546 0.599 23.27-1.31 22.64-5.744 44.64-14.715 65.61-7.112 16.63-16.064 32.158-27.791 45.931-7.035 8.261-14.661 16.02-22.068 23.96-0.871 0.934-2.038 1.592-3.418 2.645-9.25-20.868-19.72-40.931-33.244-60.231-0.746 3.928-1.463 7.05-1.916 10.21-1.707 11.923-5.19 23.362-9.133 34.7-5.79 16.647-13.894 32.063-24.987 45.738-4.47 5.51-10.332 9.877-14.917 15.309-3.614 4.28-6.848 9.116-9.181 14.197-4.825 10.504-7.04 21.814-8.917 33.158l-0.338 2.063c-0.528 3.25-0.448 6.599-0.698 9.898-0.033 0.422-0.378 0.821-0.579 1.231v24.319c0.404 2.901 0.709 5.82 1.23 8.7 1.621 8.97 2.588 18.146 5.19 26.827 2.969 9.909 6.878 19.636 11.374 28.962 5.008 10.388 11.799 19.73 19.437 28.488 12.581 14.425 27.58 25.594 44.386 34.512a198.767 198.767 0 0 0 6.817 3.451c-9.097 0.587-18.404 1.198-27.916 1.832-0.197-0.284-0.353-0.777-0.596-0.823-11.847-2.27-23.729-4.365-35.549-6.763-33.377-6.77-65.133-18.109-95.23-34.062-30.092-15.952-56.95-35.931-79.477-61.735-13.677-15.665-25.836-32.376-34.804-50.96-8.05-16.682-15.05-34.08-20.366-51.805-4.659-15.53-6.391-31.942-9.295-47.987-0.932-5.152-1.478-10.374-2.201-15.564v-43.5c0.36-0.734 0.978-1.448 1.036-2.204 0.449-5.901 0.305-11.89 1.25-17.705 3.502-21.524 7.41-43.074 16.572-63.002 4.178-9.089 9.969-17.74 16.44-25.396 8.21-9.716 18.708-17.527 26.71-27.384 19.863-24.463 34.374-52.038 44.742-81.817 7.06-20.28 13.297-40.742 16.354-62.07 0.81-5.652 2.095-11.237 3.43-18.264 24.216 34.524 42.964 70.413 59.527 107.742 2.47-1.884 4.56-3.06 6.12-4.732 13.263-14.204 26.918-28.082 39.515-42.86 20.998-24.637 37.028-52.413 49.763-82.159 16.064-37.512 24.004-76.865 26.348-117.362 0.8-13.818 0.21-27.827-1.07-41.626-1.844-19.838-4.276-39.669-7.593-59.31-4.371-25.893-12.142-50.95-21.725-75.394-4.003-10.213-8.62-20.18-12.959-30.258h3.265z" fill="#E50404" p-id="5327"></path></svg>
                                999
                            </div>
                            <div class="meta-item">
                                <svg t="1674975772976" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19862" width="0.8rem" height="0.8rem"><path d="M343.8 473.1m-50.3 0a50.3 50.3 0 1 0 100.6 0 50.3 50.3 0 1 0-100.6 0Z" fill="#8a8a8a" p-id="19863"></path><path d="M520.8 473.1m-50.3 0a50.3 50.3 0 1 0 100.6 0 50.3 50.3 0 1 0-100.6 0Z" fill="#8a8a8a" p-id="19864"></path><path d="M697.9 473.1m-50.3 0a50.3 50.3 0 1 0 100.6 0 50.3 50.3 0 1 0-100.6 0Z" fill="#8a8a8a" p-id="19865"></path><path d="M138.4 1004.4l14.9-72.4c0.1-0.5 9.7-47.3 16.8-98.1 11.9-86 6.5-109 4.8-113.7-77.5-74-120.2-169.9-120.2-270.3 0-54.4 12.3-107.2 36.5-156.9 23.3-47.7 56.5-90.4 98.8-127.1 42-36.4 90.9-65 145.2-84.9 56.1-20.6 115.6-31 176.9-31 61.3 0 120.8 10.4 176.9 31 54.3 19.9 103.2 48.5 145.2 84.9 42.3 36.6 75.5 79.4 98.8 127.1 24.2 49.7 36.5 102.4 36.5 156.9S957.2 557.1 933 606.8c-23.3 47.7-56.5 90.4-98.8 127.1-42 36.4-90.9 65-145.2 84.9-56.1 20.6-115.6 31-176.9 31-49.7 0-98.6-6.9-145.3-20.6-6 1.8-29.1 11.5-95.6 63.4-40.6 31.7-76.6 63-77 63.3l-55.8 48.5zM512.1 100c-224.7 0-407.4 157-407.4 349.9 0 87.2 37.7 170.8 106 235.3 15.8 14.9 23.5 45.7 9.9 147.9-1.9 14-3.9 27.8-6 40.6 9.1-7.4 18.9-15.2 29-23 81.5-63.3 108.4-71.9 123.9-71.9 3.6 0 7 0.5 10.3 1.5 43.1 12.9 88.2 19.5 134.3 19.5 224.6 0 407.4-156.9 407.4-349.9C919.4 257 736.7 100 512.1 100z" fill="#8a8a8a" p-id="19866"></path></svg>
                                123 
                            </div>
                            <div class="meta-item">
                                <svg t="1674960719306" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9858" width="0.8rem" height="0.8rem"><path d="M81.16 412.073333L0 709.653333V138.666667a53.393333 53.393333 0 0 1 53.333333-53.333334h253.413334a52.986667 52.986667 0 0 1 37.713333 15.62l109.253333 109.253334a10.573333 10.573333 0 0 0 7.54 3.126666H842.666667a53.393333 53.393333 0 0 1 53.333333 53.333334v74.666666H173.773333a96.2 96.2 0 0 0-92.613333 70.74z m922-7.113333a52.933333 52.933333 0 0 0-42.386667-20.96H173.773333a53.453333 53.453333 0 0 0-51.453333 39.333333L11.773333 828.666667a53.333333 53.333333 0 0 0 51.453334 67.333333h787a53.453333 53.453333 0 0 0 51.453333-39.333333l110.546667-405.333334a52.953333 52.953333 0 0 0-9.073334-46.373333z" fill="#cdcdcd" p-id="9859"></path></svg>
                                默认分类
                            </div>
                            
                        </div>
                        <div class="brief">
                            {{ item.content }}
                        </div>
                        <div class="enter">
                            <svg t="1674958997504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1680" width="32" height="32"><path d="M150.528 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0zM519.168 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0zM887.808 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0z" p-id="1681" fill="#515151"></path></svg>
                        </div>
                    </div>
                    <div class="bimg" v-if="index % 2 == 1">
                        <img class="limg" v-show="item.loaded" :src="imgUrls[Math.floor( (Math.random() * imgUrls.length) )]" @load="imgLoaded(index)"/>
                        <img class="limg" v-show="!item.loaded" src="@/assets/imgs/img_loading.svg" />
                    </div>
                </el-card>
            </div>
            <p  v-if="hasMoreArticle" class="unarticle" @click="getArticleList">加载更多</p>
            <p  v-else class="unarticle">没有更多数据啦</p>
        </div>
    </el-main>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { ElMain, ElCard } from 'element-plus';
import { GetNewArticleListAjax } from "@/api/article";
import { DataItemType } from "@/vdmin/article/type";

const store = useStore();
const router = useRouter();

const styleObject = reactive({ height: document.body.clientHeight + 'px' });
const articles: DataItemType[] = reactive([]);
const hasMoreArticle = ref(true);
let page = 1;
let pageSize = 5;
const imgUrls = [
    'https://view.lixingyong.com/images/2022/07/11/501.jpg?image_process=resize,w_640',
    'https://view.lixingyong.com/images/2021/11/19/GGR9ZZOHUFPUZ0.png?image_process=resize,w_640',
    'https://view.lixingyong.com/images/2021/04/09/74542813_p0.png?image_process=resize,w_640',
    'https://view.lixingyong.com/images/2021/04/09/80570514_p0.jpg?image_process=resize,w_640',
    'https://view.lixingyong.com/images/2022/05/10/C2923B1E-7F81-4274-A8F6-97A6AB81C71D.png?image_process=resize,w_640',
    'https://halo-ivan.oss-cn-hangzhou.aliyuncs.com/attachments/upload/103449051_p0.jpg',
]

onMounted(() => {
    getArticleList();
    // 判断是否是第一次访问此网站
    if(!localStorage.getItem('IS_VISIT')){
        document.documentElement.scrollTop = document.body.clientHeight;
    }
    let clientHeight = document.body.clientHeight;
    let articleItemDOMs = document.getElementsByClassName('articleItem'); // 文章列表DOM集合
    // 监听滚动事件，实现顶部过渡
    window.addEventListener('scroll', function () {
        // 监听元素距离顶部的距离，当文章将要显示时，使文章往上过渡
        for(let i = 0; i < articleItemDOMs.length; i++){
            let currentDOM = articleItemDOMs[i];
            if((currentDOM.getBoundingClientRect().top - 50) <= clientHeight){
                currentDOM.classList.add('to-move');
            }
        }
    })
});

const scrollTopToBottom = () => {
    let speed = 1;
    let timetop = setInterval(function(){
        speed < 20 ? (speed+=1) : null; // 匀加速
        document.documentElement.scrollTop = document.documentElement.scrollTop + speed;
        if(document.documentElement.scrollTop >= document.body.clientHeight){ // 当滚动距离 大于等于 视图窗口高度时，停止滚动
            clearInterval(timetop)
        }
    }, 10)
}

const onErrorImg = (e: any) =>{
}
// 主页大图加载完毕后，返回到图片主页
const onLoadImg = (e: any) => {
    if(localStorage.getItem('IS_VISIT')) return;
    localStorage.setItem('IS_VISIT', String(new Date().getTime()));
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
    }, 2000); // 第一次加载页面，2s后再返回到图片主页
}

const imgLoaded = (index: number) => {
    console.log('加载完毕');
    articles[index]['loaded'] = true;
}

const viewDetails = (item: any, index: number) => {
    
    const newWindow = window.open(`${window.location.origin}/#/article/${item._id}`) as any;
    newWindow.onload = () => {
        newWindow.document.title = item.title + ' - 夜语清梦';
    }
    // router.push({ path: `/article/${item._id}` });
}

// 查询最新文章
const getArticleList = () => {
    GetNewArticleListAjax({ 
        username: 'niumengfei',
        page: page,
        pageSize,
    })
    .then(res =>{
        let { list } = res.data;
        console.log('数据::', list);
        if(list.length < 1) return; 
        if(list.length < pageSize){ // 没有下一页
            hasMoreArticle.value = false; 
        }else{
            page++;
        }
        articles.push(...list);
        console.log(articles);
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
// animation-name: likes; // 动画名称
// animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
// animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
// animation-delay: 0s; // 动画延迟时间
// animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
// animation-duration: 1s; // 动画完成时间
@keyframes iconDown{
    0%{
        transform: translateY(0px) scaleX(1.5);
    }
    50%{
        transform: translateY(-5px) scaleX(1.5);
    }
    100%{
        transform: translateY(0px) scaleX(1.5);
    }
}
.home-bg{
    position: fixed;
    margin: 0;
    padding: 0;
    z-index: -1;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
}
.icon-down{
    position: absolute;
    bottom: 30px;
    left: calc(50% - 16px);
    cursor: pointer;
    z-index: 5;
    animation: iconDown 3s;
    animation-iteration-count: infinite;
}
.new-main{
    padding: 0;
    .top{
        width: 100%;
        height: 100vh;
    }
    .content{
        width: 100%;
        background: #fff;
        min-height: 100vh;
        // padding-bottom: 100px;
        .articles{
            max-width: 800px;
            margin: auto;
            padding: 4rem 0 2rem 0;
            .find{
                color: #666;
                font-size: 16px;
                font-weight: 400;
                padding-bottom: 5px;
                margin-bottom: 30px;
                border-bottom: 1px dashed #ececec;
            }
            .item{
                width: 100%;
                height: 300px;
                border-radius: 10px;
                margin-bottom: 40px;
                display: flex;
                box-shadow: 0 1px 20px -6px rgb(0 0 0 / 50%);
                transform: translateY(50px);
                transition: all 0.6s;
                .el-card__body{
                    flex: 1;
                    display: flex;
                    flex-direction: row;
                    padding: 0;
                    .lcnt{
                        width: 320px;
                        padding: 20px;
                        .time{
                            color: #888;
                            font-size: 0.75rem;
                            display: flex;
                            align-items: center;
                            .icon{
                                margin-right: 5px;
                            }
                        }
                        .title{
                            margin-top: 20px;
                        }
                        .meta{
                            margin-top: 20px;
                            font-size: 0.8rem;
                            display: flex;
                            flex-direction: row;
                            color: #888;
                            .meta-item{
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                margin-right: 30px;
                                .icon{
                                    margin-right: 5px;
                                }
                            }
                        }
                        .brief{
                            margin-top: 20px;
                            display: -webkit-box;
                            overflow: hidden;
                            white-space: normal !important;
                            text-overflow: ellipsis;
                            word-wrap: break-word;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            font-size: 1rem;
                            color: rgba(0,0,0,.66);
                        }
                        .enter{
                            margin-top: 20px;
                            font-size: 1rem;
                            font-weight: bold;
                        }
                    }
                    .bimg{
                        flex: 1;
                        overflow: hidden;
                        .limg{
                            width: 100%;
                            height: 100%;
                            -o-object-fit: cover;
                            object-fit: cover;
                            pointer-events: none;
                            transition: all 0.6s;
                        }
                    }
                }
            }
            .item:last-child{
                margin-bottom: 0;
            }
            .item:hover{
                box-shadow: 0 10px 25px -2px rgb(0 0 0 / 50%);
            }
            .item:hover img{
                transform: scale(1.1);
            }
            .to-move{
                transform: translateY(0px);
            }
        }
        .unarticle{
            text-align: center;
            margin-top: 30px;
            font-size: 15px;
            color: #989898;
            transition: all 0.6s;
        }
        .unarticle:hover{
            font-size: 16px;
            color: #FE9600;
        }
    }
}
.main{
    width: 60%;
    margin: 10% auto;
    background-color: #f0f0f0;
    padding: 5%;
    border-radius: 10px;
    text-align: center;
    a{
        color: #505050;
        position: absolute;
        text-align: center;
        left: 0;
        right: 0;
        bottom: 20px;
    }
    h1{
        cursor: pointer;
    }
}
.footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    a{
        color: #505050;
        text-decoration: none;
    }
}
</style>
