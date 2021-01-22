/*
 * @Author: 老王
 * @Date: 2021年01月20日10:14:39
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 11:24:26
 * @Description: 工友录数据请求文件
 */

import { get,post,del } from '@/utils/request'
import { addressBookAll, workersAdd, deleteWorker } from '@/utils/api'
import { GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST, ADD_PERSON_PARAMS, ADD_PERSON_RESULT_DATA, PERSON_DATA } from './index.d'

/** 请求当前记工本 所有工友数据 */ 
export default function getWorkers(params: GET_WORKERS_ALL_PARAMS) {
  return get<GET_WORKERS_ALL_PARAMS, ADDRESS_BOOK_LIST[]>(addressBookAll, params)
}
/** 添加工友接口 */ 
export const postAdd_Person = (params: ADD_PERSON_PARAMS)=>{
  /** 发送添加工友数据给后台 */
  return post<ADD_PERSON_PARAMS, ADD_PERSON_RESULT_DATA>(workersAdd, params, true)
}

/** 删除工友 */ 
interface deletedParams {
  id:number
}
export const deletedPerson = (params:deletedParams) => {
  return del<deletedParams, []>(deleteWorker + params.id)
}