<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-14 17:22:45
-->
<template>
   <div class="file">
        <div class="top-bg">
            <h2 class="catename">归档</h2>
        </div>
        
   </div>
</template>

<script lang="ts" setup>
import { User } from '@/utils';
import { onMounted, ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";


</script>

<style lang='less' scoped>
.file{
    flex: 1;
    display: flex;
    flex-direction: column;
    // margin-left: 27%;
    background: #F9F9F9;
    .top-bg{
        width: 100%;
        height: 19rem;
        margin-top: 4rem;
        position: relative;
        background-image: url('@/assets/imgs/category.jpg');
        background-size: cover;
        background-position: center;
        display: table-cell;
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: center;
        .catename{
            font-size: 2rem;
            color: #fff;
            .catenum{
                margin-left: 5px;
            }
        }
    }
    .content{
        padding: 20px 0;
        margin-left: 27%;
        position: relative;
        display: flex;
        flex-direction: row;
        padding-right: 300px;
        flex: 1;
        .badge{
            // margin: 10px 40px;
            margin-right: 40px;
            :deep(sup){
                background: #FE9600;
            }
        }
    }
}
</style>
