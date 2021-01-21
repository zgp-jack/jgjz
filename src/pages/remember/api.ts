import {get} from "@/utils/request";
import {initRemember, useGetIndexBusiness, workNote} from "@/utils/api";

export function getRememberById(params) {
  return get<any, any[]>(useGetIndexBusiness, params)
}
