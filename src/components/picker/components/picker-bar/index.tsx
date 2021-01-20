import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'
import close from '@/images/x.png'
import React from 'react'
import {PickerBarProps} from "@/components/picker/type";

const PickerBar: React.FC<PickerBarProps> = ({centerText, confirmClick, children, confirmBtn = false}) => {
  return (
    <View className="picker-bar">
      <View className="bar-left">{children}</View>
      <View className="bar-center">{centerText}</View>
      <View onClick={confirmClick} className="bar-right">
        {!confirmBtn ?
          < Image className="bar-close" src={close}/>
          :
          <View className="bar-confirm">确定</View>
        }
      </View>
    </View>
  )
}

export default PickerBar;
