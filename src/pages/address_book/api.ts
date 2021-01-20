/*
 * @Author: 老王
 * @Date: 2021年01月20日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 11:24:26
 * @Description: 工友录数据请求文件
 */

import { get } from '@/utils/request'
import { addressBookAll } from '@/utils/api'
import { GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST } from './index.d'

export default function getWorkers(params: GET_WORKERS_ALL_PARAMS) {
  return get<GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST[]>(addressBookAll, params)
}

