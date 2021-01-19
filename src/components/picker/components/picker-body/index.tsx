import Taro from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import './index.scss'
import PickerBlock from "@/components/picker/components/picker-block";
import {PickerData} from "@/components/picker/picker-work-time";
import React from 'react'

interface PickerBodyProps {
  data: PickerData[]
  onSelect: (data: PickerData) => void
  activeData: PickerData
  over?: boolean
}

const PickerBody: React.FC<PickerBodyProps> = ({data, onSelect, activeData, over = false}) => {
  if (!Array.isArray(data)) {
    return null
  }
  return (
    <View className="picker-body">
      <ScrollView
        className={'picker-body-scroll' + (over ? ' picker-body-scroll-over' : '')}
        scrollY
        scrollWithAnimation
        enableFlex
      >
        {
          data.map(item => (
            <PickerBlock key={item.id} text={item.value} click={() => onSelect(item)}
                         active={activeData.id === item.id}/>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default PickerBody;
