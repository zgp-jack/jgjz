/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:11:09
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 20:21:36
 * @Description: 当前页面定义变量类型与接口请求相关参数返回结果定义
 */

//  定义切换type
export interface TypeAction {
  /**切换type的id*/ 
  id: string,
  /**切换type的文本名称*/ 
  name: string
}

export interface GetWorkFlowParams {
  business_type: string,
  start_business_time: string,
  work_note: string,
  end_business_time: string,
  page: number
}

// 流水列表list数据
export interface FlowLists {
  app_version: string
  business_time: number
  business_type: number
  created_by: number
  created_time: number
  expend_type: string
  expense_account: number
  group_leader: null | string
  group_leader_name: string
  id: number
  identity: number
  img_url: null | string
  is_deleted: number
  is_note: number
  is_rest: number
  member_source: string
  money: null | string
  note: null | string
  overtime: number
  quick_business: number
  unit: string
  unit_num: null | number
  unit_price: null | number
  unit_work_type: string
  updated_time: null | string
  wage_money: string
  wage_overtime: number
  wage_overtime_money: string
  wage_overtime_type: number
  wage_worktime_define: number
  work_note: number
  work_time: number
  work_time_hour: number
  worker_id: number
  worker_name: string
}
// 获取记工 流水的返回数据
export interface GetWorkFlowResult {
  date: string,
  list: FlowLists[]
}