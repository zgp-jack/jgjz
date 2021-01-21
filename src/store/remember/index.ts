import {action, observable} from 'mobx'
import {RememberTypeItem} from "@/store/remember/inter";

export class RememberStore {
  @observable rememberType: RememberTypeItem[] = [
    {
      id: '1',
      name: '记工天'
    },
    {
      id: '2',
      name: '记工钱'
    },
    {
      id: '3',
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
