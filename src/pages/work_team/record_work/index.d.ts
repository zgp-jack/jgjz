/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:11:09
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 19:20:51
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

// 获取记工 流水的返回数据
export interface GetWorkFlowResult {
  date: string,
  list: []
}