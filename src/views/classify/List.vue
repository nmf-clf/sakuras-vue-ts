<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-03-29 18:17:37
-->
<template>
   <div class="category">
        <div class="top-bg">
            <p class="catename">{{ _value ? '分类：' : '标签：' }}<span>{{ _type }}</span></p>
        </div>
        <div class="content">
            <div class="card">
                <el-skeleton v-if="isLoading" :rows="5" animated style="display: flex; justify-content: space-between;" >
                    <template #template>
                        <el-skeleton-item variant="circle" style="width: 94px; height: 94px"/>
                        <el-skeleton :rows="4"  style="flex: 1; margin-left: 50px;" />
                    </template>
                </el-skeleton>
                <div v-else class="item-card" v-for="v in articleList">
                    <div class="left">
                        <div class="avatar-box">
                            <el-avatar class="avatar" :size="94" :src="imgurl"/>
                            <div class='file' @click="viewDetails(v)"><svg t="1679556460412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4973" width="35" height="35"><path d="M288 320h448a32 32 0 0 0 0-64H288a32 32 0 0 0 0 64zM288 544h448a32 32 0 0 0 0-64H288a32 32 0 0 0 0 64zM544 704H288a32 32 0 0 0 0 64h256a32 32 0 0 0 0-64z" p-id="4974" fill="#ffffff"></path><path d="M896 132.928C896 77.28 851.552 32 796.928 32H227.04C172.448 32 128 77.28 128 132.928v758.144C128 946.72 172.448 992 227.04 992h435.008c1.568 0 2.912-0.672 4.416-0.896 8.96 1.6 18.464-0.256 25.984-6.528l192-160a31.424 31.424 0 0 0 10.816-27.2c0.16-1.184 0.736-2.208 0.736-3.424V132.928zM192 891.072V132.928C192 112.576 207.712 96 227.04 96h569.888C816.288 96 832 112.576 832 132.928V736h-96a96 96 0 0 0-96 96v96H227.04C207.712 928 192 911.424 192 891.072zM814.016 800L704 891.68V832a32 32 0 0 1 32-32h78.016z" p-id="4975" fill="#ffffff"></path></svg></div>
                        </div>
                        <div class="issue-hot">
                            <div class="issue"><el-icon><ChatDotRound /></el-icon>{{ 0 }}{{ ' 条评论' }}</div>
                            <div class="hot"><el-icon><View /></el-icon>{{ v.hot }} {{ ' 热度' }}</div>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <div class="title-box" @click="viewDetails(v)">
                                <span class="title">{{ v.title }}</span>
                                <div class="date"><el-icon><Clock /></el-icon>发布于 {{ v.createDate }}</div>
                            </div>
                            <div class="desc">{{ Utils.filterMarkdown(v.content).slice(0, 130) ? (Utils.filterMarkdown(v.content).slice(0, 130) + '') : '' }}</div>
                        </div>
                        <div class="more">
                            <!-- <el-icon><MoreFilled /></el-icon> -->
                            <svg @click="viewDetails(v)" t="1674958997504" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1680" width="32" height="32"><path d="M150.528 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0zM519.168 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0zM887.808 431.104q37.888 0 58.368 24.064t20.48 51.712l0 11.264q0 34.816-17.92 58.88t-59.904 24.064l-7.168 0q-38.912 0-61.952-21.504t-23.04-59.392l0-14.336q0-13.312 5.632-26.624t15.872-24.064 25.6-17.408 33.792-6.656l10.24 0z" p-id="1681" fill="#515151"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script lang="ts" setup>
import { User, Utils } from '@/utils';
import { onMounted, ref, reactive, toRefs } from 'vue';
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useStore } from "vuex";
import { ArticleApi } from '@/api/index'
import { ElStep } from 'element-plus';
import { ArticleListResItem } from "@/api/model/articleModel";

