import {get} from "@/utils/request";
import {getCountUrl, useGetIndexBusiness, userGetBusinessLists} from "@/utils/api";
import {GetCountParams, GetCountResult, getRememberParams, getRememberResult} from "@/pages/index/inter";
import {GetWorkFlowResult} from '@/pages/work_team/record_work/index.d'

export function getBusiness(params: GetCountParams) {
  return get<GetCountParams, GetWorkFlowResult[]>(userGetBusinessLists, params)
}

export function getCount(params: GetCountParams) {
  return get<GetCountParams, GetCountResult>(getCountUrl, params)
}


