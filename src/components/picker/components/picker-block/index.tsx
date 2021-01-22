import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

const PickerBlock: React.FC<{ text: string, click: () => void, active: boolean, isTime?: boolean }> = ({text, click, active, isTime = false}) => {
  return (
    <View onClick={click} className={"picker-block" + (active ? ' picker-block-active' : '')}>
      {text}{isTime ? '小时' : ''}
    </View>
  )
}

export default PickerBlock;
