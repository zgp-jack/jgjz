export interface getRememberResult {
  business_work: any[]
  business_money: any[]
}

export interface getRememberParams {
  work_note: string
  business_time: string
}

export interface GetCountParams {
  business_type?: string
  start_business_time: string
  work_note: string
  end_business_time: string
}

export interface GetCountResult {
  count: any
  count_num: any
}
