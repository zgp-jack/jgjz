/*
 * @Author: jsxin
 * @Date: 2021-01-18 16:26:40
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 20:35:20
 * @Description: 意见反馈
 */

import { post } from '@/utils/request'
import { FeedbackParams } from './inter.d'
import { addFeedback } from '@/utils/api'

export default function userGetFeedbackAction(params: FeedbackParams) {
  return post<FeedbackParams, number>(addFeedback, params)
}