import { View, Input } from '@tarojs/components';
import Taro, { useState } from '@tarojs/taro'
import './index.scss'


interface InputItem {
  title?: string
  placeholder?: string
  name?: string
  value?: string
}

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
  inputGroup?: InputItem[]
  cancel?: () => void
  confirm?: (data:any) => void
  delet?: () => void
}

const PromptBox = ({
  showCancel = true,
  showConfirm = true,
  showTitle = true,
  showTitleButton = true,
  cancelText = '取消',
  cancelColor = '#797979',
  confirmColor = '#0099FF',
  confirmText = '确定修改',
  titleText = '修改分类',
  inputGroup = [{name:'name',title:'姓名',placeholder:'请输入姓名'},{name:'name',title:'姓名',placeholder:'请输入姓名'}],
  cancel,
  delet,
  confirm,
}: PromptBoxProps) => {
  const [data, setData] = useState<any>({})

  const enterInput = (e)=>{
    data[e.target.dataset.name] = e.detail.value
    setData({...data})
  }

  return (
    <View className='prompt-container'>
      <View className='prompt-box' >
        {showTitle ? <View className='prompt-title' >{titleText}
          {showTitleButton ? <View className='prompt-title-button' onClick={() => delet && delet()}>删除</View> : ''}
        </View> : ''}
        <View className='prompt-content'>     
          {inputGroup.map((item)=>(
            item.title ? (<View className='input-container' key={item.name}><View className='input-title' >{item.title}</View><Input type='text' placeholder={item.placeholder} data-name={item.name} value={item.value} onInput={(e)=>enterInput(e)}></Input></View>) 
            : 
            <Input key={item.name} type='text' placeholder={item.placeholder} data-name={item.name} value={item.value} onInput={(e)=>enterInput(e)}></Input>
          ))}
        </View>
        <View className='prompt-footer' >
          {showCancel ? <View className='prompt-btn' style={{ color: cancelColor }} onClick={() => cancel && cancel()}>{cancelText}</View> : ''}
          {showConfirm ? <View className='prompt-btn' style={{ color: confirmColor }} onClick={() => confirm && confirm(data)}>{confirmText}</View> : ''}
        </View>
      </View>
    </View>
  )
}

export default PromptBox
