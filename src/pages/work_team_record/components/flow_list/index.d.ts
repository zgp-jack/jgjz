/*
 * @Author: jsxin
 * @Date: 2021-01-22 15:59:09
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 15:59:09
 * @Description: 
 */
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


// 定义接口参数
export interface GetWorkFlowParams {
  /**记工记账类型， 1 记工 2 记量 3 记工钱 4 借支 5 支出*/ 
  business_type: string,
  /**开始时间*/ 
  start_business_time: string,
  /**账本id*/ 
  work_note: string,
  /**结束时间*/
  end_business_time: string,
  /**页数*/ 
  page: number
}

// 获取记工 流水的返回数据
export interface GetWorkFlowResult {
  date: string,
  list: FlowLists[]
}