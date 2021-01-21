/*
 * @Author: jsxin
 * @Date: 2021-01-20 09:46:17
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 10:19:23
 * @Description: interface for feedback/*
 */

// 意见反馈提交内容
export default interface FeedbackData {
  /** 反馈内容  */ 
  note: string
  /** 反馈图片  */
  img: string
  /** 反馈星级  */
  type: number
}
// 意见反馈提交内容
export interface FeedbackParams {
  /** 反馈内容  */ 
  note: string
  /** 反馈图片  */
  img: string
  /** 反馈星级  */
  type: number
}