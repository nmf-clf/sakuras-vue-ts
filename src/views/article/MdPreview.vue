<!--
 * @Author: niumengfei
 * @Date: 2023-01-31 14:31:26
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-31 17:19:39
-->
<template>
    <md-editor
        v-model="state.text"
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
import { reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

  const MdCatalog = MdEditor.MdCatalog;
  
  const state = reactive({
    text:  `
# 第一章 如何修改DOM
1233333333333
## 1.1
###  1.1.1
###  1.1.2

# 第一章 如何修改DOM
##  2.1  

## 666666666
[13123]()

# 第一章 如何修改DOM
## 3.1
###  3.1.1

# 第一章 如何修改DOM
##  111111

## 222222

## 33333333333
[13123]()

# 第一章 如何修改DOM
## 555555555
###  666666666

# 第一章 如何修改DOM
##  88888888

## 9999999999999
[13123]()`,
    id: 'my-editor'
  });
  
const scrollElement = document.documentElement;

let htmlSize = document.documentElement.style.fontSize;
let scrollElementOffsetTop: number = 0;
if(htmlSize){
    scrollElementOffsetTop = Number(document.documentElement.style.fontSize.replace('px', '')) * 4;
}

</script>

<style lang='less'>
.sk-md-preview{
    position: absolute;
    right: 80px;
    top: 20px;
    min-width: 200px;
    max-width: 200px;
    background: #fafafa;
    padding: 10px;
    border-radius: 10px;
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: #7e7777;
   
    .md-editor-catalog-active > span{
        color: #005bb7;
    }
    .md-editor-catalog-link span:hover{
        color: #005bb7;
    }
}
.sk-preview-fixed{
    position: fixed;
    top:  calc(4rem + 20px);
}
</style>