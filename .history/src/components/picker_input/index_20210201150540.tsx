import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import classnames from 'classnames'
import PersonInputProps from './inter'
import './index.scss'

export default function ContentInput({ title, change, value, type, maxLength = 2 }: PersonInputProps){
  // input是否foces
  const [focus, setFocus] = useState<boolean>(false)

  // 监听输入框的值
  // useEffect(() => {
  //   let _value: string = value || ''
  //   let index: number = _value.indexOf('.')
  //   // 如果说是小数 那么就要准备切割
  //   if (index !== -1){
  //     let front_val: string = _value.substring(0, index + 1);
  //     let end_val: string = _value.substring(index + 1, index+maxLength+1);
  //     let _val = front_val + end_val
  //     change(front_val + end_val, type)
  //   }
  // },[value])
  const validInfo = (value) => {
    let _value: string = value || ''
    if (_value[0] == '.'){
      return '';
    }
    let index: number = _value.indexOf('.')
    if (_value[0] == '0' && index == -1 ){
      return 0
    }
    // if(_value.match(/^.[^.]+$/)){
    //   return _value.split('.')[0]
    // }
    // 如果说是小数 那么就要准备切割
    if (index !== -1) {
      let front_val: string = _value.substring(0, index + 1);
      let end_val: string = _value.substring(index + 1, index + maxLength + 1);
      let _val = front_val + end_val
      // change(front_val + end_val, type)
      return _val;
    }
  }
  return (
      <View className="person-record-work">
      <View className={classnames({
        "work-amount": true,
        "input-active": focus
      })}>
        <Text className="work-amount-text">{title}</Text>
          <Input 
            // type="digit" 
            maxLength={13}
            value={value} 
            placeholder={`0.00`} 
            className="work-amount-input" 
            onInput={(e: any) => validInfo(e.detail.value)}
            onFocus={(e) => { setFocus(true);}}
            // onConfirm
            onBlur={(e: any) => { e.stopPropagation();setFocus(false);change(e.detail.value, type)}} 
          />
          </View>
      </View>
  )
}
