<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-01 18:28:21
-->
<template>
   <div class="category">
        <el-button>测试的</el-button>
   </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from "vuex";

</script>

<style lang='less' scoped>
.category{
    margin-top: 4rem;
    margin-left: 27%;
}
</style>
