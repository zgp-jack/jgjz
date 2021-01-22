export interface getRememberResult {
  business_work: any[]
  business_money: any[]
}

export interface getRememberParams {
  work_note: string
  business_time: string
}

export interface GetCountParams {
  business_type: string[] | string
  start_business_time: string
  work_note: string
  end_business_time: string
  is_note?: string
  expend_type?: string
  unit_work_type?: string
  expense_account?: string
  group_leader?: string | string[]
  worker_id?: string[] | string
  page: number
}

export interface GetCountResult {
  count: any
  count_num: any
}
