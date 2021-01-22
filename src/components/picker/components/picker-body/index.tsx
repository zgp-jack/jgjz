import Taro from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import './index.scss'
import PickerBlock from "@/components/picker/components/picker-block";
import {PickerData} from "@/components/picker/type";
import React from 'react'

interface PickerBodyProps {
  data: PickerData[]
  onSelect: (data: PickerData) => void
  activeData: PickerData
  over?: boolean
  isTime?: boolean
}

const PickerBody: React.FC<PickerBodyProps> = ({data = [], onSelect, activeData, over = false, isTime}) => {
  console.log('123123123', data)
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
            <PickerBlock isTime={isTime} key={item.id} text={item.value} click={() => onSelect(item)}
                         active={activeData.id == item.id}/>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default PickerBody;
