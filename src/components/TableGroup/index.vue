<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-19 17:07:21
-->
<template>
    <slot></slot>
    <!-- 分页
            size-change：page-size 改变时触发	
            current-change：current-page 改变时触发	
            prev-click：用户点击上一页按钮改变当前页时触发	
            next-click：用户点击下一页按钮改变当前页时触发	
    -->
    <el-pagination 
        class="my-pagination" 
        background 
        layout="prev, pager, next" 
        :total="total"
        @current-change="currentChange"
        @size-change="sizeChange"
        @prev-click="prevClick"
        @next-click="nextClick"
    />
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';


const props = defineProps({ //子组件接收父组件传递过来的值
    tableData: Array,
    total: Number,
});

const { tableData, form, onSearch, onReset, total }: any = toRefs(props); // 使用refs可以追踪变化，例如 total
console.log('xasa22', tableData);

const sizeChange = (value: number) => {
    console.log('sizeChange...');
}
const currentChange = (value: number) => {
    console.log('currentChange....');
}
const prevClick = (value: number) => {
    console.log('prevClick...');
}
const nextClick = (value: number) => {
    console.log('nextClick...');
}
</script>

<style lang="less" scoped>
.el-pagination{
    margin-top: 30px;
    justify-content: flex-end;
}
</style>