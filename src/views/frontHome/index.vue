<!--
 * @Author: niumengfei
 * @Date: 2022-04-06 23:49:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-06 19:14:17
-->
<template>
  <!-- <el-container :class="'frontHome-' + $store.getters.deviceType" class="frontHome"> -->
  <el-container :class="'frontHome-' + deviceType()" class="frontHome">
    <MyHeader />
    <el-main class="main animate__animated animate__bounce">
      <h2>Hello，sakuras!</h2>
      <h2>Goodbye Friends!</h2>
      <h1 @click="changeText">{{mainTxt}}</h1>
      <!-- <a href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a> -->
    </el-main>
   
    <el-footer class="footer">
      <a href="https://beian.miit.gov.cn/">豫ICP备20014071号-1</a>
    </el-footer>
  </el-container>
  <!-- Copyright © 2018-2022  关于我们-->
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from "vuex";
import { MyHeader } from '../../components/index'
// import MyHeader from "@/components/Header/index.vue";

// export default {
//   name: 'FrontHome',
//   components: { MyHeader },
//   setup(props, context) {
    const store = useStore();
    /* 定义数据 */
    let txtList = [
      '读很多的书，走很远的路，见很多的人。',
      '滴水穿石，非一日之功',
      '为天地立心，为生民立命，为往圣继绝学，为万世开太平。',
      '悟已往之不谏，知来者之可追。',
      '醉后不知天在水，满船清梦压星河。',
    ]
    let mainTxt = ref(txtList[Math.floor( (Math.random() * txtList.length) )])
    // /* 定义方法 */
    let changeText = () => mainTxt.value = txtList[Math.floor( (Math.random() * txtList.length) )] 
    
    const deviceType = () =>{
      return store.getters.deviceType
    }
    // return {
    //   mainTxt,
    //   changeText,
    // }
  // },
  // computed: {
  //   deviceType(){
  //     return (this as any).$store.getters.deviceType
  //   },
  // }
 
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
.frontHome{
  .main{
    width: 60%;
    margin: 10% auto;
    background-color: #f0f0f0;
    padding: 5%;
    border-radius: 10px;
    text-align: center;
    a{
      color: #505050;
      position: absolute;
      text-align: center;
      left: 0;
      right: 0;
      bottom: 20px;
    }
    h1{
      cursor: pointer;
    }
  }
  .footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    a{
      color: #505050;
      text-decoration: none;
    }
  }
}

</style>
