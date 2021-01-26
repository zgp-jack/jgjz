/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 15:05:10
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-25 18:17:27
 * @Description: interface for record_amount
 */

// 记工量接口
export default interface RecordAmountPostData {
  /** 记工类型 */
  business_type: number,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader: string,
  /** 备注 */
  note: string,
  /** 记工数量 */
  unit_num: string
  /** 个人/班组 1班组 2个人 */
  identity: number
  /** 记工本ID */
  work_note?: number
  /** 上传图片url */
  img_url?: string
  /** 单位 */
  unit: number
  /** 分项 */
  unit_work_type?: string
  /**班组选择工人*/ 
  worker_id?: string
}
export interface UnitTpey {
  /** id */
  id: number
  /** name */
  value: string
}

export interface PropsData {
  workerId: string
  type: number
}