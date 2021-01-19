import Taro, {useEffect, useState} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

import PickerBar from "@/components/picker/components/picker-bar";
import PopupBottom from "@/components/picker/components/popupBottom";
import PickerBody from "@/components/picker/components/picker-body";

interface PickerWorkTimeProps {
  close: () => void
  show: boolean
  confirm: (activeTime: PickerData) => void
}

export interface PickerData {
  id: number
  value: string
}

const PickerWorkTime: React.FC<PickerWorkTimeProps> = props => {
  const [times, setTimes] = useState<PickerData[]>([])
  const [activeTime, setActiveTime] = useState<PickerData>({id: 0, value: ''})
  useEffect(() => {
    let _times: PickerData[] = []
    let id: number = 0
    for (let i = 1; i <= 24; i++) {
      _times.push({id: ++id, value: i - 1 + '.5小时'})
      _times.push({id: ++id, value: i + '小时'})
    }
    setTimes(_times)
  }, [])
  return (
    <PopupBottom show={props.show} closePopup={props.close}>
      <View className="picker-work-time">
        <PickerBar confirmBtn centerText="选择上班时长" confirmClick={() => props.confirm(activeTime)}>
          <View className="picker-bar-children" onClick={props.close}>取消</View>
        </PickerBar>
        <PickerBody data={times} onSelect={time => setActiveTime(time)} activeData={activeTime}/>
      </View>
    </PopupBottom>
  )
}

export default PickerWorkTime;
