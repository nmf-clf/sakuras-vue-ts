<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-19 21:04:10
-->
<template>
    <div class="writter">
        <div class="category">
            <el-button class="back-home">回首页</el-button>
            <div class="new-category" @click="showNewCateName = !showNewCateName">
                <svg t="1676271816247" class="icon-add" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2810" width="0.9rem" height="0.9rem"><path d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z" p-id="2811" fill="#ffffff"></path></svg>
                新建文集
            </div>
            <!-- <transition> -->
                <div v-if='showNewCateName' class="new-cate-name">
                    <el-input class="cate-name" v-model="newCateName" placeholder="请输入文集名" />
                    <el-button class="cn-submit">提交</el-button>
                    <el-button class="cn-cancel" @click="showNewCateName = !showNewCateName">取消</el-button>
                </div>
            <!-- </transition> -->
            <transition-group>
                <draggable
                    class="cate-list-group"
                    item-key="name"
                    key="dragggable"
                    :list="categoryList"
                    v-bind="dragOptions"
                    @start="cateDragOpeartion(1)"
                    @end="cateDragOpeartion(0)"
                >
                <template #item="{ element, index }">
                    <li :key="element.name" :class="cateIndex == index ? 'active' : ''" @click="switchCateItem(element, index)">
                        {{ element.name }}
                    </li>
                </template>
                </draggable>
            </transition-group>
        </div>
        <div class="note">
            <div class="new-note" @click="addArticle('top')">
                <svg t="1676277252611" class="icon-add" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3761" width="16" height="16"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="3762" fill="#515151"></path></svg>
                新建文章
            </div>
            <transition-group>
                <draggable
                    class="note-list-group"
                    item-key="name"
                    key="dragggable"
                    :list="noteList"
                    v-bind="dragOptions"
                    @start="noteDragOpeartion(1)"
                    @end="noteDragOpeartion(0)"
                >
                    <template #item="{ element, index }">
                        <li :key="index" :class="noteIndex == index ? 'active' : ''" @click="switchNoteItem(element, index)">
                            <img class="book" />
                            <div class="desc">
                                <div class="title">
                                    {{ element?.title }}
                                </div>
                                <div class="brief"></div>
                            </div>
                        </li>
                    </template>
                </draggable>
            </transition-group>
            <div class="new-note new-note-bt" @click="addArticle('bottom')">
                <svg t="1676277252611" class="icon-add" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3761" width="16" height="16"><path d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z" p-id="3762" fill="#515151"></path></svg>
                在下方新建文章
            </div>
        </div>
        <div class="editor">
            <el-input class="title" v-model="noteDetail.title" placeholder="请输入文章标题" />
            <MdWritter
                :noteDetail="noteDetail"
                :content="noteDetail.content"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import draggable from 'vuedraggable';
import { onMounted, ref, reactive } from 'vue';
import { DictionaryApi, ArticleApi } from "@/api";
import { ElMessage } from 'element-plus';
import MdWritter from "./MdWritter.vue";
import { Utils } from "@/utils";

const showNewCateName = ref(false);
const newCateName = ref('');
const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
});
const drag = ref(false);
const categoryList = <any>reactive([]); // 分类列表
const cateIndex = ref(0); // 分类下标
const noteList = <any>reactive([]); // 笔记列表
const noteIndex = ref(0); // 笔记下标
let currentCate: any; // 当前选中的分类对象
let currentNote: any; // 当前选中的笔记对象
const noteDetail = ref({ 
    title: '', // Y
    content: '', // Y
}); // 标题内容
  
