import Taro from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default function Index(){

  return (
<<<<<<< HEAD
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

=======
    <View className='index'>
      <Text onClick={() => console.log('您好，程序员！')}>Hello world!</Text>
      <TestCommonComponent />
      <Button onClick={ () => Taro.navigateTo({
        url: '/pages/work_team/record_work/index'
      })}> go to work_team!</Button>
>>>>>>> 6870b57e567ab4bb200e53ea3e2541499da6ce15
    </View>
  )
}
