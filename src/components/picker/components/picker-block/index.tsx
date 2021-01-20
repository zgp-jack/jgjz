import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

const PickerBlock: React.FC<{ text: string, click: () => void, active: boolean }> = ({text, click, active}) => {
  return (
    <View onClick={click} className={"picker-block" + (active ? ' picker-block-active' : '')}>
      {text}
    </View>
  )
}

export default PickerBlock;
