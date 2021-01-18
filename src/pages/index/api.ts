/*
 * @Author: jsxin
 * @Date: 2021-01-18 18:31:22
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 20:12:56
 * @Description: 数据请求文件
 */

import { get } from '@/utils/request'
import { Result } from '@/utils/request/inter.d'
import { userGetBusinessLists } from '@/utils/api'
import { UserGetBusinessListsParams, UserGetBusinessListsResult } from './inter.d'

export default function getIndexInfo(params: UserGetBusinessListsParams) {
  return get<UserGetBusinessListsParams, Result<UserGetBusinessListsResult> >(userGetBusinessLists, params)
}