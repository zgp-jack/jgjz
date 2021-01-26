/*
 * @Author: jsxin
 * @Date: 2021-01-26 10:07:14
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 10:19:13
 * @Description: 默认数据值
 */

import { WorkTimeType } from './inter.d'

// 上班时长 数据
export const workTimeData: WorkTimeType[] = [
  {
    value: '1',
    text: '1个工'
  },
  {
    value: '0.5',
    text: '半个工'
  },
  {
    value: '0',
    text: '休息'
  }
]

// 组合 0.5 小时 - 24小时
let _workTimePickerData: WorkTimeType[]  = []
for (let i = 0.5; i <= 24; i += 0.5) {
  _workTimePickerData.push({
    value: i.toString(),
    text: `${i}小时`
  })
}

export const workTimePickerData = _workTimePickerData

// 加班时长默认数据
export const overTimeData: WorkTimeType[] = [
  {
    value: '0',
    text: '无加班'
  },
]

