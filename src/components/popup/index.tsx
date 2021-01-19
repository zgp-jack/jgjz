import { View } from '@tarojs/components';
import Taro from '@tarojs/taro'
import React from 'react'
import './index.scss'



export interface PromptBoxProps {
  showCancel?: boolean
  showConfirm?: boolean
  showTitle?: boolean
  cancelText?: string
  confirmText?: string
  titleText?: string
  cancelColor?: string
  confirmColor?: string
  showTitleButton?:boolean
  cancel?: () => void
  confirm?: () => void
  close?: () => void
  children:any
}

const PromptBox: React.FC<PromptBoxProps> = ({
  showCancel = true,
  showConfirm = true,
  showTitle = true,
  showTitleButton = true,
  cancelText = '取消',
  cancelColor = '#797979',
  confirmColor = '#0099FF',
  confirmText = '确定修改',
  titleText = '修改分类',
  cancel,
  confirm,
  children
}) => {
  return (
    <View className="prompt-container">
      <View className="prompt-box" >
        {showTitle ? <View className="prompt-title" >{titleText}
          {showTitleButton ? <View className="prompt-title-button">删除</View> : ''}
        </View> : ''}
        <View className="prompt-content">
          {children}
        </View>
        <View className="prompt-footer" >
          {showCancel ? <View className="prompt-btn" style={{ color: cancelColor }} onClick={() => cancel && cancel()}>{cancelText}</View> : ''}
          {showConfirm ? <View className="prompt-btn" style={{ color: confirmColor }} onClick={() => confirm && confirm()}>{confirmText}</View> : ''}
        </View>
      </View>
    </View>
  )
}

export default PromptBox
