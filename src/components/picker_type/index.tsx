import Taro,{ useState } from '@tarojs/taro'
import { View, Image, Text, Input }  from '@tarojs/components'
import classnames from 'classnames'
import PickerOption from '@/components/picker/picker-option'
import { IMGCDNURL } from '@/config/index'
import PickerTypeProps from './inter.d'
import './index.scss'

export default function PickerType({
  img = `${IMGCDNURL}gl/Bookkeeping-icon.png`,
  title = '分类',
  value =  '',
  hideImg = false
}: PickerTypeProps) {

  // 是否显示picker
  const [show, setShow] = useState<boolean>(false)

  // 用户确认选择picker
  const userSurePicker = () => {
    setShow(true)
  }

  return ( 
    <View>
      <View className="person-record-overtime person-record-date" onClick={() =>  setShow(true)}>
        {!hideImg && <Image className="person-record-date-img" src={img} />}
        <View className="person-record-modify-title person-record-date-title">{title}</View>
        <Input className="person-record-date-text">{value}</Input>
        <Text className="overtime-icon"></Text>
      </View>

      {show && <PickerOption close={() => setShow(false)} show={show} confirm={userSurePicker} />}
    </View>
  )
}