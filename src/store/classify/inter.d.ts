/*
 * @Author: jsxin
 * @Date: 2021-01-20 17:17:29
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 10:03:26
 * @Description: 分类接口
 */

// 计量单位每一项数据
export default interface ClassifyItem {
  /** id */ 
  id: string,
  /** 内容 */
  name: string
}


// 用户新增分类
export interface AddClassifyItem {
  /** 内容 */
  name: string
}