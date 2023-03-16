<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-16 16:32:17
-->
<template>
   <div class="category">
        <div class="top-bg">
            <h2 class="catename">分类<sup class="catenum">8</sup></h2>
        </div>
        <div class="content">
            123
        </div>
   </div>
</template>

<script lang="ts" setup>
import { User } from '@/utils';
import { onMounted, ref, reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const { cateNumInfo = [] } = User.get();
const { _type } = route.params;
console.log('route2::', _type);

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
            font-size: 2rem;
            color: #fff;
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
            padding: 44px 44px;
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
