import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PickerUnitProps from './inter.d'
import './index.scss'

export default function PickerUnit({
    hideImg = true,
    img = `${IMGCDNURL}zgp/unit_icon.png`,
    title = '单位',
    value = '平方米'
}:PickerUnitProps){

    return (<View>
        <View className="person-record-overtime person-record-date">
            {hideImg && <Image className="person-record-date-img" src={img} />}
            <View className="person-record-modify-title person-record-date-title">{title}</View>
            <Text className="person-record-date-text">{value}</Text>
        </View>
    </View>)
}