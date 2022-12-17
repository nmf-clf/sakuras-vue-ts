<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-16 17:11:01
-->
<template>
    <slot></slot>
    <!-- 分页 -->
    <el-pagination 
        class="my-pagination" 
        background 
        layout="prev, pager, next" 
        :total="1000" 
    />
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';


const props = defineProps({ //子组件接收父组件传递过来的值
    tableData: Array
});

const { tableData, form, onSearch, onReset }: any = props;
console.log('xasa22', tableData);


const handleEdit = (index: number, row: any) => {

};

const handleDelete = (index: number) => {

};
</script>

<style lang="less" scoped>
.el-pagination{
    margin-top: 30px;
    justify-content: flex-end;
}
</style>