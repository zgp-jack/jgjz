import Taro from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PickerMarkProps from './inter'
import './index.scss'

export default function PickerMark({
    hideImg = true,
    img = `${IMGCDNURL}gl/Bookkeeping-icon.png`,
    title = '备注',
    text = '',
}:PickerMarkProps) {

    return (<View>
        <View className="person-record-overtime person-record-date person-record-note">
            {hideImg && <Image className="person-record-date-img" src={img} />}
            <View className="person-record-modify-title person-record-date-title">{title}</View>
            <Textarea autoHeight className="person-record-date-textarea" value={text} placeholder="..." ></Textarea>
        </View>
    </View>)
}