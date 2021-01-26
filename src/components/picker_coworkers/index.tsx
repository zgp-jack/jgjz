import Taro from '@tarojs/taro'
import {View, Image, Text} from '@tarojs/components'
import {IMGCDNURL} from '@/config/index'
import {ADDRESSBOOKALONEPAGE} from '@/config/pages'
import PickerCoworkersProps from './inter.d'
import './index.scss'

export default function PickerCoworkers({
                                          hideImg = true,
                                          img = `${IMGCDNURL}zgp/leader_icon.png`,
                                          title = '工友',
                                          leader = '无工友',
                                          DeletePickerCoworkers,
                                          rightClose = true
                                        }: PickerCoworkersProps) {

  return (<View>
    <View className="person-record-overtime person-record-date"
          onClick={() => Taro.navigateTo({url: ADDRESSBOOKALONEPAGE})}>
      {hideImg && <Image className="person-record-date-img" src={img}/>}
      <View className="person-record-modify-title person-record-date-title">{title}</View>
      <Text className="person-record-date-text">{leader}</Text>
      {rightClose && <Text className="overtime-icon" onClick={(e) => {
        e.stopPropagation();
        DeletePickerCoworkers && DeletePickerCoworkers()
      }}/>}
    </View>
  </View>)

}