onMounted(() => {
    DictionaryApi.GetDictionaryListAjax({})
    .then(res=> {
        let list = res.data || {};
        let cates = list.filter(v => v.type === 'articleType')[0].children;
        cates?.map((item, index) => {
            categoryList.push({
                ...item,
                name: item.label,
                order: index + 1
            })
        })
        getNoteList({
            type: cates![0].label, // 默认查询第一个分类的笔记
            sortByIndex: true,
            loading: '.note', 
        });
    })
})
// 获取分类对应的文章
const getNoteList = (params: any, noteIndex?: number) => {
    ArticleApi.GetNewArticleListAjax({
        username: 'niumengfei',
        page: 1,
        pageSize: 999,
        ...params,
    })
    .then(res => {
        noteList.length = 0; // 清空响应式数组数据
        let firstlist = res.data.list;
        firstlist?.map((item, index) => {
            noteList.push({ // 默认查询第一个分类的笔记
                ...item,
                order: index + 1
            })
        })
        noteDetail.value = noteList[noteIndex || 0] || {}; // 默认获取第一个笔记
    })
}
// 编辑列表顺序
const cateDragOpeartion = (start: number) => {
    if(start){
        drag.value = true;
        currentCate = categoryList[cateIndex.value]; // 1. 找出当前ref下标对应的分类
    }else{
        drag.value = false;
        let newIndex = 0;
        categoryList.map((v: any, i: number) =>{ // 2. 并且获取此分类的新的index，
            if(v.label == currentCate.label){
                newIndex = i;
            }
        })
        cateIndex.value = newIndex; // 3. 然后改变ref下标的值，使得 .active 样式可以与 上次选中的同步
        let newChildrenIdList = categoryList.map((v: any) => v._id);
        DictionaryApi.ResetDictionaryIndexAjax({ newChildrenIdList })
    }
}
// 编辑文章顺序
const noteDragOpeartion = (start: number) => {
    if(start){
        drag.value = true;
        currentNote = noteList[noteIndex.value]; // 1. 找出当前ref下标对应的文章
    }else{
        drag.value = false;
        let newIndex = 0;
        noteList.map((v: any, i: number) =>{ // 2. 并且获取此文章的新的index
            if(v.title == currentNote.title){
                newIndex = i;
            }
        })
        noteIndex.value = newIndex; // 3. 然后改变ref下标的值，使得 .active 样式可以与 上次选中的同步
        let newChildrenIdList = noteList.map((v: any) => v._id);
        ArticleApi.ResetArticleIndexAjax({ newChildrenIdList })
    }
}
// 切换分类
const switchCateItem = (element: any, index: number) => {
    cateIndex.value = index;
    noteIndex.value = 0; // 重置笔记下标
    getNoteList({
        type: categoryList![index].label, // 默认获取一级分类的文章
        sortByIndex: true,
        loading: '.note', 
    });
}
// 切换文章
const switchNoteItem = (element: any, index: number) => {
    noteIndex.value = index;
    noteDetail.value = noteList[index] || {};
};
// 新建文章
const addArticle = (type: string) => {
    let params = {
        _id: null,
        title: Utils.moment().currentDate(),
        content: '',
        type: categoryList[cateIndex.value].value,
        username: 'niumengfei',
        status: '已发布',
    }
    if(type == 'top'){
        params['index'] = Number(noteList[0].index) - 1, 
        noteList.unshift(params)
        noteIndex.value = 0;
        noteDetail.value = params;
    }
    if(type == 'bottom'){
        params['index'] = Number(noteList[noteList.length-1].index) + 1, 
        noteList.push(params)
        noteIndex.value = noteList.length - 1;
        noteDetail.value = params;
    }
    addArticleRequest(params);
}
const addArticleRequest = (params: any) => { 
    ArticleApi.AddNewArticleAjax({
        ...params
    })
    .then(res => {
        let data = res.data;
        // noteDetail.value = data;
        getNoteList({
            type: categoryList![cateIndex.value].label, // 默认查询第一个分类的笔记
            sortByIndex: true,
        }, noteIndex.value);
    })
}
</script>

<style lang="less" scoped>
.writter{
     font-family:"Times New Roman",Times,serif;
    // font-family: "楷体", "楷体_GB2312", serif;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
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
            cursor: pointer;
            z-index: 10;
        }
        .new-category{
            color: #fff;
            width: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            background: #404040;
            z-index: 10;
            .icon-add{
                margin: 0 5px 0 12px;
            }
        }
        .cate-list-group{
            width: 100%;
            color: #fff;
            margin-top: 10px;
            font-size: 1rem;
            cursor: pointer;
            li{
                padding-left: 10px;
                height: 40px;
                display: flex;
                align-items: center;
                list-style: none;
                border-left: 5px solid rgba(255, 255, 255, 0);
            }
            .active{
                background: #666;
                border-left: 5px solid #ec7259;
            }
            li:hover{
                background: #666;
            }
        }
        .ghost {
            opacity: 0.5;
            background: #c8ebfb;
        }
        .new-cate-name{
            width: 80%;
            margin: 15px auto;
            z-index: 2;
            :deep(.cate-name){
                .el-input__wrapper{
                    background: #666;
                    box-shadow: none;
                }
                .el-input__inner{
                    color: #fff;
                }
                .is-focus{
                    border: none;
                    outline: none;
                    box-shadow: none;
                }
            }
            .cn-submit, .cn-cancel{
                margin-top: 10px;
                border-radius: 10px;
                background: #404040;
            }
            .cn-submit{
                color: #42c02e;
                border-color: #42c02e;
            }
            .cn-cancel{
                color: #Fff;
                border: none;
            }
        }
        .v-enter-active,
        .v-leave-active {
            transition: transform 0.5s ease;
        }

        .v-enter-from{
            transform: translateY(-100%);
        }
        .v-leave-to {
            transform: translateY(0%);
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
            cursor: pointer;
            .icon-add{
                margin: 0 5px 0 30px;
            }
        }
        .new-note:first-child{
            border-bottom: 1px solid #E6E6E6;
        }
        .new-note-bt{
            font-size: 0.8rem;
            color: #666;
        }
        .new-note:hover,
        .new-note-bt:hover{
            color: #000;
        }
        .note-list-group{
            width: 100%;
            cursor: pointer;
            li{
                padding-left: 10px;
                height: 90px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #d8d8d8;
                list-style: none;
                position: relative;
                padding: 0px 10px 0px 60px;
                border-left: 5px solid rgba(255, 255, 255, 0);
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
        width: 100%;
        display: flex;
        flex-direction: column;
        .title{
            height: 60px;
            :deep(.el-input__wrapper){
                box-shadow: none;
            }
            :deep(.el-input__inner){
                height: 100%;
                font-size: 1.3rem;
                border: none;
                outline: none;
                box-shadow: none;
            }
            :deep(.is-focus){
                border: none;
                outline: none;
                box-shadow: none;
            }
        }
    }
}
</style>