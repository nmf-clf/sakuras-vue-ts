<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-16 16:52:37
-->
<template>
     <SelectGroup
            :gutter="20"
            :form="formData"
            :data="[
                { title: '文章标题2', key: 'title', type: 'input' },
                { title: '文章状态2', key: 'status', type: 'select', options: ArticleStatusArr },
                { title: '文章类型2', key: 'type', type: 'mul-select', options: ArticleTypeArr },
                { title: '发布日期2', key: 'createDate', type: 'date' },
                { title: '更新日期2', key: 'updateDate', type: 'mul-date' },
            ]"
            :onReset="handleReset"
            :onSearch="handleSearch"
        />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import SelectGroup from '@/components/SelectGroup/index.vue';
import { Utils } from "@/utils";

let formData = reactive({
    'title': '',
    'status': '',
    'type': '',
    'createDate': '',
    'updateDate': '',
});

const ArticleTypeArr = [
    { value: '1', label: '前端' },
    { value: '2', label: '后端' },
    { value: '3', label: '逻辑推理' },
];

const ArticleStatusArr = [
    { value: '', label: '全部' },
    { value: '1', label: '已完成' },
    { value: '2', label: '未完成' },
];

const handleSearch = (e: any) => {
    console.log('查询，，', formData)
};

const handleReset = () => Utils.clearFormData(formData);
</script>

<style lang="less" scoped>

</style>