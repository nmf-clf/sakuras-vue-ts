<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-01 17:04:12
-->
<template>
    <el-container :class="'frontHome-' + deviceType()" class="frontHome">
        <MyHeader :headerClass="headerClass" />
        <img class="sk-sroll" :class="headerClass ? 'sk-sroll-active' : null" @click="scrollToTop" src="@/assets/imgs/scroll.png" />
        <div class="sk-main">
            <router-view v-slot="{ Component }">
                <!-- <transition name="move" mode="out-in"> -->
                        <!-- 在这里可以通过tags去控制 打开的页面进行缓存数据 -->
                    <!-- <keep-alive :include=[tagsNameList()]> 遗留问题 include 不生效 -->
                    <!-- <keep-alive> -->
                        <component :is="Component"></component>
                    <!-- </keep-alive> -->
                <!-- </transition> -->
            </router-view>
        </div>
        <div class="sk-footer">
            <p class="ft-logo"></p>
            <p class="ft-desc">powered  by  myself • Crafted with  by vuecli</p>
            <p>
              © 2023 夜语清梦&nbsp;<a class="ft-gov" href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a></p>
        </div>
        <el-main v-if="false" class="main animate__animated animate__bounce">
            <h2>Hello，sakuras!</h2>
            <h2>Goodbye Friends!</h2>
            <h1 @click="changeText">{{mainTxt}}</h1>
            <!-- <a href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a> -->
        </el-main>
        <el-footer v-if="false" class="footer">
            <a href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a>
        </el-footer>
    </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { MyHeader } from '@/components'
import { ElContainer, ElMain, ElCard, ElFooter } from 'element-plus';

const store = useStore();
const router = useRouter();
const deviceType = () => store.getters.deviceType;

/* 定义数据 */
let txtList = [
  '读很多的书，走很远的路，见很多的人。',
  '滴水穿石，非一日之功',
  '为天地立心，为生民立命，为往圣继绝学，为万世开太平。',
  '悟已往之不谏，知来者之可追。',
  '醉后不知天在水，满船清梦压星河。',
];

let mainTxt = ref(txtList[Math.floor( (Math.random() * txtList.length) )]);

let changeText = () => mainTxt.value = txtList[Math.floor( (Math.random() * txtList.length) )];

let headerClass = ref(false);

let sign = false;

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

const scrollToTop = () => {
    let speed = 1;
    let timetop = setInterval(() => {
        speed < 20 ? (speed+=1) : null; // 匀加速
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
    .sk-main{
        width: 100%;
    }
    .sk-footer{
        width: 100%;
        background: #fff;
        padding: 30px 0;
        padding: 100px 0 50px 0;
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
