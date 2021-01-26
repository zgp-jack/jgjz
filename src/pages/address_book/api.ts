/*
 * @Author: 老王
 * @Date: 2021年01月20日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-22 11:16:32
 * @Description: 工友录数据请求文件
 */

// 获取通讯录列表
import { get, post, del, put } from '@/utils/request'
import { addressBookAll, updateWordkerInfo, workersAdd, deleteWorker, addNoteWorkersUrl, deleteNoteWorkersUrl, getNoteWorkersUrl } from '@/utils/api'
import { GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST, ADD_CONFIRM_DATA, EDIT_WORKER_RESULT, ADD_PERSON_PARAMS, ADD_PERSON_RESULT_DATA, PERSON_DATA, DeletedParams, ADD_NOTE_WORKERS_PARAMS, GET_NOTE_WORKERS_PARAMS, GET_NOTE_WORKERS_data } from './index.d'

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

/** 记工本添加工人 */
export const addNoteWorkers = (params: ADD_NOTE_WORKERS_PARAMS) =>{ 
  return post<ADD_NOTE_WORKERS_PARAMS, []>(addNoteWorkersUrl,params)
}

/** 删除技工班中的工人-离场 */
export const deleteNoteWorkers = (params: ADD_NOTE_WORKERS_PARAMS) =>{
  return del<ADD_NOTE_WORKERS_PARAMS, []>(`${deleteNoteWorkersUrl}/${params.worker_ids}/${params.work_note}`, params)
}
/** 请求当前记工本 已选中的工友数据 */
export const getNoteWorkers = (params: GET_NOTE_WORKERS_PARAMS)=>{
  return get<GET_NOTE_WORKERS_PARAMS, GET_NOTE_WORKERS_data>(`${getNoteWorkersUrl}${params.workNote}`, params)
}
