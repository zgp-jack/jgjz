/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 15:05:10
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-20 15:08:06
 * @Description: interface for record_amount
 */

// 记工量接口
export default interface RecordAmountPostData {
  /** 记工类型 */
  business_type: 1 | 2 | 3,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader: string,
  /** 备注 */
  note: string,
  /** 记工数量 */
  unit_num: string
  /** 个人/班组 */
  identity: 1 | 2
  /** 记工本ID */
  work_note?: number
  /** 上传图片url */
  img_url?: string
  /** 单位 */
  unit: UnitTpey | number
  /** 分项 */
  unit_work_type?: string
}
export interface UnitTpey {
  /** id */
  id: number
  /** name */
  value: string
}