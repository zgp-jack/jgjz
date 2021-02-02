import { workersAdd } from '@/utils/api';
/*
 * @Author: jack_zgp
 * @Date: 2021-01-24 10:25:31
 * @LastEditors: jsxin
 * @LastEditTime: 2021-02-01 14:18:22
 * @Description: 个人流水工量-接口
 */

 // 初始化工量详情 接口返回数据
export default interface BusinessInfoResult {
  /** 详情id */
  id: number
  /** 当前记工本 id */
  work_note: number
  /** 班组长id */
  group_leader: string
  /** 工量值 */
  unit_num: string
  /** 创建时间 */
  created_time_string: string
  /** 工量时间 */
  busienss_time_string: string
  /** 备注 */
  note: string
  /** 工量项目名称 */
  work_note_name: string
  /** 分项 */
  unit_work_type: string
  /** 单位 */
  unit: string
  /** 班组长name */
  group_leader_name: string
  /** 分项name */
  unit_work_type_name: string,
  /** 工友姓名 */ 
  worker_name: string
  worker_id: string
}

// 用户提交工量流水操作
export interface UserEditBusinessInfo {
  /** 需要被修改的工量id */
  id: string
  /** 修改后的班组长 */
  group_leader: string
  /** 修改后的备注 */
  note: string
  /** 工量值 */
  unit_num: string
  /** 单位 */
  unit: string
  /** 分项 */
  unit_work_type: string
  worker_id: string
}
// 分项接口
export interface ClassifyItem{
  // 分项id
  id: string
  // 分项name
  name: string
}