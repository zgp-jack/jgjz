import {get} from "@/utils/request";
import {getCountUrl, userGetBusinessLists} from "@/utils/api";
import { GetCountParams, GetCountResult } from "@/pages/index/inter";
import { GetWorkFlowResult } from '@/pages/work_team/team_record/index.d'

export function getBusiness(params: GetCountParams) {
  return get<GetCountParams, GetWorkFlowResult[]>(userGetBusinessLists, params)
}

export function getCount(params: GetCountParams) {
  return get<GetCountParams, GetCountResult>(getCountUrl, params)
}


