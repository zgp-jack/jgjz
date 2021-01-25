/*
 * @Author: jsxin
 * @Date: 2021-01-20 19:28:06
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-25 13:43:24
 * @Description: 
 */

import { FlowLists } from '@/pages/work_team/record_work/index.d'

//  组件参数
export interface PropsData {
  /** 组件展示数据列表 */
  list: FlowLists[]
  type: number
}