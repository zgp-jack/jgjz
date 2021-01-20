import { View } from '@tarojs/components'
import './index.scss'

export default function LoadFooter({ text = '数据加载中...' }: {
  text?: string
}) {
  return (
    <View className='load-footer-container'>
      {text}
    </View>
  )
}