/*
 * @Author: jsxin
 * @Date: 2021-01-20 17:45:14
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 11:02:47
 * @Description: options-picker interface
 */

// 单项数据类型
export interface PickerOptionsItem {
  /** id */
  id: string,
  /** 名称 */
  name: string
}

//  组件默认参数
export default interface PickerOptionsProps{
  /** 数据源 */
  data: PickerOptionsItem[],
  /** 关闭事件 */
  close: () => void
  /** 是否展示弹窗 */
  show: boolean
  /** 确定事件 */
  confirm: (data: PickerOptionsItem) => void,
  /** 添加事件 */
  add: () => void,
  /** 修改事件 */
  edit: (item: PickerOptionsItem, i: number) => void,
  /** 删除事件 */
  del: (id: string, i: number) => void,
  /** 当前数据是否还在初始化 */
  status?: boolean
  /** title */
  title?: string
}