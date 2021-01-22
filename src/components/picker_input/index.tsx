import Taro, { useState } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import classnames from 'classnames'
import PersonInputProps from './inter'
import './index.scss'

export default function ContentInput({ title, change, value, type }: PersonInputProps){
  // input是否foces
  const [focus, setFocus] = useState<boolean>(false)

  return (
      <View className="person-record-work">
      <View className={classnames({
        "work-amount": true,
        "input-active": focus
      })}>
        <Text className="work-amount-text">{title}</Text>
          <Input 
            type="number" value={value} 
            placeholder={`0.00`} 
            className="work-amount-input" 
            onInput={(e: any) => change(e.detail.value, type)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)} 
          />
          </View>
      </View>
  )
}
