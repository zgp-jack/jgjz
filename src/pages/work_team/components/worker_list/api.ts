import { get } from '@/utils/request'
import { WorkerList } from '@/utils/api'
import { WorkerReqData, WorkerParams} from './index.d'

export default function getWorkerList(params: WorkerParams) {
  return get<WorkerParams, WorkerReqData>(WorkerList, params)
}
