<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-03-29 17:32:51
-->
<template>
   <div class="category">
        <div class="top-bg">
            <p class="catename">{{ routeMeta?.title }}<sup class="catenum">8</sup></p>
        </div>
        <div class="content">
            <div class="cates">
                <!-- <el-badge v-for="v in cateNumInfo" :value="v.num" class="badge">
                    <el-button size="large" :style="{background: getBgColor()}">{{ v.type }}</el-button>
                </el-badge> -->
                <el-button v-for="v in showNumInfo" size="large" :style="{background: getBgColor()}" @click="handleClick(v)"><span class="text">{{ v.type }}</span><span class="num">{{ v.num }}</span></el-button>
            </div>
        </div>
   </div>
</template>

<script lang="ts" setup>
import { User } from '@/utils';
import { onMounted, ref, reactive, onBeforeUpdate } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();
const { cateNumInfo = [], tagNumInfo = [] } = User.get();
const showNumInfo = <any>ref([]);
const routeMeta = <any>ref({});

const { keepAliveList } = store.getters.routeInfo;
const bgcolors = [
    'rgb(255, 203, 108)',
    'rgb(255, 219, 222)',
    'rgb(255, 248, 50)',
    'rgb(255, 248, 213)',
    'rgb(255, 208, 10)',
    'rgb(255, 194, 30)',
    'rgb(255, 234, 54)',
]
const URLEnum = {
    '分类': 'FrontCategoryList',
    '标签': 'FrontTagList',
}
onMounted(() => {
    getNumInfo(route);
})
onBeforeUpdate(() => {
    getNumInfo(route);
})
// 获取数量信息
const getNumInfo = (route: any) => {
    const { title } = route.meta;
    routeMeta.value = route.meta;
    if(title == '分类'){
        showNumInfo.value = cateNumInfo;
    }
    if(title == '标签'){
        showNumInfo.value = tagNumInfo;
    }
}
const getBgColor = () => {
    return  bgcolors[Math.floor( (Math.random() * bgcolors.length) )]
}
const handleClick = (v: any) => {
    const title = route.meta.title as string;
    router.push({
        name: URLEnum[title],
        params: {
            _type: v.type,
            _value: v.value,
        }
    })
}
</script>

<style lang='less' scoped>
.category{
    flex: 1;
    display: flex;
    flex-direction: column;
    .top-bg{
        width: 100%;
        height: 19rem;
        margin-top: 4rem;
        position: relative;
        // background-image: url('@/assets/imgs/category.jpg');
        background-image: url('https://cdn.lixingyong.com/2020/07/16/84da49720d4fb21d1113bcfa84b1a150.jpg');
        background-size: cover;
        background-position: center;
        display: table-cell;
        vertical-align: middle;
        display: flex;
        align-items: center;
        justify-content: center;
        .catename{
            font-size: 2.2rem;
            color: #fff;
            letter-spacing: 5px;
            font-weight: bold;
            .catenum{
                margin-left: 5px;
            }
        }
    }
    .content{
        width: 800px;
        max-width: 800px;
        margin: auto;
        padding: 20px 0;
        display: flex;
        .cates{
            width: 100%;
            padding: 34px 44px;
            border-radius: 10px;
            box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
            .badge{
                margin: 10px;
                :deep(sup){
                    background: #FE9600;
                }
            }
            .el-button{
                border-radius: 5px;
                box-shadow: 0 3px 5px rgba(0,0,0,.12);
                border: none;
                .text{
                    font-size: 0.9rem;
                }
                .num{
                    font-size: 0.9rem;
                    margin-left: 5px;
                    color: #9b8b2a;
                }
            }
            .el-button{
                margin: 10px;
            }
            .el-button:not(:first-child){
                margin-left: 25px;
            }
            .el-button:hover{
                color: #fff;
                background: linear-gradient(to right,#4cbf30 0,#0f9d58 100%) !important;
            }
            .el-button:hover .num{
                color: #fff;
            }
        }
      
    }
}
</style>
