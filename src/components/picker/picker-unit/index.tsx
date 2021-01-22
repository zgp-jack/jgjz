import Taro, {useEffect, useState} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

import PickerBar from "@/components/picker/components/picker-bar";
import PopupBottom from "@/components/picker/components/popupBottom";
import PickerBody from "@/components/picker/components/picker-body";
import {PickerData, PickerProps} from "@/components/picker/type";

const PickerUnit: React.FC<PickerProps> = props => {
  const [activeData, setActiveData] = useState<PickerData>({id: 0, value: ''})
  return (
    <PopupBottom show={props.show} closePopup={props.close}>
      <View className="picker-work-time">
        <PickerBar centerText="选择单位" confirmClick={() => props.close()}>
        </PickerBar>
        <PickerBody data={props.value} onSelect={time => { props.confirm(time);setActiveData(time)}} activeData={activeData}/>
      </View>
    </PopupBottom>
  )
}

export default PickerUnit;
