/*
 * @Author: jsxin
 * @Date: 2021-01-20 18:30:09
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 19:37:14
 * @Description: 请求分类的接口
 */

import ClassifyItem from '@/store/classify/inter.d'
import { get } from '@/utils/request'
import { userGetUnitWorkType as api } from '@/utils/api'

// 获取分项接口
export default function userGetExpendType(params) {
  return get<{}, ClassifyItem[]>(api, params)
}