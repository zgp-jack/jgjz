import Taro from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PickerMarkProps from './inter'
import './index.scss'

export default function PickerMark({
    hideImg = true,
    img = `${IMGCDNURL}zgp/mark_icon.png`,
    title = '备注',
    text = '',
    set
}:PickerMarkProps) {

    return (<View>
        <View className="person-record-overtime person-record-date person-record-note">
            {hideImg && <Image className="person-record-date-img" src={img} />}
            <View className="person-record-modify-title person-record-date-title">{title}</View>
            <Textarea 
              autoHeight={true}
              className="person-record-date-textarea" 
              value={text} 
              placeholder="..." 
              onInput={(e: any) => set&&set(e.detail.value)}
            ></Textarea>
        </View>
    </View>)
}