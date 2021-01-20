import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

interface PopupBottomProps {
  show: boolean
  closePopup: () => void
}

const PopupBottom: React.FC<PopupBottomProps> = props => {
  return (
    <View className={"popup"}>
      <View className="popup-mask" onClick={props.closePopup}/>
      <View className={"popup-container" + (props.show ? ' popup-model-show' : '')}>{props.children}</View>
    </View>
  )
}

export default PopupBottom;
