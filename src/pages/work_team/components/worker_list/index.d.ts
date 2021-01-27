// 单个工友数据信息
export interface WorkerData {
  /** 工友id */
  id: number
  /** 是否是自己 */
  is_self: number
  /** 工友姓名 */ 
  name: string
  /** 工友薄颜色 */ 
  name_color: string
  /** 首字母 */ 
  name_py: string
  /** 工友电话 */ 
  tel: string
  /** 是否选择 */ 
  check?: boolean
  /** 是否记录 */ 
  recorded?: boolean
  /** 别名 */ 
  alias?: string
}


// 账本工友请求数据 
export interface WorkerReqData {
  /** 账本工友数据 */ 
  business_worker_id: number[]
  /** 已记录工友id */ 
  note_worker: WorkerData[]
}


/** 获取账本工友请求 */ 
export interface WorkerParams {
  /** 查看时间 */ 
  business_time: string
  /** 记工记账类型 1 记工 2记量 3 记工钱 4 借支 5 支出 */
  action?: number
  /** 账本id */ 
  workNote: number
}


// 离场工友请求参数
interface DeletedParams {
  /** 工友id */
  workId: number
  /** 账本id */ 
  work_note: number
}

// 组件props定义
interface RecordWorkerProps {
  /** 选择工友id */ 
  workerId: number[]
  /** 保存选择工友方法 */ 
  setWorkerId: (data: number[]) => void
  /** 账本id */ 
  workNote: number
  /** 查询时间 */ 
  startDate: string
  /** 记工记账类型 1 记工 2记量 3 记工钱 4 借支 5 支出 */ 
  type: number
}



