<!--
 * @Author: niumengfei
 * @Date: 2022-04-12 15:56:02
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-07 10:57:02
-->
<template>
    <el-header class="myHeader" :class="['myHeader-' + deviceType(), (props.headerClass || isMouseEnter) ? 'hover-class' : '' ]" 
        :onmouseenter="mouseEnter"
        :onmouseleave="mouseLeave"
    >
        <div class="lf-box">
            <el-icon class='lf-select' :size="25" @click="openLeftSideBar"><Expand /></el-icon>
            <span class="lf-title">夜语清梦</span>
        </div>
        <div v-if="props.headerClass || isMouseEnter" class="animate__animated animate__fadeInRight">{{changeText()}}</div>
        <SelectOption />
    </el-header>
    <MySideBar :isOpen="isOpen">
        <SelectOption v-if="isOpen" :showSearch="false" />
    </MySideBar>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { useStore } from "vuex";
// import { Expand } from '@element-plus/icons-vue'
import MySideBar from '../SideBar/index.vue'
import SelectOption from './component/SelectOption.vue'

const props = defineProps({ //子组件接收父组件传递过来的值
    headerClass: Boolean,
});

const store = useStore();
/* 定义数据 */
const isOpen = ref(false);
const isMouseEnter = ref(false);
/* 定义方法 */
const openLeftSideBar = () =>{ isOpen.value = !isOpen.value }
const deviceType = () => store.getters.deviceType;

const txtList = [
  '读很多的书，走很远的路，见很多的人。',
  '滴水穿石，非一日之功',
  '为天地立心，为生民立命，为往圣继绝学，为万世开太平。',
  '悟已往之不谏，知来者之可追。',
  '醉后不知天在水，满船清梦压星河。',
];

const mainTxt = ref(txtList[Math.floor( (Math.random() * txtList.length) )]);

const changeText = () => mainTxt.value = txtList[Math.floor( (Math.random() * txtList.length) )];

const mouseEnter = () => { isMouseEnter.value = true }

const mouseLeave = () => { isMouseEnter.value = false }
</script>

<style lang="less" scope>
.myHeader{
    position: fixed;
    width: 100%;
    padding: 0.7rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    z-index: 999;
    opacity: 0.8;
    transition: all 0.8s ease;
    // font-family: cursive;
    .lf-box{
        display: flex;
        align-items: center;
        .lf-select{
            cursor: pointer;
        }
        .lf-title{
            font-size: 1.8rem;
            color: #2c3e50;
            align-items: center;
            margin-left: 10px;
            min-width: 100px;
            letter-spacing: 2px;
        }
    }
}
.myHeader:hover{
    background: #fff;
    box-shadow: 0 1px 40px -8px rgb(0 0 0 / 50%);
}
.hover-class{
    background: #fff;
    box-shadow: 0 1px 40px -8px rgb(0 0 0 / 50%);
}
.myHeader-pc{
  .lf-select{
    display: none;
  }
}
.myHeader-mobile{
  .hidden-dropdown{
    display: none;
  }
}
</style>