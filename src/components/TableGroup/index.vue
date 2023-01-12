<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-01-12 14:42:49
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
        :total="props.total"
        @current-change="props.currentChange"
        @size-change="props.sizeChange"
        @prev-click="props.prevClick"
        @next-click="props.nextClick"
    />
</template>

<script lang="ts" setup>

const props = defineProps({ //子组件接收父组件传递过来的值
    total:{ type: Number, required: true } ,
    prevClick: Function,
    nextClick: Function,
    currentChange: Function,
    sizeChange: Function,
});

// const { form, onReset, total }: any = toRefs(props); // 使用refs可以追踪变化，例如 total

</script>

<style lang="less">
.my-pagination{
    margin-top: 30px;
    justify-content: flex-end;
}

.cell-nowrap{
    .cell{
        white-space: nowrap;
    }
}
</style>