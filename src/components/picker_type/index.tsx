import Taro, {useState, useEffect} from '@tarojs/taro'
import {View, Image, Text, Input} from '@tarojs/components'
import PickerOption from '@/components/picker/picker-option'
import {IMGCDNURL} from '@/config/index'
import useInit from '@/hooks/init'
import userGetExpendType from './api'
import PickerTypeProps from './inter.d'
import {observer, useLocalStore} from '@tarojs/mobx'
import ClassifyType from '@/store/classify';
import './index.scss'

function PickerType({
                      img = `${IMGCDNURL}gl/Bookkeeping-icon.png`,
                      title = '分类',
                      value = '',
                      hideImg = false
                    }: PickerTypeProps) {

  // 是否显示picker
  const [show, setShow] = useState<boolean>(false)

  // 用户确认选择picker
  const userSurePicker = (data) => {
    setShow(true)
    console.log(data)
  }

  // 获取stroe里面的数据
  const {data} = useInit(userGetExpendType, {}, [])
  const localStore = useLocalStore(() => ClassifyType);
  const {initClassifyType, addClassifyType, delClassifyType, status} = localStore
  initClassifyType(data)


  return (
    <View>
      <View className="person-record-overtime person-record-date" onClick={() => setShow(true)}>
        {!hideImg && <Image className="person-record-date-img" src={img}/>}
        <View className="person-record-modify-title person-record-date-title">{title}</View>
        <Input className="person-record-date-text">{value}</Input>
        <Text className="overtime-icon"></Text>
      </View>

      {show &&
      <PickerOption
        close={() => setShow(false)}
        show={show}
        confirm={(data) => userSurePicker(data)}
        add={() => {
        }}
        data={data}
        status={status}
      />}
    </View>
  )
}

export default observer(PickerType)
