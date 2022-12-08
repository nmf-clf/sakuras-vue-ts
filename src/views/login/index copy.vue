<!--
 * @Author: niumengfei
 * @Date: 2022-04-28 23:04:30
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-07 17:22:09
-->
<template>
    <!-- <div :class="'login-' + $store.getters.deviceType" class="login"> -->
    <div :class="'login-pc'" class="login">
        <el-form :model="form" class="login-form">
            <el-form-item label="账号" class="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" class="password">
                <el-input v-model="form.password" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleRegister" class="confirmBtn">注册</el-button>
                <el-button type="primary" @click="handleLogin" class="confirmBtn">登录</el-button>
                <el-button type="primary" @click="open4" class="confirmBtn">测试</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { RegisterAjax, LoginAjax } from "@/api/user";

const router = useRouter();
const store = useStore();

const form = reactive({
    username: '',
    password: '',
})

const handleRegister = () =>{
    RegisterAjax(form)
    .then(res =>{
        console.log(res);
        ElMessage({
            message: res.message,
            type: 'success',
        })
    })
}
const handleLogin = () => {
    LoginAjax(form)
    .then(res =>{
        console.log('login-post::',res);
        store.dispatch('saveUserInfo', { //暂时这样存 需要整体加密
            ...form
        })
        router.push({ path: '/' })
        ElMessage({
            message: res.message,
            type: 'success',
        })
    })
}
const open4 = () => {
  ElMessage.error('Oops, this is a error message.')
}
</script>

<style lang='less' scope>
.login{
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(../../assets/images/login3.jpg);
    background-size: 100% 100%;
    .login-form{
        border: 1px solid #d3d3d3;
        border-radius: 10px;
        box-shadow: 10px 6px 20px -13px;
        padding: 20px 15px;
        box-shadow: 0 0 20px #a29bfe;
        border-radius: 15px;
        background: #fff;
        opacity: 0.8;
        .username{
            margin-top: 30px;
        }
        .el-form-item__label{
            color: #000;
        }
        .el-form-item{
            padding: 20px 0px;
            .el-form-item__content{
                justify-content: center;
            }
        }
        .confirmBtn{
            background: #000;
        }
    }
}
.login-pc{
    justify-content: flex-end;
    padding-right: 15%;
}
</style>