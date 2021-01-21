/*
 * @Author: jsxin
 * @Date: 2021-01-20 18:30:09
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 11:08:15
 * @Description: 请求分类的接口
 */

import ClassifyItem, { AddClassifyItem } from '@/store/classify/inter.d'
import { get, post, del, put } from '@/utils/request'
import { userGetExpendType as api, userAddExpendType as addApi, userEditExpendType as editApi, userDelExpendType as delApi } from '@/utils/api'

// 获取分类接口
export default function userGetExpendType(params) {
  return get<{}, ClassifyItem[]>(api,params)
}

// 用户新增分类
export function userAddExpendType(name:string) {
  return post<AddClassifyItem, ClassifyItem>(addApi, {name})
}

// 用户修改分类
export function userEditExpendType(params: ClassifyItem ) {
  return put<AddClassifyItem, ClassifyItem>(editApi + `/${params.id}`, { name: params.name})
}

// 用户删除分类
export function userDelExpendType(id: string) {
  return del<{}, []>(delApi + `/${id}`, {})
}