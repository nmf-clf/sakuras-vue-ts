<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-01 13:49:13
-->
<template>
    <div class="detail-top">
        <img
            class="img"
            :src="require('@/assets/imgs/home_bg.jpg')" 
        />
        <div class="desc">
            <div class="title">这是测试的标题</div>
            <div class="btm">
                <img :src="require('@/assets/imgs/photo.jpg')" />
                <span>夜语清梦</span> ·
                <span>发布于 2023-01-06</span> ·
                <span>最后编辑于 2023-01-07</span> ·
                <span>24次阅读</span>
            </div>
        </div>
    </div>
    <div class="content">
        <MdPreview 
        
        />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import { useStore } from "vuex";
import MdPreview from "./MdPreview.vue";

const store = useStore();

</script>

<style lang='less' scoped>
.detail-top{
    width: 100%;
    height: 400px;
    position: relative;
    margin-top: 4rem;
    .img{
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
        pointer-events: none;    
    }
    .desc{
        position: absolute;
        bottom: 0;
        color: #fff;
        max-width: 50%;
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        padding-bottom: 30px;
        margin-left: 27%;
        .title{
            width: 100%;
            font-size: 1.8rem;
        }
        .btm{
            font-size: 0.9rem;
            margin-top: 25px;
            display: flex;
            align-items: center;
            img{
                width: 1.5rem;
                border-radius: 50%;
            }
            span{
                margin: 0 5px;
            }
        }
    }
}
.content{
    margin-left: 27%;
    position: relative;
    display: flex;
    flex-direction: row;
    padding-right: 300px;
}
</style>
