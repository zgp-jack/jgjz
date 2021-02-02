import { showBackModal } from '@/utils/msg'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import EmptyDate from '@/components/empty_data'
import LoadFooter from  '@/components/load_footer'
import ListProviderProps from './inter.d'

export default function ListProvider(props: ListProviderProps) {
  const { errMsg, children, className, hasmore, loading, length, increasing } = props
  if (errMsg) {
    showBackModal(errMsg)
  }

  const cls = classnames('pagination_provider', {
    // @ts-ignore
    [className]: !!className
  })

  if(!length){
    return (
      <View className={cls}>
        {!loading && <EmptyDate />}
      </View>
    )
  }

  const renderFooter = () => {
    if (loading || increasing) {
      return (
        <LoadFooter />
      )
    }
    if(!hasmore || length <= 19){
      return (
        <LoadFooter text='没有更多数据了' />
      )
    }
  }

  return (
    <View className={cls}>
      {children}
      {renderFooter()}
    </View>
  )
}

ListProvider.options = {
  addGlobalClass: true
}
