<!--
 * @Author: niumengfei
 * @Date: 2022-12-09 16:14:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 19:38:49
-->
<template>
    <el-form
        class="sign-in-form"
        ref="ruleFormRef"
        :model="ruleForm" 
        status-icon
        :rules="rules"
        label-width="120px"
    >
        <h2 class="form-title">登录</h2>
        <el-form-item class="form_item" prop="username" label-width="'auto'">
            <el-input class="form_input" v-model="ruleForm.username" type="username" autocomplete="off" placeholder="用户名">
                <template #prepend>
                    <el-button :icon="User"></el-button>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item class="form_item" prop="password" label-width="'auto'">
            <el-input class="form_input" v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码">
                <template #prepend>
                    <el-button :icon="Lock"></el-button>
                    </template>
                </el-input>
        </el-form-item>
        <el-form-item label-width="'auto'">
        <el-button class="form-btn"  @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
        <!-- 社交平台 -->
        <SoftWareForm  type="登录" />
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus';
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue';
import { LoginAjax } from "@/api/user";
import { Validator } from "@/utils";
import SoftWareForm from "./SoftWareForm.vue"; //坑点：如果使用vscode插件vetur这里会提示 "导入的模块没有默认导出" 但不报错，因此在vetur和volar中，我选择使用volar来避免此提示

interface LoginParamsType {
    username: string,
    password: string,
    email?: string,
}

const router = useRouter();
const store = useStore();
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive<LoginParamsType>({ //表单内容
    username: 'admin',
    password: '111',
    email: '',
})

const rules: FormRules = reactive({ //表单校验规则
    username: Validator.VerifyUserName(),
    password: Validator.VerifyPassWord(),
})

const submitForm = (formEl: FormInstance | undefined) => {
    if(!formEl) return;
    formEl.validate((valid) => {
        if(valid) {
            handleLogin();
        }else{
            return false;
        }
    })
}
/* 登录 */
const handleLogin = () => {
    LoginAjax(ruleForm)
    .then(res =>{
        console.log('login-post::',res);
        store.dispatch('user/saveUserInfo', { //暂时这样存 需要整体加密
            ...ruleForm
        });
        router.push({ path: '/' });
        ElMessage.success(res.message);
    })
}
</script>

<style lang="less" scoped>
.sign-in-up {
    position: absolute;
    top: 50%;
    left: 75%;
    transform: translate(-50%, -50%);
    transition: 1s 0.7s ease-in-out;
    width: 50%;
    display: grid;
    grid-template-columns: 1fr;
}
  
.sign-in-form,
.sign-up-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    transition: all 0.2s 0.7s;
}
  
.sign-up-form {
    z-index: 1;
    opacity: 0;
}
  
.sign-in-form {
    z-index: 2;
}
  
.form-title {
    font-size: 30px;
    color: #444;
    margin-bottom: 20px;
}
  
.form-input {
    width: 100%;
    max-width: 380px;
    height: 55px;
    line-height: 55px;
    border-radius: 55px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 6px;
    background-color: #f0f0f0;
    margin: 10px 0;
  
    i {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s;
    }
  
    input {
      outline: none;
      border: none;
      background: none;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      line-height: 1;
    }
  
    input::placeholder {
      color: #aaa;
      font-weight: 500;
    }
}
.form_item{
    width: 100%;
    max-width: 390px;
    .form_input{
        width: 100%;
        max-width: 380px;
        height: 55px;
        line-height: 55px;
        margin: 10px 0;
    }
    :deep(.el-form-item__content .el-form-item__error){
        left: 50px;
    }
    :deep(.el-input-group__prepend){
      background: #8a6eff;
    }
    :deep(.el-input-group__prepend .el-icon){
      color: #fff;
      transform: scale(1.5);
    }
}

  
.form-btn {
    width: 150px;
    height: 49px;
    margin: 20px 0;
    outline: none;
    border: none;
    border-radius: 49px;
    color: #fff;
    font-weight: 600;
    text-transform: uppercase;
    background-color: #8a6eff;
    cursor: pointer;
}
  
.form-btn:hover {
    background-color: #6c48ff;
}
  
@media screen and(max-width:870px) {
.container {
      min-height: 760px;
      height: 100vh;
    }
  
.container::before {
      left: 30%;
      bottom: 68%;
      top: initial;
      right: initial;
      transform: translateX(-50%);
      transition: 2s ease-in-out;
      width: 1500px;
      height: 1500px;
    }
  
.panels-container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;
    }
  
.panel {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      grid-column: 1 / span 1;
      padding: 35px 8%;
  
    .panel-content {
        padding-right: 15%;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.8s;
  
        h3 {
          font-size: 18px;
        }
  
        p {
          font-size: 12px;
          padding: 8px 0;
        }
  
    .panel-btn {
          width: 110px;
          height: 35px;
          font-size: 12px;
        }
      }
  
    .panel-img {
        width: 200px;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
      }
    }
  
.left-panel {
      grid-row: 1 / span 1;
    }
  
.right-panel {
      grid-row: 3 / span 1;
  
    .panel-content,
    .panel-img {
        transform: translateY(300px);
      }
    }
  
.container.sign-up-mode::before {
      right: initial;
      bottom: 32%;
      transform: translate(-50%, 100%);
    }
  
.container.sign-up-mode {
    .left-panel {
    .panel-content,
    .panel-img {
          transform: translateY(-300px);
        }
      }
  
    .right-panel {
    .panel-content,
    .panel-img {
          transform: translateY(0);
        }
      }
  
    .sign-in-up {
        top: 5%;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
  
    .sign-in-up {
        top: 95%;
        left: 50%;
        transform: translate(-50%, -100%);
        transition: 1s 0.8s ease-in-out;
        width: 100%;
    }
}
  
@media screen and(max-width:570px) {
.container {
      padding: 20px;
    }
  
.container::before {
      left: 50%;
      bottom: 72%;
    }
  
.panel {
    .panel-content {
        padding: 8px 14px;
      }
  
    .panel-img {
        display: none;
      }
    }
  
.container.sign-up-mode::before {
      left: 50%;
      bottom: 28%;
    }
  
.sign-in-form,
.sign-up-form {
      padding: 0 22px;
    }
}
</style>