import Taro, {useState, useEffect} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {observer, useLocalStore} from '@tarojs/mobx'
import CounterStore from '@/store/counter';
import TestComponent from './components/test'
import './index.scss'

function Index() {
  const localStore = useLocalStore(() => CounterStore);
  const {increment, decrement, counter} = localStore

  return (
    <View className='index'>
      <Text onClick={() => increment()}>Hello world!</Text>
      <View onClick={decrement}>{counter}</View>
      <TestComponent/>
    </View>
  )
}

export default observer(Index)
