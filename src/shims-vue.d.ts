/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-08 19:16:39
 */
/* eslint-disable */
/* 由于TS不理解.vue文件类型，因此这个文件告诉TS .vue文件是何类型 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace ProcessEnv {
  const env: string;
}
