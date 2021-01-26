/*
 * @Author: lcmxkg
 * @Date: 2021年01月20日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 15:21:25
 * @Description: 工友录数据请求文件
 */

import { get, put } from '@/utils/request'
import { getWorkNotes as api, editWorkNotes as editApi} from '@/utils/api'
import { GET_WORKERS_NOTES, RECORD_WORK_DATA, ADD_RECORD_WORK_PARAMS } from './index.d'

// 获取记工本列表
export default function getWorkNotes() {
  return get<{}, RECORD_WORK_DATA[]>(api, {})
}

// 修改单个记工本
export function editWorkNote(id: number ,params: ADD_RECORD_WORK_PARAMS) {
  return put<ADD_RECORD_WORK_PARAMS, null>(`${editApi}/${id}`, params)
}
