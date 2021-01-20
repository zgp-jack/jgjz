import Taro, {useEffect, useState} from '@tarojs/taro'
import {View, ScrollView, Image} from '@tarojs/components'
import './index.scss'
import edit from '@/images/bianj.png'
import remove from '@/images/shanc.png'
import PickerBar from "@/components/picker/components/picker-bar";
import PopupBottom from "@/components/picker/components/popupBottom";
import {PickerData} from "@/components/picker/picker-work-time";

interface PickerOptionProps {
  close: () => void
  show: boolean
  confirm: () => void
}


const PickerOption: React.FC<PickerOptionProps> = props => {
  const [data, setData] = useState<PickerData[]>([])
  useEffect(() => {
    let _data: PickerData[] = []
    for (let i = 1; i < 20; i++) {
      _data.push({id: i, value: '选项' + i})
    }
    setData(_data)
  }, [])
  return (
    <PopupBottom show={props.show} closePopup={props.close}>
      <View className="picker-option">
        <PickerBar centerText="选择分项" confirmClick={props.confirm}>
          <View className="picker-bar-children">添加</View>
        </PickerBar>
        <View className="picker-option-body">
          <ScrollView
            className='picker-body-scroll'
            scrollY
          >
            {
              data.length > 0 &&
              data.map(item => (
                <View className="picker-option-item" key={item.id}>
                  <View className="option-item-name">{item.value}</View>
                  <View className="option-item-icons">
                    <Image className="option-item-icon" src={edit}/>
                    <Image className="option-item-icon" src={remove}/>
                  </View>
                </View>
              ))
            }
          </ScrollView>
        </View>
      </View>
    </PopupBottom>
  )
}

export default PickerOption;
