/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 09:29:43
 * @Description: interface for work_time
 */

// 上班时间 组件
export default interface WorkTimeProps {
  // 组件数据
  worktime?: WorkTimeDataType[]
  // 是否加班组件
  isClose?: boolean
  /** 上班值 */
  workValue?: workValueType
  /** 获取值 */
  set: (number) => void
  /** 更多获取值 */
  setTime: (number) => void
  /** 关闭加班组件 */
  close?: () => void
  /** 修改的选中值  */
  selected?: SelectedValue
}

export interface WorkTimeDataType {
  // id
  id: number
  // text 文本
  text: string
}
interface workValueType {
  work_time: string,
  work_time_hour: string
}
interface SelectedValue {
  // 选中id
  id:number
  // 选中值
  value: number
}
export interface WorkTime {
  // id
  id: number
  // text值
  text: string
}