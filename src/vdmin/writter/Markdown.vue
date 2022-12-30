<!--
 * @Author: niumengfei
 * @Date: 2022-12-13 14:51:55
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-30 15:01:23
-->
<template>
    <md-editor 
        v-model="state.text" 
        :theme="state.theme"
    />
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const state = reactive({
  text: '',
  theme: 'light'
});

</script>

<style lang="less" scoped>

</style>