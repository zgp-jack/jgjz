/*
 * @Author: jack_zgp
 * @Date: 2021-01-18 16:26:40
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-19 20:35:20
 * @Description: 记工 - 记工天/记工量/记工钱
 */

import { userAddBorrow } from '@/utils/api'
import { post } from '@/utils/request/index'
import { RecordPostData } from './inter.d'

export default function userAddRecordAction(params: RecordPostData) {
  return post<RecordPostData, number>(userAddBorrow, params)
}