<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-03-29 13:50:11
-->
<template>
    <!-- <transition name="move" mode="out-in"> -->
    <!-- </transition> -->
    <el-container class="frontHome" :class="'frontHome-' + store.getters.deviceType">
        <!-- 公共头部 -->
        <MyHeader :headerClass="headerClass" />
        <!-- 侧边菜单 -->
        <img class="sk-sroll" :class="headerClass ? 'sk-sroll-active' : null" @click="scrollToTop" src="@/assets/imgs/scroll.png" />
        <div class="sk-main">
            <!-- <router-view v-slot="{ Component }">
                <keep-alive>
                        <component v-if="Route.meta.keepAlive" :is="Component"></component>
                </keep-alive>
                <component v-if="!Route.meta.keepAlive" :is="Component"></component>
            </router-view> -->
            <Suspense>
                <template #default>
                    <router-view v-slot="{ Component }">
                        <keep-alive :include="routeInfo.keepAliveList">
                            <component :is="Component"></component>
                        </keep-alive>
                    </router-view>
                </template>
                <template #fallback>
                    <!-- 加载中的占位内容 -->
                    <div>
                        <h1>加载失败</h1>
                        <p>很抱歉，页面加载失败，请检查网络连接或稍后重试。</p>
                    </div>
                </template>
            </Suspense>
        </div>
        <div class="sk-footer">
            <p class="ft-logo"></p>
            <p class="ft-desc">powered  by  myself • Crafted with  by vuecli</p>
            <p>
              © 2023 夜语清梦&nbsp;<a class="ft-gov" href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a></p>
        </div>
        
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, onActivated } from 'vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { MyHeader } from '@/components'
import { ElContainer } from 'element-plus';

const store = useStore();
const Route = useRoute();

// const deviceType = store.getters.deviceType; // 这样写是无效的，因为是把 store.getters.deviceType 赋值给了常量 deviceType
// const deviceType = store.getters.deviceType; // 这样写是有效的，因为是个函数，模板中调用函数返回值是个 getter 响应式数据
// const { keepAliveList } = store.getters.routeInfo; // 这里只是从 store.getters.routeInfo 中取出了 keepAliveList 属性，并将其赋值给一个常量 keepAliveList。由于这个常量没有被声明为响应式变量，所以即使 store.getters.routeInfo.keepAliveList 发生了变化，keepAliveList 本身并没有变化，所以模板无法监听到变化
const routeInfo = store.getters.routeInfo;

let headerClass = ref(false);
let sign = false; // 标识，如果顶部未曾展示过，监听滚动事件时理应不改变 headerClass 的值，但即使改变也可以

onMounted(() => {
    // 判断是否是第一次访问此网站
    if(!localStorage.getItem('IS_VISIT')){
        document.documentElement.scrollTop = document.body.clientHeight;
    }
    let clientHeight = document.body.clientHeight;
    let articleItemDOMs = document.getElementsByClassName('articleItem'); // 文章列表DOM集合
    // 监听滚动事件，实现顶部过渡
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= 100){
            sign = true;
            headerClass.value = true;
        }else{
            sign && (headerClass.value = false);
        }
        // 监听元素距离顶部的距离，当文章将要显示时，使文章往上过渡
        for(let i = 0; i < articleItemDOMs.length; i++){
            let currentDOM = articleItemDOMs[i];
            if((currentDOM.getBoundingClientRect().top - 50) <= clientHeight){
                currentDOM.classList.add('to-move');
            }
        }
    })
});
// 点击小猫，页面滚动到最上层
const scrollToTop = () => {
    let speed = 1;
    let timetop = setInterval(() => {
        speed += 2;
        document.documentElement.scrollTop = document.documentElement.scrollTop - speed;
        if(document.documentElement.scrollTop <= 0){ // 当滚动距离 大于等于 视图窗口高度时，停止滚动
            clearInterval(timetop)
        }
    }, 10)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
@keyframes poi-deg{
    0%{
        transform:rotate(0)
    }
    100%{
        transform:rotate(360deg)
    }
}
.frontHome{
    display: flex;
    flex-direction: column;
    // height: 100%;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    .sk-main{
        // width: 100%;
        // height: 100%;
        flex: 1;
        display: flex;
    }
    .sk-footer{
        width: 100%;
        background: #fff;
        padding: 30px 0;
        padding: 50px 0 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #b9b9b9; 
        font-size: 0.8rem;
        .ft-logo{
            background-image: url('@/assets/imgs/sakura.svg');
            width: 30px;
            height: 30px;
            opacity: .3;
            margin: 0 auto;
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            animation: poi-deg 12s infinite linear;
        }
        .ft-desc{
            font-family: 'Ubuntu', sans-serif;
            margin: 15px 0;
        }
        .ft-gov{
            // font-family: 'Ubuntu', sans-serif;
            color: #b9b9b9; 
            margin: 15px 0;
        }
    }
    .sk-sroll{
        position: fixed;
        right: 20px;
        height: 90%;
        z-index: 2;
        transform: translateY(-100%);
        transition: all .5s ease-in-out;
    }
    .sk-sroll-active{
        transform: translateY(0);
    }
}
</style>

<!-- 初始主页 遗留代码 -->
<!-- script: part -->
<!-- let txtList = [
  '读很多的书，走很远的路，见很多的人。',
  '滴水穿石，非一日之功',
  '为天地立心，为生民立命，为往圣继绝学，为万世开太平。',
  '悟已往之不谏，知来者之可追。',
  '醉后不知天在水，满船清梦压星河。',
];
let changeText = () => mainTxt.value = txtList[Math.floor( (Math.random() * txtList.length) )];
let mainTxt = ref(txtList[Math.floor( (Math.random() * txtList.length) )]); -->
<!-- html: part -->
<!-- <el-main v-if="false" class="main animate__animated animate__bounce">
    <h2>Hello，sakuras!</h2>
    <h2>Goodbye Friends!</h2>
    <h1 @click="changeText">{{mainTxt}}</h1>
</el-main>
<el-footer v-if="false" class="footer">
    <a href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a>
</el-footer> -->