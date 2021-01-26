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
  group_leader: AddressBookParams[] | string
  worker_id: AddressBookParams[] | string
  page: number
}

export interface GetCountResult {
  count: any
  count_num: any
}

export interface AddressBookParams {
  id: number
  is_check: boolean
  is_deleted: number
  is_in_work_note: number
  is_self: number
  name: string
  name_color: string
  name_py: string
  tel?: string
}
