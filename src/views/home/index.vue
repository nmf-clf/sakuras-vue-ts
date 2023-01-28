<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-28 17:52:10
-->
<template>
    <el-container :class="'frontHome-' + deviceType()" class="frontHome">
        <MyHeader 
            :headerClass="headerClass"
        />
        <!-- 背景图片 -->
        <img class="bg" :style="styleObject" :src="require('@/assets/imgs/home_bg.jpg')" />
        <!-- 按钮 -->
        <svg t="1674892605582" class="icon-down" @click="scrollTopToBottom" viewBox="0 0 1664 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3900" width="32" height="32"><path d="M1560.32 103.68c-52.48-52.48-136.96-52.48-189.44 0L832 642.56 291.84 103.68C239.36 51.2 154.88 51.2 102.4 103.68c-52.48 52.48-52.48 136.96 0 189.44L730.88 921.6c26.88 26.88 64 39.68 99.84 38.4 35.84 1.28 72.96-10.24 101.12-38.4l628.48-628.48c52.48-52.48 52.48-138.24 0-189.44z" fill="#ffffff" p-id="3901"></path></svg>
        <!-- 内容区域 -->
        <el-main class="new-main">
            <div class="top"></div>
            <div class="content">
                <div class="articles">
                    <el-card shadow="always" class="item"> Always </el-card>
                    <el-card shadow="always" class="item"> Always </el-card>
                    <el-card shadow="always" class="item"> Always </el-card>
                    <el-card shadow="always" class="item"> Always </el-card>
                </div>
            </div>
        </el-main>
        
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
    <!-- Copyright © 2018-2022  关于我们-->
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { useStore } from "vuex";
import { MyHeader } from '@/components'

const store = useStore();
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
    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        console.log(scrollTop);
        if(scrollTop >= 100){
            sign = true;
            headerClass.value = true;
        }else{
            sign && (headerClass.value = false);
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.frontHome{
    .bg{
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
        bottom: 50px;
        left: calc(50% - 16px);
        cursor: pointer;
        z-index: 5;
        transform: scale(1.2);
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
            .articles{
                max-width: 800px;
                margin: auto;
                padding: 4rem 0 2rem 0;
                .item{
                    width: 100%;
                    height: 300px;
                    border-radius: 10px;
                    margin-bottom: 30px;
                }
                .item:last-child{
                    margin-bottom: 0;
                }
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
}

</style>
