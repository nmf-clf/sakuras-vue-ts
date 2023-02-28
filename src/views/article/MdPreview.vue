<!--
 * @Author: niumengfei
 * @Date: 2023-01-31 14:31:26
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-27 14:15:04
-->
<template>
    <md-editor
        v-model="props.content"
        :editor-id="state.id"
        theme="light"
        preview-theme="cyanosis"
        preview-only
    />
    <md-catalog
        class="sk-md-preview"
        :editor-id="state.id"
        :scroll-element="scrollElement"
        theme="light"
        :scroll-element-offset-top="scrollElementOffsetTop"
        :offset-top="scrollElementOffsetTop"
    />
  </template>
  
<script lang="ts" setup>
import { reactive, Prop, toRefs, onMounted } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const MdCatalog = MdEditor.MdCatalog;

const props = defineProps({ //子组件接收父组件传递过来的值
    content: { type: String, required: true },
});

const { content } = toRefs(props);

const state = reactive({
    // text: content,
    id: 'my-editor'
});

onMounted(() => {
    // state.text = content
});

const scrollElement = document.documentElement;

let htmlSize = document.documentElement.style.fontSize;
let scrollElementOffsetTop: number = 0;
if(htmlSize){
    scrollElementOffsetTop = Number(document.documentElement.style.fontSize.replace('px', '')) * 5.4;
}


</script>

<style lang='less' scoped>
.md-editor-previewOnly{
    font-family: "My Custom Font";
}
.sk-md-preview{
    position: absolute;
    right: 80px;
    top: 20px;
    min-width: 200px;
    max-width: 200px;
    // background: #fafafa;
    // padding: 10px;
    border-radius: 10px;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: #7e7777;
    height: 50vh;
    overflow-y: scroll;
    :deep(.md-editor-catalog-active > span){
        color: #005bb7;
    }
    :deep(.md-editor-catalog-link span:hover){
        color: #005bb7;
    }
}
.sk-preview-fixed{
    position: fixed;
    top:  calc(4rem + 20px);
}
::-webkit-scrollbar{
    width: 2px;
    background-color: rgb(234, 232, 232);
}
::-webkit-scrollbar-thumb{
    background: #a7cff7;
}
</style>