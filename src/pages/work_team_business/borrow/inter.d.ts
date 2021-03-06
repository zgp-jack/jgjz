/*
 * @Author: jsxin
 * @Date: 2021-01-24 10:25:31
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 14:35:56
 * @Description: 个人流水借支 接口
 */

// 初始化借支详情 接口返回数据
export interface BusinessInfoResult {
  /** 当前详情id */
  id: number
  /** 当前记工本 id */
  work_note: number
  /** 班组长id */
  group_leader: string
  /** 借支金额 */
  money: string
  /** 借支备注 */
  note: string
  /** 创建时间 */
  created_time_string: string
  /** 借支时间 */
  busienss_time_string: string
  /** 借支项目名称 */
  work_note_name: string
  /** 借支分类名称 */
  expend_type_name: string
  /** 借支分类id */
  expend_type: string
  /** 班组长名字 */
  group_leader_name: string
  /*工友id*/
  worker_id: string
  /*工友名字*/
  worker_name: string
}

// 用户删除借支流水操作
export interface UserDelBusinessInfo {
  /** 需要被删除的流水id */
  id: string
}

// 用户修改借支流水操作
export interface UserEditBusinessInfo {
  /** 需要被修改的流水id */
  id: string
  /** 借支分类id */
  expend_type: string,
  /** 借支备注 */
  note: string,
  /** 借支金额 */
  money: string,
  /** 班组长id */
  group_leader: string
  /*工友id*/
  worker_id: string
}
