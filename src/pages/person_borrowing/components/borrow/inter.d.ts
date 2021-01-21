/*
 * @Author: jsxin
 * @Date: 2021-01-20 15:29:50
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 15:38:59
 * @Description: interface for borrow
 */

// 借支默认提交数据
export default interface BorrowPostData {
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