import Taro, {useEffect, useState} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import './index.scss'

import PickerBar from "@/components/picker/components/picker-bar";
import PopupBottom from "@/components/picker/components/popupBottom";
import PickerBody from "@/components/picker/components/picker-body";
import {PickerData, PickerProps} from "@/components/picker/type";
import {observer, useLocalStore} from '@tarojs/mobx'
import PickerStore from '@/store/picker/index'

const PickerOverTime: React.FC<PickerProps> = props => {
  const localStore = useLocalStore(() => PickerStore)
  const {initTimes, times} = localStore
  const [activeTime, setActiveTime] = useState<PickerData>({id: 0, value: ''})

  useEffect(() => {
    if (!times.length) {
      initTimes()
    }
  }, [])
  return (
    <PopupBottom show={props.show} closePopup={props.close}>
      <View className="picker-over-time">
        <PickerBar centerText="加班时长" confirmClick={() => props.confirm}>
          <View className="picker-bar-children">上班:<Text>1</Text>个工</View>
        </PickerBar>
        <PickerBody data={times} onSelect={time => setActiveTime(time)} activeData={activeTime} over isTime/>
        <View className="no-over">
          <View className="no-over-item">无加班</View>
        </View>
      </View>
    </PopupBottom>
  )
}

export default observer(PickerOverTime);
