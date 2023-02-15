<!--
 * @Author: niumengfei
 * @Date: 2023-01-31 14:31:26
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-15 17:06:27
-->
<template>
    <md-editor
        class="sk-md-writter"
        v-model="state.content"
        :editor-id="state.id"
        theme="light"
        preview-theme="cyanosis"
        :preview="false"
        :toolbars="state.toolbars"
        :on-change="onChange"
        :on-save="onSave"
    >
        <template #defToolbars>
            <normal-toolbar title="mark" @on-click="handler">
                <template #trigger>
                    <!-- <el-icon><DocumentRemove /></el-icon> -->
                    <svg t="1676444339671" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2081" width="16" height="16"><path d="M939 234.9L726 21.2C712.5 7.6 694.2 0 675 0H264c-39.6 0-72 32.4-72 72v376c0 19.9 16.1 36 36 36s36-16.1 36-36V72.1l0.1-0.1H604v248c0 19.9 16.1 36 36 36h248v595.9l-0.1 0.1H644c-19.9 0-36 16.1-36 36s16.1 36 36 36h244c39.6 0 72-32.4 72-72V285.7c0-19-7.6-37.3-21-50.8zM676 284V73l210.3 211H676zM504 512H136c-39.8 0-72 32.2-72 72v368c0 39.8 32.2 72 72 72h368c39.8 0 72-32.2 72-72V584c0-39.8-32.2-72-72-72z m-15.3 418.9c-19.3 4.8-38.8-6.9-43.7-26.2l-40.4-161.6-84.5 169c-6.5 13-20.2 20.8-34.8 19.8-14.5-1-27-10.7-31.6-24.5L224 817.8l-29.8 89.5c-5 15.1-19.1 24.6-34.1 24.6-3.8 0-7.6-0.6-11.4-1.9-18.9-6.3-29.1-26.7-22.8-45.5l64-192c4.9-14.7 18.7-24.6 34.2-24.6s29.3 9.9 34.2 24.6L294.8 802l89.1-178.3c6.7-13.5 21.1-21.3 36.1-19.7 15 1.6 27.3 12.4 31 27.1l64 256c4.7 19.5-7 39-26.3 43.8z" fill="#707070" p-id="2082"></path></svg>
                </template>
            </normal-toolbar>
        </template>
    </md-editor>
    
    <!-- 弹框 -->
    <el-dialog class="md-writter-dialog" v-model="centerDialogVisible" title="Markdown语法参考" width="320px" align-center>
                <p># 一级标题 </p>
                <p>## 二级标题</p>
                <p>##### 五级标题</p>
                <p>- 列表第一项</p>
                <p>- 列表第二项</p>
                <p>1. 有序列表第一项</p>
                <p>2. 有序列表第二项</p>
                <p>[标题](链接地址)</p>
                <p>![图片描述](图片链接地址)</p>
                <p>*斜体*</p>
                <p>**粗体**</p>
                <p>> 引用段落</p>
                <p>```</p>
                <p>代码块</p>
                <p>```</p>
            <template #footer>
                <span @click="centerDialogVisible = false">我知道啦</span>
            </template>
    </el-dialog>
    <span class="md-writter-save">{{ saveVal }}</span>
  </template>
  
<script lang="ts" setup>
import { reactive, toRefs, onBeforeUpdate, watch, ref } from 'vue';
import MdEditor from 'md-editor-v3';
import type { ToolbarNames } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { DocumentRemove } from '@element-plus/icons-vue';
import { ArticleApi } from '@/api';
import { ElMessage } from 'element-plus';

const NormalToolbar = MdEditor.NormalToolbar;

const props = defineProps({ // 子组件接收父组件传递过来的值
    noteDetail: Object,
    content: { type: String, required: true },
});

let { content, noteDetail } = toRefs(props);

const centerDialogVisible = ref(false); // 弹框
const saveVal = ref('已保存'); // 是否保存
const state = reactive({
    id: 'my-editor',
    toolbars: <ToolbarNames[]>[
    '-',
    'image',
    'table',
    'mermaid',
    '-',
    'revoke',
    'next',
    0,
    '=',
    'save',
    '-',
    'preview',
    '-',
    'pageFullscreen',
    '-',
    'fullscreen',
    ],
    content: ''
});
/* 坑点：
    由于 props.content 默认值为空，因此 srcipt 代码块 初始化仅执行一次，
    因而 state.content 即便是在 onMount 里去 赋值，也只是在页面挂载后去赋值，在加 setTimeout 的情况下，很大概率仍然是空值
    然而由于 props.content 会通过接口更新，此异步操作会导致 state.content 仍然是上次的空值
    因此可以使用 watch 监视 props的值
*/

watch(content, (newValue, oldValue) => {
    state.content = newValue;
},{ immediate:true })

const onChange = (value: string) => {
    state.content = value;
}
const onSave = (value: string) => {
    saveVal.value = '保存中...';
    console.log('save', value);
    ArticleApi.AddNewArticleAjax({
        _id: props.noteDetail?._id,
        title: props.noteDetail?.title,
        username: props.noteDetail?.username,
        content: value,
        status: '已发布',
        // loading: '.editor',
    })
    .then(res => {
        saveVal.value = '已保存';
    })
    .catch(res => {
        saveVal.value = '保存失败';
    })
}
// onBeforeUpdate(()=>{
//     state.content = state.content ? state.content : props.content;
//     return true;
// })

const handler = () => {
  centerDialogVisible.value = true;
};

</script>

<style lang='less'>
.sk-md-writter{
    flex: 1;
}
.md-writter-dialog{
    .el-dialog__body{
        padding: 10px 10px 10px 30px;
        color: #000;
        p{
            padding: 3px 0;
        }
    }
    .el-dialog__footer{
        padding: 20px 0;
        font-size: 0.9rem;
        text-align: center;
        border-top: 1px solid #d9d9d9;
        color: #ec7259;
        cursor: pointer;
        display: flex;
        span{
            flex: 1;
        }
    }
}
.md-writter-save{
    position: fixed;
    right: 7px;
    top: 7px;
    color: #747373;
    font-size: 0.8rem;
}

</style>