import { get, del } from '@/utils/request'
import { WorkerList, removeWorker } from '@/utils/api'
import { WorkerReqData, WorkerParams, DeletedParams} from './index.d'

export default function getWorkerList(params: WorkerParams) {
  return get<WorkerParams, WorkerReqData>(WorkerList + params.workNote, params)
}


/** 删除工友 */
export function removePerson (params: DeletedParams) {
  return del<DeletedParams, []>(removeWorker + params.workId + '/' + params.work_note)
}
