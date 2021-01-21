/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 16:34:51
 * @Description: interface for picker_date
 */

 // 日期组件接口
export default interface PickerDateProps {
  // 隐藏图片
  hideImg?:boolean
  // 图标
  img?:string
  // 组件标题
  title?:string
  // 日期
  date:string
  // 删除日期组件
  DeletePickerDate: () => void
  /** 日期被改变 */  
  change: (val: string) => void
}