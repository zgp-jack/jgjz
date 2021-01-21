/*
 * @Author: jsxin
 * @Date: 2021-01-18 18:56:16
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 14:45:53
 * @Description: index文件夹下面的所有的接口存放文件
 */

// 获取记工 流水的接口参数
export interface UserGetBusinessListsParams {
  /** 记工类型 */
  work_note: string,
  /** 当前页数 */
  business_time: string
}

// 获取记工 流水的返回数据
export interface UserGetBusinessListsResult {
  id: string
}
