/*
 * @Author: jack_zgp
 * @Date: 2021-01-24 10:25:31
 * @LastEditors: jsxin
 * @LastEditTime: 2021-02-01 11:37:01
 * @Description: 个人流水工天-接口
 */

// 初始化工量详情 接口返回数据
export default interface BusinessInfoResult {
  /** 详情id */
  id: number
  /** 当前记工本 id */
  work_note: number
  /** 班组长id */
  group_leader: string
  /** 创建时间 */
  created_time_string: string
  /** 工量时间 */
  busienss_time_string: string
  /** 备注 */
  note: string
  /** 工量项目名称 */
  work_note_name: string
  /** 班组长name */
  group_leader_name: string
  /** 上班时间 */
  work_time: string
  /** 更多上班时间 */
  work_time_hour: string
  /** 加班时间 */
  overtime: string,
  /** 工友姓名 */ 
  worker_name: string
}

// 用户提交工量流水操作
export interface UserEditBusinessInfo {
  /** 需要被修改的工量id */
  id: string
  /** 修改后的班组长 */
  group_leader: string
  /** 修改后的备注 */
  note: string
  /** 上班时间 */
  work_time: string
  /** 更多上班时间 */
  work_time_hour: string
  /** 加班时间 */
  overtime: string
}
// 分项接口
export interface ClassifyItem {
  // id
  id: string
  // name
  name: string
}
export interface SelectedValue {
  // 选中id
  id: number
  // 选中值
  value: number
}
export interface WorkTimeType {
  /** 后台提交数据 */
  value: string,
  /** 前台展示文本 */
  text: string
}