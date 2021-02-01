import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import Props from './index.d'
import './index.scss'

export default function BusinessBtns({ del, edit}: Props){
  return (
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => del()}>删除</Button>
      <Button className="person-record-save" onClick={() => edit()}>保存修改</Button>
    </View>
  )
}