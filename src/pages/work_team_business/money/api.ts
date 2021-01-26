/*
 * @Author: jsxin
 * @Date: 2021-01-24 16:52:33
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 16:57:37
 * @Description: 记工钱 请求 接口文件
 */

import { userGetBusinessInfo, userDelBusinessInfo, userEditBusinessInfo } from '@/utils/api'
import { get, put, del } from '@/utils/request'
import { BusinessInfoResult, UserDelBusinessInfo, UserEditBusinessInfo } from './inter.d'

// 初始化流水详情接口
export default function getBusinessMoneyInfo(id: string) {
  return get<{}, BusinessInfoResult>(`${userGetBusinessInfo}${id}`, {})
}

// 用户删除流水
export function delBusinessMoney(id: string) {
  return del<{}, null>(`${userDelBusinessInfo}/${id}`, {})
}

// 用户修改流水
export function editBusinessMoney(params: UserEditBusinessInfo) {
  return put<UserEditBusinessInfo, null>(`${userEditBusinessInfo}${params.id}`, params)
}