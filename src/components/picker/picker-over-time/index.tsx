import Taro, {useEffect, useState} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'

import PickerBar from "@/components/picker/components/picker-bar";
import PopupBottom from "@/components/picker/components/popupBottom";
import PickerBody from "@/components/picker/components/picker-body";
import {PickerData, PickerProps} from "@/components/picker/type";


const PickerOverTime: React.FC<PickerProps> = props => {
  const [times, setTimes] = useState<PickerData[]>([])
  const [activeTime, setActiveTime] = useState<PickerData>({id: 0, value: ''})
  useEffect(() => {
    let _times: PickerData[] = []
    let id: number = 0
    for (let i = 1; i <= 24; i++) {
      _times.push({id: ++id, value: i + '小时'})
      _times.push({id: ++id, value: i + '.5小时'})
    }
    delete _times[_times.length - 1]
    setTimes(_times)
  }, [])
  return (
    <PopupBottom show={props.show} closePopup={props.close}>
      <View className="picker-over-time">
        <PickerBar centerText="加班时长" confirmClick={props.confirm}>
          <View className="picker-bar-children">上班:<Text>1</Text>个工</View>
        </PickerBar>
        <PickerBody data={times} onSelect={time => setActiveTime(time)} activeData={activeTime} over/>
        <View className="no-over">
          <View className="no-over-item">无加班</View>
        </View>
      </View>
    </PopupBottom>
  )
}

export default PickerOverTime;
