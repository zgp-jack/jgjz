import {observable, action} from 'mobx'
import {PickerData} from "@/components/picker/type";

export class pickerStore {
  @observable
  times: PickerData[] = []

  @action
  initTimes = () => {
    console.log(123)
    let _times: PickerData[] = []
    let id: number = 0
    for (let i = 1; i <= 24; i++) {
      _times.push({id: ++id, value: i - 1 + '.5'})
      _times.push({id: ++id, value: i + ''})
    }
    this.times = _times
  }
}

export default new pickerStore()
