import { View, Image } from '@tarojs/components'
import { IMGCDNURL } from '@/config/index'
import EmptyDateProps from './inter.d'
import './index.scss'

export default function EmptyDate({
  img = 'common/empty_date_list.png?t=1',
  text = '暂无数据哟',
  hideImg = false,
  hideText = false
}: EmptyDateProps) {
  return (
    <View className='empty-container'>
      {!hideImg && <Image className='empty-image' src={`${IMGCDNURL}${img}`} mode='aspectFit'/>}
      {!hideText && <View className='empty-text'>{text}</View> }
    </View>
  )
}