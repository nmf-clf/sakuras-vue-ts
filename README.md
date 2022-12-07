# sakuras-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### dependencies说明
+ core-js：脚手架自带，是我们能够使用新的API的最重要包
+ less-loader：把less文件编译成css文件
+ vue：@3版本，vue核心功能库
+ vue-router：@4版本，vue路由核心库
+ github-markdown-css：md文件的样式
+ highlightjs-line-numbers.js：md语法高亮，行号显示
+ element-plus：vue3对应的组件库
+ @element-plus/icons-vue: vue3图标库，注意(坑)：CDN导入和自动引入方式官方正在开发中，所以需要手动下载此库，并全局注册图标组件，否则无法正常使用
+ axios：基于promise网络请求库，作用域nodejs和浏览器中

### devDependencies说明
+ html-loader：将 HTML 导出为字符串。当编译器需要时，HTML 会被最小化。
+ markdown-loader：将md文件编译为html
+ unplugin-auto-import: 官方按需引入配置
+ unplugin-vue-components：官方按需引入配置
+ babel-plugin-component：vue2官方按需加载配置
+ babel-plugin-import: 按需加载时候用的？
+ unplugin-element-plus: 按需导入样式
