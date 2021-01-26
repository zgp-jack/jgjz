/*
 * @Author: jsxin
 * @Date: 2021-01-20 15:29:50
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 15:57:48
 * @Description: interface for expendiure
 */

// 支出默认提交数据
export default interface ExpenditurePostData {
  /** 支出类型 4借支 5支出 */
  business_type: number,
  /** 分类 */
  expend_type: number,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader: string,
  /** 备注 */
  note: string,
  /** 支出金额 */
  money: string
  /** 个人/班组 */
  identity: number
  /** 记工本ID */
  work_note?: number
  /** 工人ID */
  worker_id?: string
  /** 上传图片 */
  img_url?: string
}
