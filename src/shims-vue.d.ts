/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-09 18:11:23
 */
/* eslint-disable */
/* 由于TS不理解.vue文件类型，因此这个文件告诉TS .vue文件是何类型 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
//坑点：再ts下必须通过此方式 声明一个命名空间给全局变量，才可以使webpack.DefinePlugin生效
declare namespace ProcessEnv { 
  const env: string;
}
