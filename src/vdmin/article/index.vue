<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-01-12 15:04:43
-->
<template>
    <div class="container">
        <SelectGroup
            :gutter="20"
            :form="formData"
            :data="[
                { title: '文章标题', key: 'title', type: 'input' },
                { title: '文章状态', key: 'status', type: 'select', options: Static.ArticleStatusArr },
                { title: '文章类型', key: 'type', type: 'mul-select', options: Static.ArticleTypeArr },
                { title: '发布日期', key: 'createDate', type: 'date' },
                { title: '更新日期', key: 'updateDate', type: 'mul-date' },
            ]"
            :onReset="handleReset"
            :onSearch="handleSearch"
        />
        <ButtonGroup 
            :data="btns"
        />
        <!-- 
            data: 数据源
            stripe: 是否为斑马纹
            border: 是否带有纵向边框
        -->
        <TableGroup 
           :total="resData.total"
           :currentChange="currentChange"
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
                <el-table-column prop="content" label="内容"   align="center" class-name="cell-nowrap" />
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
        <!-- 新增文章 -->
        <el-drawer v-model="showAddArticle">
            <template #header>
                <h4>新增文章</h4>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">取消</el-button>
                    <el-button type="primary" @click="confirmClick">保存</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
    
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus'
import { TableGroup, ButtonGroup, SelectGroup } from '@/components';
import { Utils } from "@/utils";
import { Edit, Delete, Warning } from '@element-plus/icons-vue';
import { GetArticleListAjax, GetArticleDetailAjax } from "@/api/article";
import Static, { DataItemType } from "./type";

const router = useRouter();
const showAddArticle = ref(false);

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
const tableData: DataItemType[] = reactive([]); 
const btns = [
    { text: '新增文章', type: '1', handleClick: () =>{
        // showAddArticle.value = true;
        router.push({
            path: `/admin/writter/markdown/${Utils.utoa(JSON.stringify({}))}`,
        })
        
    }},
    { text: '批量删除', type: '0', handleClick: () =>{
        
    }}
]

/* 表格查询 */
const handleSearch = (e: any) => {
    console.log('查询，，', formData)
};
/* 查询重置 */
const handleReset = () => Utils.clearFormData(formData);
/* 文章编辑 */
const handleEdit = (index: number, row: any) => {
    getArticleDetail(row);
};
/* 文章删除 */
const handleDelete = (index: number) => {

};
/* 分页查询 */
const currentChange = (value: number) => {
    console.log('当前页::', value);
    getArticleList(value);
}
/* 查询 */
const getArticleList = (value: number = 1) => {
    isLoading.value = true;
    GetArticleListAjax({ 
        username: 'admin',
        page: value,
        pageSize: 10,
    })
    .then(res =>{
        let { list, total } = res.data;
        resData.total = total;
        isLoading.value = false;
        tableData.splice(0, 10, ...list);
        console.log('数据::', tableData);
    })
}
getArticleList();
/* 编辑查询文章详情 */
const getArticleDetail = (row: any) => {
    isLoading.value = true;
    GetArticleDetailAjax({ 
        username: 'admin',
        _id: row._id,
    })
    .then(res =>{
        console.log('文章详情=>', res.data);
        
        isLoading.value = true;
        router.push({
            /* params传参 写法一 */
            path: `/admin/writter/markdown/${Utils.utoa(JSON.stringify(row))}`,
            /* params传参 写法二 */
            // 对象写法只能和 name 搭配使用，不能和 path 搭配
            // name: 'AdminMarkdown',
            // params: {
            //     row: '123'
            // }
        })
    })
    .catch(err =>{
        isLoading.value = false;
    })
}
const cancelClick = () => {
  showAddArticle.value = false
}
const confirmClick = () =>{
    ElMessageBox.confirm(
        `是否确认创建此篇文章？`,
        '温馨提示',
        {
            type: 'info',
            cancelButtonText: '取消',
            confirmButtonText: '确定'
        }
    )
    .then(() => {
      showAddArticle.value = false
    })
    .catch(() => {
      // catch error
    })
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