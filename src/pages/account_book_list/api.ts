/*
 * @Author: lcmxkg
 * @Date: 2021年01月20日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 11:24:26
 * @Description: 工友录数据请求文件
 */

import { get } from '@/utils/request'
import { getWorkNotes as api} from '@/utils/api'
import { GET_WORKERS_NOTES, RECORD_WORK_DATA } from './index.d'

export default function getWorkers(params) {
  return get<GET_WORKERS_NOTES, RECORD_WORK_DATA[]>(api, params)
}

