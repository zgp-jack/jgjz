/*
 * @Author: jsxin
 * @Date: 2021-01-20 15:05:10
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 15:08:06
 * @Description: interface for tally
 */

// 借支配置项
export default interface TallyConfig {
  /** id */ 
  id: string,
  /** 标题 */
  title: string
}
export interface BorrowPostData {
  /** 借支类型 */
  expend_type: 4 | 5,
  /** 分类 */
  business_type: string,
  /** 日期 */
  date: string,
  /** 班组长id */
  group_id: string,
  /** 备注 */
  note: string,
  /** 借支金额 */
  money: string
}