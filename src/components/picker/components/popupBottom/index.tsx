import Taro, {useState, useEffect} from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'

interface PopupBottomProps {
  show: boolean
  closePopup: () => void
}

const PopupBottom: React.FC<PopupBottomProps> = props => {
  const [popup, setPopup] = useState(false)
  useEffect(() => {
    setPopup(props.show)
  }, [props.show])
  return (
    <View className={"popup" + (props.show ? ' show-popup' : '')}>
      <View className={"popup-mask" + (props.show ? ' show-mask' : '')} onClick={props.closePopup}/>
      <View className={"popup-container" + (popup ? ' popup-model-show' : '')}>{props.children}</View>
    </View>
  )
}

export default PopupBottom;
