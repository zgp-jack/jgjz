import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default function Index(){

  return (
    <View>
      <Button onClick={() => Taro.navigateTo({
        url: '/pages/example_mobx/index'
      })}>How to use Mobx ?</Button>

      <Button onClick={() => Taro.navigateTo({
        url: '/pages/example_useInit/index'
      })}>How to use Hooks for useInit ?</Button>

      <Button onClick={() => Taro.navigateTo({
        url: '/pages/example_useLists/index'
      })}>How to use Hooks for useLists ?</Button>

    </View>
  )
}
