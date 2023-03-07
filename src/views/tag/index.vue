<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-06 11:32:24
-->
<template>
   <div class="tag">
        <div class="top-bg">
            <h2 class="catename">标签<sup class="catenum">8</sup></h2>
        </div>
        <div class="content">
            <el-badge v-for="v in cateList" :value="12" class="badge">
                <el-button>{{ v.label }}</el-button>
            </el-badge>
        </div>
   </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";

const cateList = [{
    label: '全部',
    num: 0
},{
    label: '全部1',
    num: 0
},{
    label: '全部2',
    num: 0
},{
    label: '全部3',
    num: 3
},{
    label: '全部4',
    num: 22
}]

</script>

<style lang='less' scoped>
.tag{
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
