/*
 * @Author: jsxin
 * @Date: 2021-01-19 16:13:11
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 16:15:40
 * @Description: interface for empty_date/*
 */

// 组件参数
export default interface EmptyDateProps {
  /** 自定义图片 */
  img?: string,
  /** 不需要图片 */
  hideImg?: boolean
  /** 自定义提示文本 */
  text?: string,
  /** 不需要文本 */
  hideText?: boolean
}