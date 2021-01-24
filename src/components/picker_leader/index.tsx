import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { ADDRESSBOOKALONEPAGE } from '@/config/pages'
import PickerLeaderProps from './inter.d'
import './index.scss'

export default function PickerLeader({
  hideImg = true,
  img = `${IMGCDNURL}zgp/leader_icon.png`,
  title = '班组长',
  leader = '',
  DeletePickerLeader,
  rightClose = true
}:PickerLeaderProps){

  return (<View>
      <View className="person-record-overtime person-record-date" onClick={() => Taro.navigateTo({ url: ADDRESSBOOKALONEPAGE })}>
        {hideImg && <Image className="person-record-date-img" src={img} />}
        <View className="person-record-modify-title person-record-date-title">{title}</View>
        <Text className="person-record-date-text">{leader}</Text>
        {rightClose && <Text className="overtime-icon" onClick={(e) => {e.stopPropagation();DeletePickerLeader && DeletePickerLeader()}}></Text>}
      </View>
  </View>)
}