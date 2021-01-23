/*
 * @Author: jsxin
 * @Date: 2021-01-20 15:29:50
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 15:44:38
 * @Description: interface for expendiure
 */

// 支出默认提交数据
export default interface ExpenditurePostData {
  /** 支出类型 */
  business_type: 4 | 5,
  /** 分类 */
  expend_type: string,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader: string,
  /** 备注 */
  note: string,
  /** 支出金额 */
  money: string
  /** 个人/班组 */
  identity: 1 | 2
  /** 记工本ID */
  work_note?: string
  /** 工人ID */
  worker_id?: string
  /** 上传图片 */
  img_url?: string
}