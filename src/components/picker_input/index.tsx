import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import classnames from 'classnames'
import PersonInputProps from './inter'
import './index.scss'

export default function ContentInput({ title, change, value, type, maxLength = 2 }: PersonInputProps){
  // input是否foces
  const [focus, setFocus] = useState<boolean>(false)

  // 监听输入框的值
  useEffect(() => {
    let _value: string = value
    let index: number = _value.indexOf('.')
    // 如果说是小数 那么就要准备切割
    if (index !== -1){
      let front_val: string = _value.substring(0, index + 1);
      let end_val: string = _value.substring(index + 1, index+maxLength+1);
      let _val = front_val + end_val
      change(front_val + end_val, type)
    }
  },[value])

  return (
      <View className="person-record-work">
      <View className={classnames({
        "work-amount": true,
        "input-active": focus
      })}>
        <Text className="work-amount-text">{title}</Text>
          <Input 
            type="number" 
            value={value} 
            placeholder={`0`} 
            className="work-amount-input" 
            onInput={(e: any) => change(e.detail.value, type)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)} 
          />
          </View>
      </View>
  )
}
