/*
 * @Author: jsxin
 * @Date: 2021-01-24 10:13:08
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 17:17:23
 * @Description: 个人流水借支 接口文件
 */

import { userGetBusinessInfo, userDelBusinessInfo, userEditBusinessInfo } from '@/utils/api'
import { get,del, put } from '@/utils/request'
import { BusinessInfoResult, UserDelBusinessInfo, UserEditBusinessInfo } from './inter.d'

// 初始化流水详情接口
export default function getBorrowInfo(id: string){
  return get<{}, BusinessInfoResult>(`${userGetBusinessInfo}${id}`, {})
}

// 用户删除流水
export function delBorrowBusiness(id: string) {
  return del<{}, null>(`${userDelBusinessInfo}/${id}`, {})
}

// 用户修改流水
export function editBorrowBusiness(params: UserEditBusinessInfo) {
  return put<UserEditBusinessInfo, null>(`${userEditBusinessInfo}${params.id}`, params)
}