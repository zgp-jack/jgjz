
import { View, Input } from '@tarojs/components';
import Taro from '@tarojs/taro'
import React from 'react'
import './index.scss'


export interface PromptBoxProps {
  showTitle? : boolean
  titleText? : string
  placeholder? : string
}


const InputBox: React.FC<PromptBoxProps>= ({
  showTitle = true,
  titleText = '标题',
  placeholder = '请输入信息',
}) => {
  const enterInfo = ()=>{
    
  }
  return (
    <View className="input-container">
      {showTitle ? <View className="input-title" >{titleText}</View> : ''}
      <Input type="text" placeholder={placeholder} onInput={()=>enterInfo()}></Input>
    </View>
  )
}
export default InputBox

