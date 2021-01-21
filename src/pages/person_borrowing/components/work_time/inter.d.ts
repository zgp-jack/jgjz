/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 16:01:32
 * @Description: interface for work_time
 */

// 上班时间 组件
export default interface WorkTimeProps {
  // 组件数据
  worktime?: WorkTimeDataType[]
  // 是否可以关闭
  isClose?: boolean
}

export interface WorkTimeDataType {
  // id
  id: number
  // text 文本
  text: string
}