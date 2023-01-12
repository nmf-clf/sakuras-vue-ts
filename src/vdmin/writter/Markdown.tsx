/*
 * @Author: niumengfei
 * @Date: 2022-12-30 15:03:31
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-01-12 17:12:32
 */
import { defineComponent, reactive, ref, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import MdEditor from 'md-editor-v3';
import type { ExposeParam, HeadList } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { SelectGroup } from '@/components';
import { Utils } from '@/utils';
import Static from "@/vdmin/article/type";
import { AddArticleAjax } from "@/api/article";

const generateId = (_text: string, _level: number, index: number) => `heading-${index}`;

type MdType = {
    text: string,
    catalogList: HeadList[],
    id: string,
}

export default defineComponent({
    setup() {
        const Route = useRoute();
        const { row } = Route.params;
        const { content, title, type } = JSON.parse(Utils.atou(row));
        console.log('params-row=>', JSON.parse(Utils.atou(row)));
        

        let content2 = content.replace(/\n/g, '<br>');
        let content3 = content.replace(/\n/g, '')
        console.log('content::',content);
        console.log('content2::', content3);

        const formData = reactive({
            title,
            type: type.split(',')
        });

        const md = reactive<MdType>({
            text: content,
            catalogList: [],
            id: 'my-editor'
        });
        const formatCopiedText = (text: string) => {
            return `${text}  - from www.sakuras.group`;
        };
        const editorRef = ref<ExposeParam>();

        onMounted(() => {
            editorRef.value?.on('pageFullscreen', (status) => console.log(status));
            editorRef.value?.on('catalog', (status) => console.log('status::', status));
            editorRef.value?.focus();
        });
        
        const MdCatalog = MdEditor.MdCatalog;
        const scrollElement = document.documentElement;

        /* 查询 */
        // const reviseArticleItem = (value: number = 1) => {
        //     ReviseArticleItemAjax({ 
        //         username: 'admin',
        //         _id: '',
        //     })
        //     .then(res =>{
               
        //     })
        // }

        return () => (<>
            <SelectGroup
                gutter={20}
                form={formData}
                data={[
                    { title: '文章标题', key: 'title', type: 'input' },
                    { title: '文章类型', key: 'type', type: 'mul-select', options: Static.ArticleTypeArr },
                ]}
                onPublish={()=>{
                    AddArticleAjax({
                        title: formData.title,
                        content: md.text,
                    })
                    .then(res => {
    
                    })
                }}
            />
            <MdEditor
                /* Props说明 */
                class='sakuras-markdown-editor' // 自定义类名
                style={{ // 编辑器内联样式
                    height: '85%'
                }}
                modelValue={md.text}
                theme='light' // 编辑器主题 'light' | 'dark'
                previewTheme='cyanosis' // 预览内容主题，支持自定义
                // historyLength={10} // 最大记录操作数（太大会占用内存）
                // pageFullscreen={false} // 页面内全屏
                // preview={true} // 是否默认显示预览，此优先级高于html预览
                // htmlPreview={true} // 是否显示html预览
                // previewOnly={true} // 仅预览模式，不显示 bar 和编辑框，不支持响应式，仅能初始设置一次
                // toolbars={[]} // 选择性展示工具栏，可选内容见下方。你可以随意排序工具栏，通过'-'分割两个工具，通过'='实现左右放置！
                toolbarsExclude={[ // 选择性不展示工具栏，内容同上
                    'github'
                ]}
                // noPrettier={false} // 是否启用 prettier 优化 md 内容
                // editorId='md-editor-v3' // 编辑器唯一标识，非必须项，服务端渲染时，防止产生服务端与客户端渲染内容不一致错误提示，以及单页面多编辑器时做区别 ?
                // tabWidth={2} // 编辑器一个 TAB 键等于空格数
                // showCodeRowNumber={true} // 代码块是否显示行号
                // tableShape={[8, 4]} // 标题栏添加表格时，预设待选表格大小，第一个代表最大列数，第二个代表最大行数
                // noMermaid={false} // 如果你不希望使用图表展示内容，可以设置关闭 ?
                placeholder='开始创作吧~' // 默认值
                // noKatex={false} // 如果你不希望使用数学公式展示内容，可以设置关闭
                // codeTheme='atom' // 代码块高亮样式名称 'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow'
                // markedHeadingId={generateId} // 构造标题ID的生成方式，在使用MdEditor.config定义了renderer.heading后，避免目录导航等失效 ?
                // footers={['markdownTotal', '=', 'scrollSwitch']} // 页脚显示内容，'='左右分割，设置为[]不显示页脚。
                // noIconfont={true} // 不插入 iconfont 链接，你可以下载到本地自行引入
                formatCopiedText={formatCopiedText} // 格式化复制代码
                // noUploadImg={true} // 工具栏不显示上传图片入口
                // codeStyleReverse={true} // 某些预览主题的代码模块背景是暗色系，将这个属性设置为 true，会自动在该主题下的 light 模式下使用暗色系的代码风格
                // codeStyleReverseList={['default', 'mk-cute']} // 需要自动调整的预览主题，已默认包含 default、mk-cute
                // autoFocus={true} //原生属性，文本区域自动获得焦点
                // disabled={false} // 原生属性，禁用文本区域
                // readOnly={true} // 原生属性，文本区域为只读
                // maxLength={1000} // 原生属性，文本区域允许的最大字符数
                // autoDetectCode={true} // 是否启用自动识别粘贴代码类别，目前仅支持从vscode复制的内容

                /* 插槽 */
                // toolbars={['bold', '-', 0, '=', 'github']}
                // defToolbars={ // 自定义工具栏插槽 ???
                //     <>
                //       <MdEditor.NormalToolbar
                //         trigger={
                //           <svg class="md-editor-icon" aria-hidden="true">
                //             <use xlinkHref="#icon-strike-through" />
                //           </svg>
                //         }
                //       ></MdEditor.NormalToolbar>
                //     </>}
                footers={['markdownTotal', 0, '=', 1, 'scrollSwitch']}
                defFooters={<>
                    <span>￥_￥</span>
                    <span>^_^</span>
                </>}

                /* 绑定事件 */
                onChange={value => { // 内容变化事件（当前与textarea的oninput事件绑定，每输入一个单字即会触发）
                    console.log('改变值::', value);
                    md.text = value;
                }} 
                onSave={(v: string, h: any) => {
                    console.log('保存::', v);
                    h.then((html: string) => {
                      console.log('保存2::', html);
                    });
                }}
                onHtmlChanged={html => { // html 变化回调事件，用于获取预览 html 代码
                    // console.log('html::', html);
                }}
                onGetCatalog={list => { // 动态获取markdown目录
                    console.log('获取目录::', list);
                    md.catalogList = list;  
                }}
                onError={err => {
                    alert(err.message);
                }}
            />
            {/* 目录 */}
            <MdCatalog
                editorId={md.id}
                scrollElement={scrollElement}
            />

        </>);
    }
});

MdEditor.config({
   /*  editorExtensions: {
        highlight: {
            css: {
                atom: {
                    light: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-light.min.css',
                    dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css'
                },
                xxx: {
                    light: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-light.css',
                    dark: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/xxx-dark.css'
                }
            }
        }
    } */
    markedRenderer(renderer) {
        /* renderer.heading = (text, level, _r, _s, index) => {
          const id = generateId(text, level, index);
          return `<h${level} id="${id}">${text}</h${level}>`;
        }; */

        /* renderer.heading = (text, level, raw, s, index) => { // 设置标题
            return `<h${level} id="heading-${index}">${text}</h${level}>`;
        }; */

        renderer.link = (href, title, text) => { // 设置链接在新窗口打开
            return `<a href="${href}" title="${title}" target="_blank">${text}</a>`;
        };
      
        return renderer;
    },
    editorExtensions: {
        
    }
});