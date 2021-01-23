/*
 * @Author: 老王
 * @Date: 2021年01月20日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 11:16:32
 * @Description: 工友录数据请求文件
 */

// 获取通讯录列表
import { get, post, del, put } from '@/utils/request'
import { addressBookAll, updateWordkerInfo, workersAdd, deleteWorker } from '@/utils/api'
import { GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST, ADD_CONFIRM_DATA, EDIT_WORKER_RESULT, ADD_PERSON_PARAMS, ADD_PERSON_RESULT_DATA, PERSON_DATA, DeletedParams } from './index.d'

/** 请求当前记工本 所有工友数据 */ 
export function getWorkers(params: GET_WORKERS_ALL_PARAMS) {
  return get<GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST[]>(addressBookAll, params)
}
/** 添加工友接口 */ 
export const postAdd_Person = (params: ADD_PERSON_PARAMS)=>{
  /** 发送添加工友数据给后台 */
  return post<ADD_PERSON_PARAMS, ADD_PERSON_RESULT_DATA>(workersAdd, params, true)
}

// 修改通讯录中某个工人的信息
export function editWordkerInfo(id: number, params: ADD_CONFIRM_DATA){
  return put<ADD_CONFIRM_DATA, EDIT_WORKER_RESULT>(`${updateWordkerInfo}${id}`, params)
}

/** 删除工友 */ 
export const deletedPerson = (params: DeletedParams) => {
  return del<DeletedParams, []>(deleteWorker + params.id)
}
