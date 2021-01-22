import Taro, {useEffect, useState} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import React from 'react'
import PickerBar from "@/components/picker/components/picker-bar";
import PopupBottom from "@/components/picker/components/popupBottom";
import PickerBody from "@/components/picker/components/picker-body";
import {PickerData, PickerProps} from "@/components/picker/type";
import {observer, useLocalStore} from '@tarojs/mobx'
import PickerStore from '@/store/picker/index'

const PickerWorkTime: React.FC<PickerProps> = props => {
  const localStore = useLocalStore(() => PickerStore)
  const {initTimes, times} = localStore
  console.log('time', times)
  const [activeTime, setActiveTime] = useState<PickerData>({id: 0, value: ''})

  useEffect(() => {
    console.log(times)
    if (!times.length) {
      initTimes()
    }
  }, [])
  return (
    <PopupBottom show={props.show} closePopup={props.close}>
      <View className="picker-work-time">
        <PickerBar confirmBtn centerText="选择上班时长" confirmClick={() => props.confirm(activeTime)}>
          <View className="picker-bar-children" onClick={props.close}>取消</View>
        </PickerBar>
        <PickerBody data={times} onSelect={time => setActiveTime(time)} activeData={activeTime} isTime/>
      </View>
    </PopupBottom>
  )
}

export default observer(PickerWorkTime);
