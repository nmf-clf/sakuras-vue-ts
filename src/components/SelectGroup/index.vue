<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-15 17:30:49
-->
<template>
    <!-- 
        gutter：列间距，行提供 gutter 属性来指定列之间的间距，其默认值为0
     -->
    <el-row 
        :gutter="20"
    >
        <template v-for="item in data">
            <!-- type: 
                    input: 输入框
                    radio: 单选
                    multiple: 多选
                    date: 单选日期
                    mul-date: 多选日期
            -->
            <template v-if="item.type == 'input'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
            </template>

            <template v-if="item.type == 'radio2'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
            </template>

            <template v-if="item.type == 'multiple'">
                <el-col :span="item.span || 6">
                    <!-- <el-select
                        v-model="value1"
                        multiple
                        placeholder="Select"
                        style="width: 240px"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select> -->
                </el-col>
            </template>

            <template v-if="item.type == 'input'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
            </template>

            <template v-if="item.type == 'input'">
                <el-col :span="item.span || 6">
                    <el-form-item :label="item.title">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
            </template>
        </template>
    </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';
import { toRefs, PropType } from 'vue';
import { useStore } from "vuex";
import router from '@/router';

const form = reactive({
    name: '1'
})

const props = defineProps({ //子组件接收父组件传递过来的值
    data: Array,
});

const { data }: any = props;
</script>

<style lang="less" scoped>

</style>