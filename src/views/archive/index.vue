<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-04-26 10:52:45
-->
<template>
   <div class="archive">
        <div class="top-bg">
            <h2 class="catename">文章归档</h2>
        </div>
        <div class="content">
            <el-timeline>
                <el-timeline-item
                    v-for="(v, index) in state.data"
                    :key="index"
                    :color="v._color"
                    :type="v._type"
                    :hollow="true"
                    :timestamp="v.createDate"
                >
                {{ v.title }}
                </el-timeline-item>
            </el-timeline>
        </div>
        <!-- <VueDatePicker v-model="date" inline auto-apply month-picker></VueDatePicker> -->
   </div>
</template>

<script lang="ts" setup>
import { User } from '@/utils';
import { onMounted, ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import { useArticleList } from '@/hooks';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const { state, getArticleList } = useArticleList();
const date = ref(null)
const num = ref<any>('');
onMounted(() => {
    num.value = 1
    getArticleList({}, ()=>{
        state.data.map(v => {
            // v._color = '#FE9600';
            // v._type = 'warning';
        })
    });
})
</script>

<style lang='less' scoped>
.archive{
    flex: 1;
    display: flex;
    flex-direction: column;
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
        :deep(.el-timeline){
            .el-timeline-item{
                .el-timeline-item__tail{
                    border-left: 2px solid #fe9600;
                }
                .el-timeline-item__node{
                    border-color: #fe9600;
                }
            }
        }
    }
}
</style>
