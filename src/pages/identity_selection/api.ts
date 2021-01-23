/*
 * @Author: lcmxkg
 * @Date: 2021-01-22 16:26:40
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 20:35:20
 * @Description: 新建记工账本
 */

import { post } from '@/utils/request'
import { IDENTITY_CONFIG, CreateResultType } from './index.d'
import { addWorkNotes } from '@/utils/api'

export default function userAddWorkNotesAction(params: IDENTITY_CONFIG) {
  return post<IDENTITY_CONFIG, CreateResultType>(addWorkNotes, params)
}
