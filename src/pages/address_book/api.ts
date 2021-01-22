/*
 * @Author: 老王
 * @Date: 2021年01月20日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 11:10:02
 * @Description: 工友录数据请求文件
 */

import { get, put } from '@/utils/request'
import { addressBookAll, updateWordkerInfo } from '@/utils/api'
import { GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST, ADD_CONFIRM_DATA, EDIT_WORKER_RESULT } from './index.d'

// 获取通讯录列表
export default function getWorkers(params: GET_WORKERS_ALL_PARAMS) {
  return get<GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST[]>(addressBookAll, params)
}

// 修改通讯录中某个工人的信息
export function editWordkerInfo(id: number, params: ADD_CONFIRM_DATA){
  return put<ADD_CONFIRM_DATA, EDIT_WORKER_RESULT>(`${updateWordkerInfo}${id}`, params)
}
