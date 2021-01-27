import {get} from "@/utils/request";
import {getCountUrl, useGetIndexBusiness, userGetBusinessLists} from "@/utils/api";
<<<<<<< Updated upstream:src/pages/index/api.ts
import {GetCountParams, GetCountResult, getRememberParams, getRememberResult} from "@/pages/index/inter";
=======
import {GetCountParams, GetCountResult, getRememberParams, getRememberResult} from "@/pages/remember/inter";
>>>>>>> Stashed changes:src/pages/remember/api.ts
import {GetWorkFlowResult} from '@/pages/work_team/team_record/index.d'

export function getBusiness(params: GetCountParams) {
  return get<GetCountParams, GetWorkFlowResult[]>(userGetBusinessLists, params)
}

export function getCount(params: GetCountParams) {
  return get<GetCountParams, GetCountResult>(getCountUrl, params)
}


