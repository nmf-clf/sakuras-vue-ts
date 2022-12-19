<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-19 18:11:58
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
           :total="resData.total"
        >
            <el-table 
                :data="tableData"
                stripe
                border
                v-loading="isLoading"
            >
                <el-table-column prop="uuid" label="序号" width="100" align="center" />
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

interface DataItemType {
    title: string,
    type: string,
    content: string,
    createDate: string,
    updateDate: string,
    status: string,
    opreation: string,
}

const isLoading = ref(true);

const formData = reactive({
    title: '',
    status: '',
    type: '',
    createDate: '',
    updateDate: '',
});
const resData = reactive({
   total: 0,
});
let page = 1;

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

const tableData: DataItemType[] = reactive([]); 

const handleSearch = (e: any) => {
    console.log('查询，，', formData)
};

const handleReset = () => Utils.clearFormData(formData);

const handleEdit = (index: number, row: any) => {

};

const handleDelete = (index: number) => {

};
const handleChange = () =>{
    
}
/* 查询 */
const getArticleList = () => {
    isLoading.value = true;
    GetArticleListAjax({ 
        username: 'admin',
        page,
        pageSize: 10,
    })
    .then(res =>{
        let { list, total } = res.data;
        console.log('login-post::',list);
        resData.total = total;
        isLoading.value = false;
        tableData.push(...list);
        if(list.length < 10){
            
        }else{
            page = page + 1;
        }
        console.log('asdasd', tableData);
    })
}

setTimeout(() => {
    getArticleList();
}, 500); 
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