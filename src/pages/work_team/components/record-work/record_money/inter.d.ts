/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 15:05:10
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 14:22:20
 * @Description: interface for record_money
 */

// 记工钱组件
export default interface RecordMoneyPostData {
  /** 记工类型 */
  business_type: number,
  /** 日期 */
  business_time: string,
  /** 备注 */
  note?: string,
  /** 记工金额 */
  money: string
  /** 个人/班组 */
  identity: number
  /** 记工本ID */
  work_note: number
  /** 上传图片url */
  img_url?: string
  /** 工友id */ 
  worker_id: string
}

export interface PropsData {
  workerId: string
  type: number
  businessTime: string
}