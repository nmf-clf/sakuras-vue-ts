<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-13 18:14:31
-->
<template>
    <div class="writter">
        <div class="category">
            <el-button class="back-home">回首页</el-button>
            <div class="new-category">
                <svg t="1676271816247" class="icon-add" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2810" width="0.9rem" height="0.9rem"><path d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z" p-id="2811" fill="#ffffff"></path></svg>
                新建文集
            </div>
            <transition-group>
                <draggable
                    class="cate-list-group"
                    item-key="name"
                    key="dragggable"
                    :list="categoryList"
                    v-bind="dragOptions"
                    @start="dragOpeartion(1)"
                    @end="dragOpeartion(0)"
                >
                <template #item="{ element }">
                    <li :key="element.name">
                        {{ element.name }}
                    </li>
                </template>
                </draggable>
            </transition-group>
        </div>
        <div class="note">
            <div class="new-note">
                <svg t="1676277252611" class="icon-add" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3761" width="16" height="16"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="3762" fill="#515151"></path></svg>
                新建文章
            </div>
            <transition-group>
                <draggable
                    class="note-list-group"
                    item-key="name"
                    key="dragggable"
                    :list="categoryList"
                    v-bind="dragOptions"
                    @start="dragOpeartion(1)"
                    @end="dragOpeartion(0)"
                >
                    <template #item="{ element, index }">
                        <li :key="element.name" :class="noteIndex == index ? 'active' : ''" @click="switchNoteItem(element, index)">
                            <img class="book" />
                            <div class="desc">
                                <div class="title">
                                    {{ element.name }}
                                </div>
                                <div class="brief"></div>
                            </div>
                        </li>
                    </template>
                </draggable>
            </transition-group>
        </div>
        <div class="editor">编辑器</div>
    </div>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable';
import { onMounted, ref, reactive } from 'vue';
import { DictionaryApi, ArticleApi } from "@/api";
import { ElMessage } from 'element-plus';

const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
];
const list = ref(
  message.map((name, index) => {
    return { name, order: index + 1 };
  })
);
const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
});
const drag = ref(false);
const categoryList = <any>reactive([]); // 分类列表
const noteList = <any>reactive([]); // 笔记列表
const noteIndex = ref(0);

onMounted(() => {
    DictionaryApi.GetDictionaryListAjax({})
    .then(res=> {
        let list = res.data || {};
        let articleList = list.filter(v => v.type === 'articleType')[0].children;
        console.log(articleList);
        articleList?.map((item, index) => {
            categoryList.push({
                ...item,
                name: item.label,
                order: index + 1
            })
        })
        getFirstCateList({
            type: articleList![0].label
        });
    })
})
// 默认获取分类一的文章
const getFirstCateList = (params: any) => {
    ArticleApi.GetNewArticleListAjax({
        username: 'niumengfei',
        page: 1,
        pageSize: 999,
        ...params,
    })
    .then(res => {
        let list = res.data;
    })
}
const dragOpeartion = (start: number) => {
    if(start){
        console.log('start');
        drag.value = true
    }else{
        drag.value = false;
        let newChildrenIdList = categoryList.map((v: any) => v._id);
        console.log('end', newChildrenIdList);
        DictionaryApi.ResetDictionaryIndexAjax({
            newChildrenIdList
        })
        .then(res =>{
            // ElMessage({ type: 'success', message: `排序更新成功` });
        })
    }
}
// 切换文章
const switchNoteItem = (element: any, index: number) => {
    noteIndex.value = index;
};

const sort = () => {
  console.log('here');
  list.value = list.value.sort((a, b) => a.order - b.order);
};


</script>

<style lang="less" scoped>
.writter{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    cursor: pointer;
    .category{
        width: 16.6%;
        background: #404040;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.9rem;
        overflow-y: scroll;
        overflow-x: hidden;
        .back-home{
            background: #404040;
            width: 80%;
            height: 40px;
            color: #ec7259;
            border: 1px solid #ec7259; 
            margin: 30px 0;
            font-size: 1rem;
            border-radius: 20px;
        }
        .new-category{
            color: #fff;
            width: 100%;
            display: flex;
            align-items: center;
            .icon-add{
                margin: 0 5px 0 12px;
            }
        }
        .cate-list-group{
            width: 100%;
            color: #fff;
            margin-top: 10px;
            font-size: 1rem;
            li{
                padding-left: 10px;
                height: 40px;
                display: flex;
                align-items: center;
                list-style: none;
            }
            li:nth-child(1){
                background: #666;
            }
            li:hover{
                background: #666;
            }
        }
        .ghost {
            opacity: 0.5;
            background: #c8ebfb;
        }
    }
    .note{
        width: 25%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        .new-note{
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            color: #595959;
            padding: 20px 0;
            .icon-add{
                margin: 0 5px 0 30px;
            }
        }
        .note-list-group{
            width: 100%;
            li{
                padding-left: 10px;
                height: 90px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #d8d8d8;
                border-left: 5px solid #fff;
                list-style: none;
                position: relative;
                padding: 0px 10px 0px 60px;
                .book{
                    position: absolute;
                    top: 30px;
                    left: 20px;
                    width: 22px;
                    height: 30px;
                    background: url('@/assets/imgs/sprite.png') no-repeat 0 -25px;
                    background-size: 250px;
                }
                .desc{

                }
            }
            .active{
                background: #E6E6E6;
                border-left: 5px solid #ec7259;
            }
            li:hover{
                background: #E6E6E6;
            }
        }
    }
    .editor{
        flex: 1;
    }
}
</style>