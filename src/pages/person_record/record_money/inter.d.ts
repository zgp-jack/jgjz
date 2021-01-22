/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 15:05:10
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-20 15:08:06
 * @Description: interface for record_money
 */

// 记工钱组件
export default interface RecordMoneyPostData {
  /** 记工类型 */
  business_type: 1 | 2 | 3,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader: string,
  /** 备注 */
  note: string,
  /** 记工金额 */
  money: string
  /** 个人/班组 */
  identity: 1 | 2
  /** 记工本ID */
  work_note?: string
  /** 工人ID */
  worker_id?: string
  /** 上传图片url */
  img_url?: string
}