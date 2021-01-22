/*
 * @Author: jsxin
 * @Date: 2021-01-20 14:54:28
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 15:42:55
 * @Description: interface for picker_unit
 */

 // 单位组件

 export default interface PickerUnitProps {
  // 隐藏图片
  hideImg?:boolean
  // 图标
  img?:string
  // 组件标题
  title?:string
  // 单位值
  value:string
  // 获取值
  set: (PickerData) => void
 }
export interface PickerData {
  id: number
  value: string
}