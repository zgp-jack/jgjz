/*
 * @Author: jsxin
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 16:47:42
 * @Description: interface for picker
 */

// 分类组件接口
export default interface PickerTypeProps {
  /** 是否隐藏图片 */
  hideImg?: boolean,
  /** 图片 */
  img?: string,
  /** 标题 */
  title?: string,
  /** 内容 */
  value: string
}