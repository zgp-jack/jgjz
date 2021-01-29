import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import { observer, useLocalStore } from '@tarojs/mobx'
import PickerUnitProps, { UnitType } from './inter.d'
import PickerUnit from "@/components/picker/picker-unit/index"
import './index.scss'
import userGetExpendType from './api'
import UnitStore from '@/store/unit';

export default function PickerUnitWare({
    hideImg = true,
    img = `${IMGCDNURL}zgp/unit_icon.png`,
    title = '单位',
    selected = 0,
    set
}:PickerUnitProps){
  // 是否显示PickerUnit
  const [isPickerUnit, setIsPickerUnit] = useState<boolean>(false)
  // 选中的单位
  const [selectUnit, setSelectUnit] = useState <UnitType>({id: 0,value: ''})
  // 是否已经加载过计量单位 
  const [loading, setLoading] = useState<boolean>(false)
  // 获取stroe里面的数据
  const localStore = useLocalStore(() => UnitStore);
  const { initUnitData, unitdata, status } = localStore
  // 获取计量单位
  const initUnitDataFun = () => {
    if (loading || status){
      setSelectUnit(unitdata[selected])
      set(unitdata[selected])
      return
    } 
    userGetExpendType({}).then((res) => {
      if(res.code == 0){
        let unitData:UnitType[] = [];
        res.data.forEach((item) => unitData.push({id:item.id,value:item.name}))
        setLoading(true)
        setSelectUnit(unitData[selected])
        set(res.data[selected])
        initUnitData(unitData)
      }
    })
  }
  useEffect(() => {
    initUnitDataFun()
  }, [selected])
  return (<View>
    <View className="person-record-overtime person-record-date" onClick={() => {setIsPickerUnit(true)}}>
      {hideImg && <Image className="person-record-date-img" src={img} />}
      <View className="person-record-modify-title person-record-date-title">{title}</View>
      <Text className="person-record-date-text">{selectUnit.value}</Text>
    </View>
    {isPickerUnit && <PickerUnit show={isPickerUnit} close={() => setIsPickerUnit(false)} value={unitdata} confirm={(data) => { setIsPickerUnit(false); setSelectUnit(data); set(data) }} />}
  </View>)
}