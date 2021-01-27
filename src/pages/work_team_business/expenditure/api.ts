/*
 * @Author: jsxin
 * @Date: 2021-01-24 13:40:15
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 14:38:49
 * @Description: 个人支出流水请求相关 管理
 */


import { userGetBusinessInfo, userDelBusinessInfo, userEditBusinessInfo } from '@/utils/api'
import { get, put, del } from '@/utils/request'
import { BusinessInfoResult, UserDelBusinessInfo, UserEditBusinessInfo } from './inter.d'

// 初始化流水详情接口
export default function getExpenditureInfo(id: string) {
  return get<{}, BusinessInfoResult>(`${userGetBusinessInfo}${id}`, {})
}

// 用户删除流水
export function delExpenditureBusiness(id: string) {
  return del<{}, null>(`${userDelBusinessInfo}/${id}`, {})
}

// 用户修改流水
export function editExpenditureBusiness(params: UserEditBusinessInfo) {
  return put<UserEditBusinessInfo, null>(`${userEditBusinessInfo}${params.id}`, params)
}