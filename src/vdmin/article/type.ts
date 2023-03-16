/*
 * @Author: niumengfei
 * @Date: 2022-12-20 16:59:36
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-16 17:23:35
 */
export interface DataItemType {
    title: string,
    type: number,
    typeName: string,
    content: string,
    createDate: string,
    updateDate: string,
    status: string,
    opreation: string,
    loaded?: boolean,
    url?: string,
    hot: number,
}

export default {
    ArticleTypeArr: [ //文章类型
        { value: '1', label: '前端' },
        { value: '2', label: '后端' },
        { value: '3', label: '逻辑推理' },
    ],
    ArticleStatusArr: [ //文章发布状态
        { value: '', label: '全部' },
        { value: '1', label: '已发布' },
        { value: '2', label: '未发布' },
    ],
}