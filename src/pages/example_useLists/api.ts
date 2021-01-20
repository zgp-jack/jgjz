/*
 * @Author: jsxin
 * @Date: 2021-01-18 18:31:22
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 11:54:36
 * @Description: 数据请求文件
 */

import { get } from '@/utils/request'
import { userGetBusinessLists } from '@/utils/api'
import { UserGetBusinessListsParams, UserGetBusinessListsResult } from './inter.d'

export default function getBusinesslists(params: UserGetBusinessListsParams) {
  return get<UserGetBusinessListsParams, UserGetBusinessListsResult[]>(userGetBusinessLists, params)
}