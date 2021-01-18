import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import TestCommonComponent from '@/components/test'
import InitProvider from '@/components/init_provider'
import useInit from '@/hooks/init'
import getIndexInfo from './api'
import './index.scss'

export default function Index(){

  const { loading, data, errMsg } = useInit(getIndexInfo, { work_note: '', page: 0},[] )

  console.log(data)
  return (
    <InitProvider loading={loading} errMsg={errMsg} >
      <View className='index'>
        <Text onClick={() => console.log('您好，程序员！')}>Hello world!</Text>
        <TestCommonComponent />
        <Button onClick={ () => Taro.navigateTo({
          url: '/pages/test/index'
        })}> go to mobx page!</Button>
      </View>
    </InitProvider>
  )
}
