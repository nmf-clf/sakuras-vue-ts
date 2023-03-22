<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-17 10:58:12
-->
<template>
    <!-- 
        gutter?：列间距，行提供 gutter 属性来指定列之间的间距，默认值 0
        span?: 占用当前行的空间 一行24，默认值 6
        data：表单DOM数据源 
        form: 表单入参数据源
        onReset?: 情况表单数据
        onSearch?：查询
     -->
    <el-row 
        :gutter="gutter || 0"
    >   
        <template v-if="!data">data属性必须!</template>
        <template v-else v-for="item in data" :key="item.key">
            <!-- input：输入框 -->
            <template v-if="item.type == 'input'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-input v-model="form[item.key]" :placeholder="`请填写${item.title}`" />
                    </el-form-item>
                </el-col>
            </template>
            <!-- radio：单选框 -->
            <template v-if="item.type == 'select'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-select v-model="form[item.key]" :placeholder="`请选择${item.title}`">
                            <el-option
                                v-for="v in item.options"
                                :key="v.value"
                                :label="v.label"
                                :value="item.valTargetLabel ? v.label : v.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
            <!-- multiple：多选框 -->
            <template v-if="item.type == 'mul-select'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-select
                            v-model="form[item.key]"
                            multiple
                            :placeholder="`请选择${item.title}`"
                            style="width: 240px"
                        >
                            <el-option
                                v-for="v in item.options"
                                :key="v.value"
                                :label="v.label"
                                :value="item.valTargetLabel ? v.label : v.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </template>
            <!-- date：单选日期 -->
            <template v-if="item.type == 'date'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-date-picker
                            v-model="form[item.key]"
                            type="date"
                            placeholder="请选择日期"
                            :size="item.size || 'default'"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                        />
                    </el-form-item>
                </el-col>
            </template>
            <!-- mul-date：多选日期 -->
            <template v-if="item.type == 'mul-date'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-date-picker
                            v-model="form[item.key]"
                            type="daterange"
                            range-separator="To"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :size="item.size || 'default'"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                        />
                    </el-form-item>
                </el-col>
            </template>
        </template>
        <!-- 按钮 -->
        <el-col v-if="showBtns" :span="6">
            <el-button v-if="onSearch" type="primary" @click="handleSearch">查询</el-button>
            <el-button v-if="onReset" type="primary" @click="handleReset">重置</el-button>
            <el-button v-if="onPublish" type="primary" @click="handlePublist">发布</el-button>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
interface PropType {
    gutter?: number,
    form: object, 
    data: DataType[],
    onSearch?: () => void, 
    onReset?: () => void,
    onPublish?: () => void,
}
interface OptionsType {
    label: string,
    value: string,
}
interface DataType {
    title?: string,
    key: string,
    type: string,
    options: OptionsType[],
    span?: number,
    size?: string,
    valTargetLabel?: boolean,
}

const props = defineProps({
    gutter: Number,
    form: { type: Object, required: true },
    data: { type: Array, required: true },
    onSearch: Function,
    onReset: Function,
    onPublish: Function,
    
});

const { gutter, form, onSearch, onReset, data, onPublish } = <PropType>props;

const showBtns = onSearch || onReset || onPublish;
const handleSearch = () => onSearch && onSearch();
const handleReset = () => onReset && onReset();
const handlePublist = () => onPublish && onPublish();
</script>

<style lang="less" scoped>
.el-select{
    width: 100%;
}
</style>