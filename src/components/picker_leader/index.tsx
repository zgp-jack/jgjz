import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PickerLeaderProps from './inter.d'
import './index.scss'

export default function PickerLeader({
    hideImg = true,
    img = `${IMGCDNURL}gl/Bookkeeping-icon.png`,
    title = '班组长',
    leader = '',
    DeletePickerLeader
}:PickerLeaderProps){

    return (<View>
        <View className="person-record-overtime person-record-date">
            {hideImg && <Image className="person-record-date-img" src={img} />}
            <View className="person-record-modify-title person-record-date-title">{title}</View>
            <Text className="person-record-date-text">{leader}</Text>
            <Text className="overtime-icon" onClick={DeletePickerLeader}></Text>
        </View>
    </View>)
}