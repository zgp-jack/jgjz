/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 18:30:09
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-21 11:08:15
 * @Description: 请求计量单位
 */

import { UnitTpeyProps } from './inter.d'
import { get } from '@/utils/request'
import { userGetUnit as api } from '@/utils/api'

// 获取计量单位
// 获取分类接口
export default function userGetExpendType(params) {
  return get<{}, UnitTpeyProps[]>(api,params)
}