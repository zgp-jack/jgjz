import {get} from "@/utils/request";
import {getCountUrl, useGetIndexBusiness} from "@/utils/api";
import {GetCountParams, GetCountResult, getRememberParams, getRememberResult} from "@/pages/remember/inter";

export function getBusiness(params) {
  return get<getRememberParams, getRememberResult>(useGetIndexBusiness, params)
}

export function getCount(params: GetCountParams) {
  return get<GetCountParams, GetCountResult>(getCountUrl, params)
}
