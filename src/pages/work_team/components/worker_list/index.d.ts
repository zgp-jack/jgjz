export interface WorkerData {
  id: number
  is_self: number
  name: string
  name_color: string
  name_py: string
  tel: string
  check?: boolean
  recorded?: boolean
  alias?: string
}

export interface WorkerReqData {
  business_worker_id: number[]
  note_worker: WorkerData[]
}

export interface WorkerParams {
  business_time: string
  action: string
}



interface DeletedParams {
  /** 工友id */
  id: number
}



