import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import Props from './index.d'
import './index.scss'

export default function BusinessBtns({ userDeleteBusiness, userEditBusiness}: Props){
  return (
    <View className="person-record-btn">
      <Button className="person-record-resave" onClick={() => userDeleteBusiness()}>删除</Button>
      <Button className="person-record-save" onClick={() => userEditBusiness()}>保存修改</Button>
    </View>
  )
}