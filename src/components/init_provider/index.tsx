import { showBackModal } from '@/utils/msg'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import InitProviderProps from './inter.d'

export default function InitProvider(props: InitProviderProps) {
  const { errMsg, children, className } = props
  if(errMsg) {
    showBackModal(errMsg)
  }

  const cls = classnames('pagination_provider', {
    // @ts-ignore
    [className]: !!className
  })

  return (
    <View className={cls}>
      {children}
    </View>
  )
}

InitProvider.options = {
  addGlobalClass: true
}
