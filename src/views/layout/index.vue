<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-31 13:51:31
-->
<template>
    <el-container :class="'frontHome-' + deviceType()" class="frontHome">
        <MyHeader 
            :headerClass="headerClass"
        />
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


const styleObject = reactive({
    height: document.body.clientHeight + 'px'
})

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

const scrollTopToBottom = () => {
    let speed = 1;
    let timetop = setInterval(function(){
        speed < 20 ? (speed+=1) : null;
        document.documentElement.scrollTop = document.documentElement.scrollTop + speed;
        if(document.documentElement.scrollTop >= document.body.clientHeight){
            clearInterval(timetop)
        }
    }, 10)
}

const onErrorImg = (e: any) =>{
}

const onLoadImg = (e: any) => {
    if(localStorage.getItem('IS_VISIT')) return;
    localStorage.setItem('IS_VISIT', String(new Date().getTime()));
    document.documentElement.scrollTop = 0;
}

const viewDetails = () => {
    router.push({ path: '/article' });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.frontHome{
    .sk-main{
        width: 100%;
    }
}
</style>
