<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-16 17:46:50
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
                class="vdmin-table"
                :data="tableData"
                stripe
                border
            >
                <el-table-column type="index" width="50" align="center" />
                <el-table-column prop="title" label="标题"  align="center" />
                <el-table-column prop="type" label="类型"  align="center" />
                <el-table-column prop="content" label="内容"   align="center" class-name="cell-nowrap" />
                <el-table-column prop="createDate" label="发布日期"  align="center" />
                <el-table-column prop="updateDate" label="更新日期"  align="center" />
                <el-table-column prop="status" label="状态" width="150" align="center" />
                <el-table-column class="operation" prop="opreation" label="操作"  width="200" align="center" >
                    <template class="operation1" cell-class-name="operation12" #default="scope">
                        <el-button text :icon="Edit" @click="AjaxOperation('edit', scope.row)" >
                            编辑
                        </el-button>
                        <el-button text :icon="Delete" class="red" @click="handleDelete(scope.row._id)" >
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
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import type { Action } from 'element-plus';
import { TableGroup, ButtonGroup, SelectGroup } from '@/components';
import { Utils } from "@/utils";
import { Edit, Delete, Warning } from '@element-plus/icons-vue';
import { GetArticleListAjax, GetArticleDetailAjax, deleteArticleAjax } from "@/api/article";
import Static, { DataItemType } from "./type";

const router = useRouter();
const showAddArticle = ref(false);

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
        router.push({
            path: `/admin/writter/markdown/${Utils.utoa(JSON.stringify({
                username: 'niumengfei'
            }))}`,
        })
        
    }},
    { text: '批量删除', type: '0', handleClick: () =>{
        
    }}
]

onMounted(()=>{
    getArticleList();
})

/* 各类操作 */
const AjaxOperation = (type: string, data: any) => {
    switch (type) {
        case 'edit':
            getArticleDetail(data);
            break;
        case 'delete':
            deleteArticle(data);
            break;
        default:
            break;
    }
}
/* 表格查询 */
const handleSearch = (e: any) => {
    console.log('查询，，', formData)
};
/* 查询重置 */
const handleReset = () => Utils.clearFormData(formData);

/* 分页查询 */
const currentChange = (value: number) => {
    console.log('当前页::', value);
    getArticleList(value);
}
/* 查询 */
const getArticleList = (value: number = 1) => {
    GetArticleListAjax({ 
        username: 'niumengfei',
        page: value,
        pageSize: 10,
    })
    .then(res =>{
        let { list, total } = res.data;
        resData.total = total;
        tableData.splice(0, 10, ...list);
        console.log('数据::', tableData);
    })
}
/* 编辑查询文章详情 */
const getArticleDetail = (row: any) => {
    GetArticleDetailAjax({ 
        _id: row._id,
    })
    .then(res =>{
        console.log('文章详情=>', res.data);
        router.push({
            /* params传参 写法一 */
            path: `/admin/writter/markdown/${Utils.utoa(JSON.stringify({
                ...row,
                username: 'niumengfei'
            }))}`,
            /* params传参 写法二 */
            // 对象写法只能和 name 搭配使用，不能和 path 搭配
            // name: 'AdminMarkdown',
            // params: {
            //     row: '123'
            // }
        })
    })
}
/* 删除文章 */
const handleDelete = (_id: string) =>{
    ElMessageBox.alert('是否确认删除？', '温馨提示', {
        confirmButtonText: '确定',
        callback: (action: Action) => {
            action === 'confirm' && AjaxOperation('delete', _id);
        },
    })
}
const deleteArticle = (_id: string) => {
    deleteArticleAjax({ _id })
    .then(res => {
        ElMessage.success('删除成功！');
        getArticleList();
    })
}
const cancelClick = () => {
    showAddArticle.value = false;
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