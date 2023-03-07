<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-07 15:46:13
-->
<template>
    <div class="writter">
        <div class="category">
            <el-button class="back-home" @click="router.push('/home')">回首页</el-button>
            <div class="new-category" @click="showNewCatebox = !showNewCatebox">
                <svg t="1676271816247" class="icon-add" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2810" width="0.9rem" height="0.9rem"><path d="M925.696 384q19.456 0 37.376 7.68t30.72 20.48 20.48 30.72 7.68 37.376q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68l-287.744 0 0 287.744q0 20.48-7.68 37.888t-20.48 30.208-30.72 20.48-37.376 7.68q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888l0-287.744-287.744 0q-20.48 0-37.888-7.68t-30.208-20.48-20.48-30.208-7.68-37.888q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68l287.744 0 0-287.744q0-19.456 7.68-37.376t20.48-30.72 30.208-20.48 37.888-7.68q39.936 0 68.096 28.16t28.16 68.096l0 287.744 287.744 0z" p-id="2811" fill="#ffffff"></path></svg>
                新建文集
            </div>
            <!-- <transition> -->
                <div class="new-cate-name" :class="showNewCatebox?'new-cate-name-active': ''">
                    <el-input class="cate-name" v-model="newCateName" placeholder="请输入文集名" />
                    <el-button class="cn-submit" @click="cateSubmit">提交</el-button>
                    <el-button class="cn-cancel" @click="showNewCatebox = !showNewCatebox">取消</el-button>
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
                        <el-popover
                            popper-class="writter-popover"
                            :width="100"
                            placement="bottom"
                            trigger="click"
                        >
                            <template #reference>
                                <svg v-show="cateIndex == index" t="1677040591896" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3220" width="16" height="16"><path d="M940 596l-76-57.6c0.8-8 1.6-16.8 1.6-26.4s-0.8-18.4-1.6-26.4l76-57.6c20.8-16 26.4-44 12.8-68l-84.8-143.2c-9.6-16.8-28-27.2-47.2-27.2-6.4 0-12 0.8-18.4 3.2L712 228c-15.2-10.4-31.2-19.2-47.2-26.4l-13.6-92c-4-26.4-26.4-45.6-53.6-45.6H426.4c-27.2 0-49.6 19.2-53.6 44.8L360 201.6c-16 7.2-31.2 16-47.2 26.4l-90.4-35.2c-6.4-2.4-12.8-3.2-19.2-3.2-19.2 0-37.6 9.6-46.4 26.4L71.2 360c-13.6 22.4-8 52 12.8 68l76 57.6c-0.8 9.6-1.6 18.4-1.6 26.4s0 16.8 1.6 26.4l-76 57.6c-20.8 16-26.4 44-12.8 68l84.8 143.2c9.6 16.8 28 27.2 47.2 27.2 6.4 0 12-0.8 18.4-3.2L312 796c15.2 10.4 31.2 19.2 47.2 26.4l13.6 92c3.2 25.6 26.4 45.6 53.6 45.6h171.2c27.2 0 49.6-19.2 53.6-44.8l13.6-92.8c16-7.2 31.2-16 47.2-26.4l90.4 35.2c6.4 2.4 12.8 3.2 19.2 3.2 19.2 0 37.6-9.6 46.4-26.4l85.6-144.8c12.8-23.2 7.2-51.2-13.6-67.2zM704 512c0 105.6-86.4 192-192 192S320 617.6 320 512s86.4-192 192-192 192 86.4 192 192z" p-id="3221" fill="#ffffff"></path></svg>
                            </template>
                            <ul class="writter-popover-ul">
                                <li @click="changeCateName(element, index)">
                                    <span><el-icon><Edit /></el-icon></span>
                                    <span>修改文集</span>
                                </li>
                                <li @click="deleteDictionary(element._id, index)">
                                    <span><el-icon><Delete /></el-icon></span>
                                    <span>删除文集</span>
                                </li>
                            </ul>
                        </el-popover>
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
                            <img class="book" :class="element.status == '已发布' ? 'book-sent' : ''"/>
                            <div class="desc">
                                <div class="title">
                                    {{ element?.title }}
                                </div>
                                <div class="brief"></div>
                            </div>
                            <el-popover
                                popper-class="writter-popover"
                                :width="100"
                                placement="bottom"
                                trigger="click"
                            >
                                <template #reference>
                                    <svg v-show="noteIndex == index" t="1677040887069" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3722" width="16" height="16"><path d="M940 596l-76-57.6c0.8-8 1.6-16.8 1.6-26.4s-0.8-18.4-1.6-26.4l76-57.6c20.8-16 26.4-44 12.8-68l-84.8-143.2c-9.6-16.8-28-27.2-47.2-27.2-6.4 0-12 0.8-18.4 3.2L712 228c-15.2-10.4-31.2-19.2-47.2-26.4l-13.6-92c-4-26.4-26.4-45.6-53.6-45.6H426.4c-27.2 0-49.6 19.2-53.6 44.8L360 201.6c-16 7.2-31.2 16-47.2 26.4l-90.4-35.2c-6.4-2.4-12.8-3.2-19.2-3.2-19.2 0-37.6 9.6-46.4 26.4L71.2 360c-13.6 22.4-8 52 12.8 68l76 57.6c-0.8 9.6-1.6 18.4-1.6 26.4s0 16.8 1.6 26.4l-76 57.6c-20.8 16-26.4 44-12.8 68l84.8 143.2c9.6 16.8 28 27.2 47.2 27.2 6.4 0 12-0.8 18.4-3.2L312 796c15.2 10.4 31.2 19.2 47.2 26.4l13.6 92c3.2 25.6 26.4 45.6 53.6 45.6h171.2c27.2 0 49.6-19.2 53.6-44.8l13.6-92.8c16-7.2 31.2-16 47.2-26.4l90.4 35.2c6.4 2.4 12.8 3.2 19.2 3.2 19.2 0 37.6-9.6 46.4-26.4l85.6-144.8c12.8-23.2 7.2-51.2-13.6-67.2zM704 512c0 105.6-86.4 192-192 192S320 617.6 320 512s86.4-192 192-192 192 86.4 192 192z" p-id="3723"></path></svg>
                                </template>
                                <ul class="writter-popover-ul">
                                    <li v-if="element.status == '已发布'" @click="noteItemOperation('取消发布', element)"> <span><el-icon><Failed /></el-icon></span> <span>取消发布</span> </li>
                                    <li v-else @click="noteItemOperation('直接发布', element)"> <span><el-icon><Promotion /></el-icon></span> <span>直接发布</span> </li>
                                    <li @click="noteItemOperation('删除文章', element)"> <span><el-icon><Delete /></el-icon></span> <span>删除文章</span> </li>
                                    <li @click="noteItemOperation('移动文章', element)"> <span><el-icon><List /></el-icon></span> <span>移动文章</span> </li>
                                    <li @click="noteItemOperation('禁止转载', element)"> <span><el-icon><Flag /></el-icon></span> <span>禁止转载</span> </li>
                                </ul>
                            </el-popover>
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
            <div class="tags">
                <el-tag
                    v-for="tag in noteDetail.tag"
                    :key="tag"
                    class="mx-1"
                    closable
                    :disable-transitions="false"
                    @close="handleSave('DeleteTag', { label: tag })"
                >
                    {{ tag }}
                </el-tag>
                <el-dropdown class="slc">
                    <span class="el-dropdown-link">
                        添加标签
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-for="v in tagsList"  :disabled="noteDetail.tag?.includes(v.label)" @click="handleSave('AddTag', v)">{{ v.label }}</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
         
            <MdWritter
                :noteDetail="noteDetail"
                :content="noteDetail.content || ''"
                :handleSave="handleSave"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, onBeforeUpdate } from 'vue';
