import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import TestCommonComponent from '@/components/test'

export default function Index(){

  return (
    <View className='index'>
      <Text onClick={() => console.log('您好，程序员！')}>Hello world!</Text>
      <TestCommonComponent />
      <Button onClick={ () => Taro.navigateTo({
        url: '/pages/test/index'
      })}> go to mobx page!</Button>
      <Button onClick={ () => Taro.navigateTo({
        url: '/pages/person_record/index'
      })}>个人记工</Button>
      <Button onClick={ () => Taro.navigateTo({
        url: '/pages/person_tally/index'
      })}>个人记帐</Button>
      <Button onClick={ () => Taro.navigateTo({
        url: '/pages/person_detail/index'
      })}>个人修改</Button>
    </View>
  )
}
