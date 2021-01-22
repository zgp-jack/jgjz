/*
 * @Author: jack_zgp
 * @Date: 2021-01-18 16:26:40
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-19 20:35:20
 * @Description: 记账 - 支出/借支
 */

import { userAddBorrow } from '@/utils/api'
import { post } from '@/utils/request/index'
import BorrowPostData from './components/borrow/inter.d'

export default function userAddBorrowAction(params: BorrowPostData) {
  return post<BorrowPostData, number>(userAddBorrow, params)
}