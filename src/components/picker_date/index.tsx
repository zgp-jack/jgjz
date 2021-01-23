import Taro, { useEffect, useState } from '@tarojs/taro'
import { View, Image, Text, Picker } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PickerDateProps from './inter'
import { getTodayDate } from '@/utils/index'
import './index.scss'

export default function PickerDate({
    hideImg = true,
    img = `${IMGCDNURL}zgp/date_icon.png`,
    title = '日期',
    date = getTodayDate(),
    change,
    DeletePickerDate
}:PickerDateProps){

  // 日期文本显示年月日
  const [dateText, setDateText] = useState<string>('')
  useEffect(() => {
    let dateArr: string[] = date.split('-')
    let dataStr: string = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
    setDateText(dataStr)
  }, [date])

  // 用户重置picker
  const userChangePicker = (e: any) => {
    let value = e.detail.value
    change && change(value)
  }

    return (
      <Picker mode='date' value={date} onChange={(e) => userChangePicker(e)} end={getTodayDate()}>
        <View>
        <View className="person-record-overtime person-record-date">
          {hideImg && <Image className="person-record-date-img" src={img} />}
          <View className="person-record-modify-title person-record-date-title">{title}</View>
            <Text className="person-record-date-text">{dateText}</Text>
            <Text className="overtime-icon" onClick={(e) => { e.stopPropagation(); DeletePickerDate()}}></Text>
        </View>
      </View>
      </Picker>)
}