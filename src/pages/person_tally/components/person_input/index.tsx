import Taro, { useState } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import classnames from 'classnames'
import './index.scss'

export default function ContentInput({title, quantity}){

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
            type="number" value={quantity} 
            placeholder={`请输入${title}`} 
            className="work-amount-input" 
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)} 
          />
          </View>
      </View>
  )
}
