/*
 * @Author: jsxin
 * @Date: 2021-01-18 16:26:40
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 20:35:20
 * @Description: 通过接口发送验证码 
 */

import { get } from '@/utils/request'
import { UserGetCodeParams } from './inter.d'
import { userGetCode } from '@/utils/api'

export default function userGetCodeAction(tel: string) {
  const data: UserGetCodeParams = { tel: tel }
  return get<UserGetCodeParams, number>(userGetCode, data)
}