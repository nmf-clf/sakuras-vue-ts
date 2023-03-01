<!--
 * @Author: niumengfei
 * @Date: 2023-03-01 17:05:06
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-01 17:17:58
-->
<template>
    <div class="side-menu">
        1111111111
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { MyHeader } from '@/components'
import { ElContainer } from 'element-plus';

const store = useStore();
const Route = useRoute();
const deviceType = () => store.getters.deviceType;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>

</style>

<!-- 初始主页 遗留代码 -->
<!-- script: part -->
<!-- let txtList = [
  '读很多的书，走很远的路，见很多的人。',
  '滴水穿石，非一日之功',
  '为天地立心，为生民立命，为往圣继绝学，为万世开太平。',
  '悟已往之不谏，知来者之可追。',
  '醉后不知天在水，满船清梦压星河。',
];
let changeText = () => mainTxt.value = txtList[Math.floor( (Math.random() * txtList.length) )];
let mainTxt = ref(txtList[Math.floor( (Math.random() * txtList.length) )]); -->
<!-- html: part -->
<!-- <el-main v-if="false" class="main animate__animated animate__bounce">
    <h2>Hello，sakuras!</h2>
    <h2>Goodbye Friends!</h2>
    <h1 @click="changeText">{{mainTxt}}</h1>
</el-main>
<el-footer v-if="false" class="footer">
    <a href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a>
</el-footer> -->