<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-16 17:48:44
-->
<template>
    <div class="article">
        <div class="detail-top">
            <img
                class="img"
                :src="require('@/assets/imgs/home_bg.jpg')" 
            />
            <div class="desc">
                <div class="title">{{ formData.mdData.title }}</div>
                <div class="btm">
                    <img :src="require('@/assets/imgs/photo.jpg')" />
                    <span>{{ formData.mdData.nickname || formData.mdData.username }}</span> ·
                    <span>发布于 {{ formData.mdData.createDate }}</span> ·
                    <span>最后编辑于 {{ formData.mdData.updateDate }}</span> ·
                    <span>{{ formData.mdData.hot + 1 || 0 }}次阅读</span>
                </div>
            </div>
        </div>
        <div class="content">
            <el-skeleton  v-if="isLoading" :rows="5" animated class="detail-loading"/>
            <MdPreview 
                v-else
                :content="formData.mdData.content || ''"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";
import MdPreview from "./MdPreview.vue";
import { GetArticleNewDetailAjax } from "@/api/article";
import { ArticleListResItem } from "@/api/model/articleModel";

interface FormDataType {
    mdData: ArticleListResItem
}

const Route = useRoute();

const { _id } = Route.params;

const formData = <FormDataType>reactive({ mdData: {} });
const isLoading = ref(false);


console.log('Route::', Route);

onMounted(() => {
    // 查询文章详情
    isLoading.value = true;
    GetArticleNewDetailAjax({ 
        _id, 
    })
    .then(res => {
        console.log('文章详情=>', res.data);
        isLoading.value = false;
        const { data } = res;
        formData.mdData = data;
        
    })
    .catch(err => {
        isLoading.value = false;
    })
});

</script>

<style lang='less' scoped>
.article{
    flex: 1;
    .detail-top{
        width: 100%;
        // height: 400px;
        height: 19rem;
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
    .detail-loading{
        width: 100%;
        margin-top: 50px;
    }
    .content{
        margin-left: 27%;
        position: relative;
        display: flex;
        flex-direction: row;
        padding-right: 300px;
    }
}

</style>
