/*
 * @Author: jsxin
 * @Date: 2021-01-18 16:26:40
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 16:47:18
 * @Description: 通过接口发送验证码 
 */

import { post } from '@/utils/request'
import UserGetCodeResult, { UserGetCodeParams } from './inter.d'
import { userGetCode } from '@/utils/api'

export default function userGetCodeAction(tel: string) {
  const data: UserGetCodeParams = { tel: tel }
  return post<UserGetCodeParams, UserGetCodeResult>(userGetCode, data)
}