const userInfo = User.get();
const route = useRoute();
const router = useRouter();
const { cateNumInfo = [] } = User.get();
const { _type, _value } = route.params;

const imgurl = require('@/assets/imgs/photo.jpg')
let articleList = <ArticleListResItem[]>reactive([]);
const isLoading = ref(false);

onMounted(() => {
    GetArticleListAjax();
})

const GetArticleListAjax = () => {
    let params = {
        username: userInfo.username,
        _id: userInfo._id,
        notlogin: true,
    }
    if(_value){ // 分类
        params['type'] = _value
    }else{ // 标签
        params['tag'] = [_type]
    }
    isLoading.value = true;
    ArticleApi.GetNewArticleListAjax(params)
    .then(res => {
        setTimeout(() => {
            isLoading.value = false;
            let data = res.data?.list || [];
            articleList.push(...data);
        }, 0);
    })
    .catch(err => {
        isLoading.value = false;
    })
}
const viewDetails = (item: any) => {
    const newWindow = window.open(`${window.location.origin}/#/article/${item._id}`) as any;
    // newWindow.onload = () => { 
    //     let _t = item.title + ' - 夜语清梦';
    //     localStorage.setItem('DOCUMENT_TITLE', _t); // 这里使用 SessionStorage 出现问题：每次获取的值都是上一次的值
    //     newWindow.document.title = _t;
    // }
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
            letter-spacing: 2px;
            font-weight: bold;
        }
    }
    .content{
        width: 800px;
        max-width: 800px;
        margin: 20px auto;
        padding: 20px 0;
        display: flex;
       .card{
            width: 100%;
            color: #504e4e;
            .item-card{
                display: flex;
                flex-direction: row;
                padding: 20px 10px;
                min-height: 210px;
                .left{
                    // flex: 1;
                    width: 20%;
                    text-align: center;
                    position: relative;
                    .avatar-box{
                        position: relative;
                        width: 100%;
                        height: 100%;
                        .avatar{
                            position: absolute;
                            top: 0;
                            left: calc(50% - 47px);
                        }
                        .file{
                            position: absolute;
                            top: 0;
                            left: calc(50% - 47px);
                            width: 94px;
                            height: 94px;
                            border-radius: 50%;
                            background: #fe9600;
                            opacity: 0;
                            transition: all 0.6s ease-out;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .file:hover{
                            opacity: 1;
                        }
                    }
                }
                .right{
                    // flex: 6;
                    width: 80%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 25px;
                    .title-box{
                        font-size: 1.18rem;
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .title{
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            cursor: pointer;
                        }
                        .date{
                            float: right;
                            min-width: 150px;
                            font-size: 0.8rem;
                            color: #989898;
                            text-align: right;
                            .el-icon{
                                margin-right: 5px;
                            }
                        }
                    }
                    .desc{
                        font-size: 0.88rem;
                        line-height: 2;
                        display: -webkit-box;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        word-wrap: break-word;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        padding-top: 10px;
                    }
                    .more{
                        text-align: right;
                        margin-top: 10px;
                        .icon{
                            cursor: pointer;
                        }
                    }
                }
                .issue-hot{
                    position: absolute;
                    opacity: 0;
                    top: 0;
                    left: 0;
                    height: 94px;
                    transition: all 0.6s ease-out;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    text-align: left;
                    transform: translateX(0);
                    white-space: nowrap;
                    padding-top: 15px;
                    .issue{
                        border-top: 1px solid #ddd;
                        padding-top: 10px;
                    }
                    .hot{
                        margin-bottom: 20px;
                    }
                    .issue, .hot{
                        font-size: 0.8rem;
                        height: 25px;
                        line-height: 25px;
                        i{
                            margin-right: 3px;
                            position: relative;
                            top: 2px;
                        }
                    }
                }
            }
            .item-card:hover .issue-hot{
                opacity: 1;
                transform: translateX(-65px);
            }   
       }
    }
}
</style>