import { useRouter } from 'vue-router';
import { DictionaryApi, ArticleApi } from "@/api";
import { ElMessage, ElMessageBox } from 'element-plus';
import type { Action } from 'element-plus'
import draggable from 'vuedraggable';
import MdWritter from "./MdWritter.vue";
import { Utils, User } from "@/utils";
import { auto } from '@popperjs/core';

const router = useRouter();

const { username, userId } = User.get();

let _id: string = '';
const showNewCatebox = ref(false);
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
let lsCurCateList: any; // 临时当前分类列表
let lsCurNoteList: any; // 临时当前文章列表
let tagsList: any = ref([]); // 标签下拉列表
let hasCates: boolean = false; // 是否存在文章列表
const noteDetail = <any>ref({ 
    // _id: null,
    title: '', // Y
    content: '', // Y
    tag: [],
    // username: '',
    // index: null,
    // type: '',
    // status: '',
}); // 标题内容

onMounted(() => {
    getDictionaryList();
})
// 查询字典值
const getDictionaryList = (index: number = 0) => {
    DictionaryApi.GetDictionaryListAjax({
        userId,
    })
    .then(res => {
        let list = res.data || {};
        _id = list[0]._id as string;
        hasCates = list.filter(v => v.type === 'articleType').length > 0; // 判断当前用户是否存在文章分类
        let cates = list.filter(v => v.type === 'articleType')[0]?.children?.filter(v => v.label !== '全部') || [];
        let tags = list.filter(v => v.type === 'articleTag')[0]?.children?.filter(v => v.label !== '全部') || [];
        tagsList.value = tags;
        
        categoryList.length = 0
        cates?.map((v, i) => {
            categoryList.push({
                ...v,
                name: v.label,
                order: i + 1
            })
        })
        cateIndex.value = index; // 重置分类下标
        showNewCatebox.value = false; // 重置新增分类节点
        newCateName.value = ''; // 重置输入框的值
        getNoteList({
            type: cates![index].value, // 默认查询第一个分类的笔记
            sortByIndex: true,
            loading: '.note',
        });
    })
}
// 获取分类对应的文章
const getNoteList = (params: any, noteIndex?: number) => {
    ArticleApi.GetNewArticleListAjax({
        username,
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
        noteDetail.value = noteList[noteIndex || 0]  || {}; // 默认获取第一个笔记 由于此处是响应式数据赋值给了 noteDetail，因此noteDetail变化将会影响 notelist。这是合理的
    })
}
// 新增分类
const cateSubmit = () => {
    if(!hasCates){ // 如果当前用户不存在分类，则需要在字典表中新增一条属于他的 articleType 分类信息
        DictionaryApi.AddDictionaryAjax({
            pid: null,
            userId,
            type: 'articleType',
            label: '文章类型', 
            value: 'articleType',
        })
        .then(res =>{
            let { _id } = res.data;
            addTrue({ resId: _id });
        })
    }else{
        addTrue({});
    }
    function addTrue({ resId }: any){
        DictionaryApi.AddDictionaryAjax({
            pid: resId ? resId : _id, 
            userId,
            label: newCateName.value, // 分类名
            value: newCateName.value, // 分类值
        })
        .then(res =>{
            const ln = categoryList.length;
            getDictionaryList(ln);
        })
    }
}
// 删除分类
const deleteDictionary = (cateId: string, index: number) => {
    DictionaryApi.DeleteDictionaryAjax({
        _id: cateId
    })
    .then(res =>{
        // 如果删除的是最后一个元素，则应该查询上一个元素的，如果删除的是第一个则应该查询下标为0的分类的数据
        let _index =  index == categoryList.length - 1 ? categoryList.length - 2 : cateIndex.value;
        getDictionaryList(_index);
    })
}
// 修改分类名称
const changeCateName = (element: any, index: number) => {
    ElMessageBox.prompt('', '请输入新的文集名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: element.label,
    })
    .then(({ value }) => {
        DictionaryApi.AddDictionaryAjax({
            _id: element._id,
            label: value,
            rename: true,
        })
        .then(res =>{
            categoryList[index].label = value;
            categoryList[index].name = value;
        })
    })
    .catch(() => { })
}
// 编辑列表顺序
const cateDragOpeartion = (start: number) => {
    if(start){
        drag.value = true;
        currentCate = categoryList[cateIndex.value]; // 1. 找出当前ref下标对应的分类
        lsCurCateList = JSON.stringify(categoryList); // 暂存临时列表
    }else{
        drag.value = false;
        if(JSON.stringify(noteList) == lsCurCateList) return; // 如果当前拖拽的元素 位置没有发生变化，则直接return;
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
        lsCurNoteList = JSON.stringify(noteList); // 暂存临时列表
    }else{
        drag.value = false;
        if(JSON.stringify(noteList) == lsCurNoteList) return; // 如果当前拖拽的元素 位置没有发生变化，则直接return;
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
    if(cateIndex.value == index) return;
    cateIndex.value = index;
    noteIndex.value = 0; // 重置笔记下标
    getNoteList({
        type: categoryList![index].value, // 默认获取一级分类的文章
        sortByIndex: true,
        loading: '.note', 
    })
}
// 切换文章
const switchNoteItem = (element: any, index: number) => {
    noteIndex.value = index;
    noteDetail.value =  noteList[index]  || {}; // 利用响应式共享内存同步更改 notelist 数据
};
// 新建文章
const addArticle = (type: string) => {
    let params: any = {
        _id: null,
        userId,
        title: Utils.moment().currentDate(),
        content: '',
        type: categoryList[cateIndex.value].value,
        typeName: categoryList[cateIndex.value].label,
        username,
        status: '未发布',
        tag: [],
    }
    switch (type) {
        case 'top':
            params['index'] = Number(noteList[0]?.index || 1) - 1, 
            noteList.unshift(params)
            noteIndex.value = 0;
            noteDetail.value = params;
            break;
        case 'bottom':
            params['index'] = Number(noteList[noteList.length-1]?.index || 0) + 1, 
            noteList.push(params)
            noteIndex.value = noteList.length - 1;
            noteDetail.value = params;
            break;
    }
    addArticleRequest(params);
}
// 新增文章请求
const addArticleRequest = (params: any) => { 
    ArticleApi.AddNewArticleAjax({
        ...params
    })
    .then(res => {
        let data = res.data;
        // noteDetail.value = data;
        getNoteList({
            type: categoryList![cateIndex.value].value, // 默认查询第一个分类的笔记
            sortByIndex: true,
        }, noteIndex.value);
    })
}
// 文章操作菜单
const noteItemOperation = (type: string, element: any) => {
    switch (type) {
        case '直接发布':
            ArticleApi.AddArticleAjax({
                _id: element._id,
                status: '已发布'
            })
            .then(res => {
                element.status = '已发布';
                ElMessage.success('发布成功');
            })
            break;
        case '取消发布':
            ArticleApi.AddArticleAjax({
                _id: element._id,
                status: '未发布'
            })
            .then(res => {
                element.status = '未发布';
                ElMessage.success('取消发布成功');
            })
            break;
        case '删除文章':
            ElMessageBox.confirm(
                `是否确认删除文章《${noteDetail.value.title}》?`,
                '温馨提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
            .then(() => {
                ArticleApi.deleteArticleAjax({
                    _id: element._id,
                })
                .then(res => {
                    ElMessage.success('文章删除成功');
                    getNoteList({
                        type: categoryList[cateIndex.value].value, // 默认查询第一个分类的笔记
                        sortByIndex: true,
                        loading: '.note',
                    });
                })
            })
            break;
        default:
            break;
    }
}
// 保存文章
const handleSave = (type: string, params: any) => {
    switch (type) {
        case 'DeleteTag':
            noteDetail.value.tag = noteDetail.value.tag.filter((v: string) => v !== params.label);
            break;
        case 'AddTag': 
            if(!noteDetail.value.title) return ElMessage.warning('请先保存文章后再选择标签~')
            noteDetail.value.tag.push(params.label);
        default:
            break;
    }
    return ArticleApi.AddNewArticleAjax({
        _id: noteDetail.value._id,
        title: noteDetail.value.title,
        username: noteDetail.value.username,
        type: noteDetail.value.type,
        typeName: noteDetail.value.typeName,
        index: noteDetail.value.index,
        content: params.content || noteDetail.value.content,
        status: noteDetail.value.status || '未发布',
        tag: noteDetail.value.tag
    })
    .then(res => {
        type == 'SaveContent' ? noteDetail.value.content = params.content : null;
        return true;
    })
    .catch(res => {
        return false;
    })
}
</script>

<style lang="less" scoped>
.writter{
    // font-family:"Times New Roman",Times,serif;
    font-family: "楷体", "楷体_GB2312", serif;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .category{
        width: 17%;
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
            background: #404040;
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
                justify-content: space-between;
                svg{
                    margin-right: 15px;
                }
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
            height: 0px;
            opacity: 0;
            overflow: hidden;
            transition: all 0.3s ease-out;
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
        .new-cate-name-active{
            height: 80px;
            opacity: 1;
            margin-top: 15px;
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
                .book-sent{
                    background: url('@/assets/imgs/sprite.png') no-repeat -50px -25px;
                    background-size: 250px;
                }
                .desc{

                }
            }
            .active{
                background: #E6E6E6;
                border-left: 5px solid #ec7259;
                justify-content: space-between;
                svg{
                    margin-right: 15px;
                }
            }
            li:hover{
                background: #E6E6E6;
            }
        }
    }
    .editor{
        width: 58%;
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
        .tags{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            flex-direction: row;
            flex-wrap: wrap;
            .el-tag{
                margin-left: 10px;
            }
        }
        .slc{
            margin-left: 20px;
            width: 85px;
        }
    }
    :deep(.category::-webkit-scrollbar){
        display: none;
    }
    :deep(.note::-webkit-scrollbar){
        width: 10px;
        background: #F1F1F1;
    }
    :deep(.note::-webkit-scrollbar-thumb){
        background: #C1C1C1;
    }
}
.writter-popover{
    .writter-popover-ul{
        list-style: none;
        border-radius: 4px;
        overflow: hidden;
        li{
            text-align: center;
            border-bottom: 1px solid #d9d9d9;
            padding: 10px 0;
            svg{
                margin-right: 5px;
                position: relative;
                top: 3px;
            }
            span{
                i{
                    font-size: 1rem;
                }
            }
        }
        li:last-child{
            border: none;
        }
        li:hover{
            background: #666;
            color: #fff;
        }
    }
}
</style>