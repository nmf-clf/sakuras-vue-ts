<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-08 17:20:05
-->
<template>
    <!-- 
        show-checkbox: 节点是否可被选择
        node-key: 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
        default-expand-all: 是否默认全部展开
     -->
    <div class="container">
        <el-input v-model="filterText" placeholder="查询关键词" />
        <el-button  @click="dialogVisible = true">新增一级节点</el-button>
        <el-tree
            class="tree-category"
            ref="treeRef"
            :data="dataSource"
            node-key="tree-category-id"
            :default-expand-all="true"
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            :render-content="renderContent"
        />
        <el-dialog
            v-model="dialogVisible"
            title="新增节点"
            width="30%"
            align-center
        >
            <span>请输入节点类型</span>
            <el-input v-model="nodeType" placeholder="请输入节点type (例: articleType)" />
            <span>请输入节点名称</span>
            <el-input v-model="nodeLabel" placeholder="请输入节点label (例: 文章类型)" />
            <span>请输入节点值</span>
            <el-input v-model="nodeValue" placeholder="请输入节点value (例: '1')" />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="addRootNode">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { ElButton, ElInput, ElMessage, ElMessageBox, ElTree } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { DictionaryApi } from '@/api';
import { Tree } from "@/api/model/dictionaryModel";

const treeRef = ref<InstanceType<typeof ElTree>>();
const filterText = ref('');
const nodeType = ref('');
const nodeLabel = ref('');
const nodeValue = ref('');
const dataSource = ref<Tree[]>([]);
const dialogVisible = ref(false);

onMounted(() => {
    getDictionaryList();
});

watch(filterText, (val) => { treeRef.value!.filter(val) })

const renderContent = ( h: any, { node, data, store }: { node: Node, data: Tree ,store: Node['store'] }) => {
    let num = node.childNodes.length ? `(${node.childNodes.length})` : '';
    return h(
        'span',
        {
            class: 'custom-tree-node',
        },
        h('span', null, node.label + num),
        h('span', null, h( 'a', { onClick: () => addChildrenNode(data), }, '新增'),
            h('a', { style: 'margin-left: 15px', onClick: () => removeNode(node, data), }, '删除'),
            h('a', { style: 'margin-left: 15px', onClick: () => renameNode(node) }, '重命名')
        )
    )
}

// 过滤
const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
// 获取数据列表 
const getDictionaryList = () => {
    DictionaryApi.GetDictionaryListAjax({})
    .then(res =>{
        dataSource.value = res.data;
    })
}
// 新增一级节点
const addRootNode = () => {
    DictionaryApi.AddDictionaryAjax({
        pid: null,
        type: nodeType.value,
        label: nodeLabel.value, 
        value: nodeValue.value,
    })
    .then(res =>{
        ElMessage({ type: 'success', message: `新增一级节点成功` });
        dialogVisible.value = false;
        getDictionaryList();
    })
}
// 新增子节点
const addChildrenNode = (data: Tree) => {
    ElMessageBox.prompt('', '新增子节点', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    })
    .then(({ value }) => {
        if(!value) return;
        DictionaryApi.AddDictionaryAjax({
            pid: data._id,
            label: value, // 类型
            value: value, // 值
        })
        .then(res =>{
            ElMessage({ type: 'success', message: `新增子节点成功` });
            getDictionaryList();
        })
    })
    .catch(err =>{ })
}
// 删除子节点
const removeNode = (node: Node, data: Tree) => {
    ElMessageBox.confirm(
        '确定删除此节点?',
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
    .then(() => {
        DictionaryApi.deleteDictionaryAjax({
            _id: node.data._id
        })
        .then(res =>{
            ElMessage({ type: 'success', message: '节点删除成功' })
            getDictionaryList();
        })
    })
    .catch(err =>{ })
}
// 修改子节点
const renameNode = (node: Node) => {
    ElMessageBox.prompt('请输入节点新名称', '编辑节点', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: node.data.label,
    })
    .then(({ value }) => {
        if(!value) return;
        DictionaryApi.AddDictionaryAjax({
            _id: node.data._id,
            label: value,
            value
        })
        .then(res =>{
            ElMessage({
                type: 'success',
                message: `新增子节点成功`,
            })
            getDictionaryList();
        })
    })
    .catch(err =>{ })
}
</script>

<style lang="less" scoped>
.container{
    flex: 1;
    background: #fff;
    padding: 10px;
    .el-input{
        max-width: 500px;
        height: 35px;
    }
    .el-button{
        height: 35px;
        margin-left: 10px;
    }
    .tree-category{
        max-width: 500px;
        margin-top: 30px;
        :deep(.custom-tree-node){
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }
    }
    .el-dialog__body{
        .el-input{
            margin: 10px 0px;
        }
    }
}
</style>