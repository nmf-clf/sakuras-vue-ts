<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-17 18:11:14
-->
<template>
    <div class="container">
        <SelectGroup
            :gutter="20"
            :form="formData"
            :data="[
                { title: '文章标题', key: 'title', type: 'input' },
                { title: '文章状态', key: 'status', type: 'select', options: ArticleStatusArr },
                { title: '文章类型', key: 'type', type: 'mul-select', options: ArticleTypeArr },
                { title: '发布日期', key: 'createDate', type: 'date' },
                { title: '更新日期', key: 'updateDate', type: 'mul-date' },
            ]"
            :onReset="handleReset"
            :onSearch="handleSearch"
        />
        <!-- 
            data: 数据源
            stripe: 是否为斑马纹
            border: 是否带有纵向边框
         -->
        <TableGroup 
           
        >
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
        </TableGroup>
    </div>
    
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import SelectGroup from '@/components/SelectGroup/index.vue';
import { Utils } from "@/utils";
import { TableGroup } from '@/components';
import { Edit, Delete } from '@element-plus/icons-vue';
import { GetArticleListAjax } from "@/api/article";

let formData = reactive({
    'title': '',
    'status': '',
    'type': '',
    'createDate': '',
    'updateDate': '',
});

const item = {
    idNo: 1,
    title: '如何赚钱',
    type: '文学著作',
    content: '查看刑法第N条',
    createDate: '2016-05-02',
    updateDate: '2017-05-02',
    status: '已发布',
    opreation: `<div>123</div>`
};

const ArticleTypeArr = [ //文章类型
    { value: '1', label: '前端' },
    { value: '2', label: '后端' },
    { value: '3', label: '逻辑推理' },
];

const ArticleStatusArr = [ //文章发布状态
    { value: '', label: '全部' },
    { value: '1', label: '已发布' },
    { value: '2', label: '未发布' },
];

const tableData2 = Array.from({ length: 100 }).fill(item);
let arr = tableData2.map((v:any, i)=> { return { ...v, idNo: i+1 } })
console.log(arr);

const tableData = arr.slice(0,10)

const handleSearch = (e: any) => {
    console.log('查询，，', formData)
};

const handleReset = () => Utils.clearFormData(formData);

const handleEdit = (index: number, row: any) => {

};

const handleDelete = (index: number) => {

};
/* 登录 */
const getArticleList = () => {
    GetArticleListAjax({ username: 'admin' })
    .then(res =>{
        console.log('login-post::',res);
    })
}
getArticleList()
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