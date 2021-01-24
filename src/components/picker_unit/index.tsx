import Taro, { useState } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import PickerUnitProps, { UnitTpey } from './inter.d'
import PickerUnit from "@/components/picker/picker-unit/index"
import './index.scss'

export default function PickerUnitWare({
    hideImg = true,
    img = `${IMGCDNURL}zgp/unit_icon.png`,
    title = '单位',
    value = {id: 0,value:''},
    set
}:PickerUnitProps){
  // 是否显示PickerUnit
  const [isPickerUnit, setIsPickerUnit] = useState<boolean>(false)
  // value值更新
  const [initValue, setInitValue] = useState<UnitTpey>(value)
  let unitValue = [
    { id: 1, value: '平方米' },
    { id: 2, value: '立方米'},
    { id: 3, value: '吨' },
    { id: 4, value: '米' },
    { id: 5, value: '个' },
    { id: 6, value: '次' },
    { id: 7, value: '天' }
  ]
  return (<View>
    <View className="person-record-overtime person-record-date" onClick={() => {setIsPickerUnit(true)}}>
      {hideImg && <Image className="person-record-date-img" src={img} />}
      <View className="person-record-modify-title person-record-date-title">{title}</View>
      <Text className="person-record-date-text">{initValue}</Text>
    </View>
    {isPickerUnit && <PickerUnit show={isPickerUnit} close={() => setIsPickerUnit(false)} value={unitValue} confirm={(data) => {setIsPickerUnit(false); setInitValue(data); set(data) }} />}
  </View>)
}