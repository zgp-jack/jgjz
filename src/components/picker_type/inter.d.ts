/*
 * @Author: jsxin
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 17:42:02
 * @Description: interface for picker
 */
import ClassifyItem from '@/store/classify/inter.d'

// 分类组件接口
export default interface PickerTypeProps {
  /** 是否隐藏图片 */
  hideImg?: boolean,
  /** 图片 */
  img?: string,
  /** 标题 */
  title?: string,
  /** 内容 */
  value: string,
  /** 关闭事件 */
  close?: () => void,
  /** 获取值 */
  set?: (data: ClassifyItem) => void,
  /** 是否显示option-picker */
  show: boolean
  /** 控制option-picker显示 */
  setShow: (bool: boolean) => void
}

// popup弹窗数据格式
export interface PopupInputGroup {
  /** input 标题 */
  title: string
  /** input name 取值用 */
  name: string
  // input 提示
  placeholder: string
  /** input value */
  value: string
  /** 关闭组件 */
  ColsePickerType: () => void
}
