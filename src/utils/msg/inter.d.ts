/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:57:05
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 16:03:04
 * @Description: msg提示信息的接口类声明
 */

// showActionModal的参数类型
export interface ShowActionModel {
  /** 提示标题 */
  title?: string,
  /** 提示内容 */
  msg: string,
  /** 确定文本内容 */
  confirmText?: string,
  /** 确定文本的颜色 */
  confirmColor?: string,
  /** 模态框成功回调 */
  success?: () => void,
  /** 是否展示取消按钮 */
  showCancel?: boolean
}