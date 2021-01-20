/*
 * @Author: jsxin
 * @Date: 2021-01-20 15:04:30
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 15:10:27
 * @Description: config for *
 */

import TallyConfig from './inter.d'

// 借支
export const borrow: string = 'borrow'
// 支出
export const expenditure: string = 'expenditure'

// tab配置项
const tallyConfig: TallyConfig[] = [
  {
    id: borrow,
    title: '借支'
  }, {
    id: expenditure,
    title: '支出'
  }
]

export default tallyConfig