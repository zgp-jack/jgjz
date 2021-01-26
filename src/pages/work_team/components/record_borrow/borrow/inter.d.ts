/*
 * @Author: jsxin
 * @Date: 2021-01-20 15:29:50
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 15:58:15
 * @Description: interface for borrow
 */

// 借支默认提交数据
export default interface BorrowPostData {
  /** 借支类型 */
  business_type: 4 | 5,
  /** 分类 */
  expend_type: number,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader?: string,
  /** 备注 */
  note: string,
  /** 借支金额 */
  money: string
  /** 个人/班组 */
  identity: number
  /** 记工本ID */
  work_note?: number
  /** 工人ID */
  worker_id?: string
  /** 上传图片url */
  img_url?: string
}

export interface BorrowProps {
  workerId: string
  type: string
  businessTime: string
}
