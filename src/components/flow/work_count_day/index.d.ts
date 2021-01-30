/*
 * @Author: jsxin
 * @Date: 2021-01-20 19:28:06
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-29 16:48:39
 * @Description: 
 */
import { FlowLists } from '@/pages/work_team/team_record/index.d'
//  组件参数
 export interface PropsData {
  /** 组件展示数据列表 */  
   list: FlowLists[]
  /**记工记账类型 1 工天 2 工量 3 工钱 4 借支 5 支出*/ 
   type: number,
 }