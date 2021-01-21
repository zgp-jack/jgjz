import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PickerDateProps from './inter'
import './index.scss'

export default function PickerDate({
    hideImg = true,
    img = `${IMGCDNURL}gl/Bookkeeping-icon.png`,
    title = '日期',
    date = '',
    DeletePickerDate
}:PickerDateProps){

    return (<View>
        <View className="person-record-overtime person-record-date">
            {hideImg && <Image className="person-record-date-img" src={img} />}
            <View className="person-record-modify-title person-record-date-title">{title}</View>
            <Text className="person-record-date-text">{date}</Text>
            <Text className="overtime-icon" onClick={DeletePickerDate}></Text>
        </View>
    </View>)
}