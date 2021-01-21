/*
 * @Author: jsxin
 * @Date: 2021-01-20 18:30:09
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 19:23:49
 * @Description: 请求分类的接口
 */

import ClassifyItem from '@/store/classify/inter.d'
import { get } from '@/utils/request'
import { userGetExpendType as api } from '@/utils/api'

// 获取分类接口
export default function userGetExpendType(params) {
  return get<{}, ClassifyItem[]>(api,params)
}