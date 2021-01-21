/*
 * @Author: jsxin
 * @Date: 2021-01-20 16:49:45
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 17:49:38
 * @Description: 数据请求文件
 */
import { get } from '@/utils/request'
import { flowList } from '@/utils/api'
import { GetWorkFlowParams, GetWorkFlowResult } from './index.d'

export default function getFlowlists(params: GetWorkFlowParams) {
  return get<GetWorkFlowParams, GetWorkFlowResult[]>(flowList, params)
}