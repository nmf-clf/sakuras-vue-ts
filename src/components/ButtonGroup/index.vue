<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-20 16:41:57
-->
<template>
    <div class="btns">
        <template v-for="item in data">
            <el-button type="primary">{{item.text}}</el-button>
        </template>
    </div>
</template>

<script lang="ts" setup>

interface DataItemType {
    text: string,
    type: string | number,
    handleClick: () => void,
}

interface PropsType {
    data: DataItemType[],
}

const props = defineProps({
    data: { type: Array, required: true }
});

const { data } = <PropsType>props; 

</script>

<style lang="less" scoped>
.btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px;
}
</style>