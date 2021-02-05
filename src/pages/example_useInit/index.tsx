import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import InitProvider from '@/components/init_provider'
import useInit from '@/hooks/init'
import getWorkNotesLists from './api'
import './index.scss'

export default function ExampleUseInit(){

  const { loading, data, errMsg } = useInit(getWorkNotesLists, { work_note: '685', business_time: ''}, [] )
  return (
    <InitProvider loading={loading} errMsg={errMsg} >
      <View className='index'>
        <Text onClick={() => console.log('您好，程序员！')}>请看控制台的打印信息</Text>
      </View>
    </InitProvider>
  )
}
