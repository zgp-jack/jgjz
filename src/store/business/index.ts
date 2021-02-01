import {observable} from 'mobx'
import {BusinessTypeItem} from "@/store/business/inter";

export class RememberStore {
  @observable businessType: BusinessTypeItem[] = [
    {
      id: '1',
      name: '记工天'
    },
    {
      id: '3',
      name: '记工钱'
    },
    {
      id: '2',
      name: '记工量'
    },
    {
      id: '4',
      name: '借支'
    },
    {
      id: '5',
      name: '支出'
    }
  ]
}

export default new RememberStore()
