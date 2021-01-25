/*
 * @Author: jsxin
 * @Date: 2021-01-20 18:30:09
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 13:54:00
 * @Description: 请求分项的接口
 */

import ClassifyItem, { AddClassifyItem } from '@/store/classify/inter.d'
import { get, post, del, put } from '@/utils/request'
import { userGetUnitWorkType as api, userAddUnitWorkType as addApi, userEditUnitWorkType as editApi, userDelUnitWorkType as delApi } from '@/utils/api'

// 获取分项接口
export default function userGetExpendType(params) {
  return get<{}, ClassifyItem[]>(api, params)
}

// 用户新增分项
export function userAddExpendType(name: string) {
  return post<AddClassifyItem, ClassifyItem>(addApi, { name })
}

// 用户修改分项
export function userEditExpendType(params: ClassifyItem) {
  return put<AddClassifyItem, ClassifyItem>(editApi + `/${params.id}`, { name: params.name })
}

// 用户删除分项
export function userDelExpendType(id: string) {
  return del<{}, []>(delApi + `/${id}`, {})
}