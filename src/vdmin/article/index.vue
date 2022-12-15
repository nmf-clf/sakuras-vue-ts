<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-15 17:31:26
-->
<template>
    <div class="container">
        <!-- <SelectGroup
            :gutter="20"
            :form="{}"
            :data="[
                { title: '文章标题1：', key: 'title', type: 'input', span: 6 },
                { title: '文章类型：', key: 'type', type: 'multiple' },
                { title: '发布日期：', key: 'createDate', type: 'date' },
                { title: '更新日期：', key: 'updateDate', type: 'mul-date' },
                { title: '文章状态：', key: 'status', type: 'radio' },
            ]"
            :onChange="1"
        /> -->
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="文章标题：">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="文章类型：">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="发布日期：">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="更新日期：">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="文章状态：">
                    <el-input v-model="form.name" />
                </el-form-item>
            </el-col>
        </el-row>
        <!-- 
            data: 数据源
            stripe: 是否为斑马纹
            border: 是否带有纵向边框
         -->
        <el-table 
            :data="tableData"
            stripe
            border
        >
            <el-table-column prop="idNo" label="序号" width="100" align="center" />
            <el-table-column prop="title" label="标题"  align="center" />
            <el-table-column prop="type" label="类型"  align="center" />
            <el-table-column prop="content" label="内容"   align="center" />
            <el-table-column prop="createDate" label="发布日期"  align="center" />
            <el-table-column prop="updateDate" label="更新日期"  align="center" />
            <el-table-column prop="status" label="状态"  align="center" />
            <el-table-column class="operation" prop="opreation" label="操作"  width="200" align="center" >
                <template class="operation1" cell-class-name="operation12" #default="scope">
                    <el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" >
                        编辑
                    </el-button>
                    <el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index)" >
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import SelectGroup from '@/components/SelectGroup/index.vue';

const form = reactive({
    name: '1'
})
/*  */
const item = {
    idNo: 1,
    title: '如何赚钱',
    type: '文学著作',
    content: '讲述了一名哈哈哈如何',
    createDate: '2016-05-02',
    updateDate: '2017-05-02',
    status: '已发布',
    opreation: `<div>123</div>`
}

const tableData = ref(Array.from({ length: 8 }).fill(item));

const handleEdit = (index: number, row: any) =>{

}
const handleDelete = (index: number) =>{

}
</script>

<style lang="less" scoped>
.container{
    background: #fff;
    border-radius: 5px;
    padding: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.red{
    color: red;
}
</style>