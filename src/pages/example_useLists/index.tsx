import Taro, { useReachBottom, usePullDownRefresh, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import ListProvider from '@/components/list_provider'
import useList from '@/hooks/list'
import getBusinesslists from './api'
import './index.scss'

export default function ExampleUseLists(){

  const { loading, setLoading, increasing, list, errMsg, setIncreasing, hasmore } = useList(getBusinesslists, { work_note: '718', page: 1} )

  /** 刷新当前页 */
  usePullDownRefresh(() => {
    setLoading(true)
  })

  /** 触底加载下一页 */ 
  useReachBottom(() => {
    setIncreasing(true)
  })

  return (
    <ListProvider 
      increasing={increasing}
      loading={loading} 
      errMsg={errMsg}
      hasmore={hasmore}
      length={list.length}
    >
      <View className='index'>
        {list.map(item => (
          <Text className='example-text-title'>Hello world! -- {item.date}</Text>
        ))}
      </View>
    </ListProvider>
  )
}

ExampleUseLists.config = {
  enablePullDownRefresh: true
} as Config