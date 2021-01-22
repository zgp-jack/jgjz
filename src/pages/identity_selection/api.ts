/*
 * @Author: lcmxkg
 * @Date: 2021年01月22日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 11:24:26
 * @Description: 工友录数据请求文件
 */

import { post } from '@/utils/request'
import { addWorkNotes } from '@/utils/api'
import { EDIT_WORKERS_NOTES } from './index.d'

export default function getWorkers(params) {
  return post<EDIT_WORKERS_NOTES>(EDIT_WORKERS_NOTES, params)
}

