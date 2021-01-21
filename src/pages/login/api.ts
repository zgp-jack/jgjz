/*
 * @Author: jsxin
 * @Date: 2021-01-18 16:26:40
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 20:35:20
 * @Description: 登录
 */

import { post } from '@/utils/request'
import { UserGetCodeLoginParams } from './inter.d'
import { userGetMemberCodeLogin } from '@/utils/api'

export default function userGetCodeLoginAction(params: UserGetCodeLoginParams) {
  return post<UserGetCodeLoginParams, number>(userGetMemberCodeLogin, params)
}