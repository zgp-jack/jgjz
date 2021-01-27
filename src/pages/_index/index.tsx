import Taro, {useEffect, eventCenter} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './index.scss'

export default function Index_() {

  useEffect(() => {
    eventCenter.on('test', (aa: string) => {
      console.log('我被触发了...', aa)
    })
    return () => eventCenter.off('test')
  }, [])

  return (
    <View className='index'>
      <Text onClick={() => console.log('您好，程序员！')}>Hello world!</Text>
      <Button onClick={() => Taro.navigateTo({
        url: '/pages/example_mobx/index'
      })}> go to mobx page!</Button>
      <Button onClick={() => Taro.navigateTo({
        url: '/pages/person_record/index'
      })}>个人记工</Button>
      <Button onClick={() => Taro.navigateTo({
        url: '/pages/person_borrowing/index'
      })}>个人记帐</Button>
      <Button onClick={() => Taro.navigateTo({
        url: '/pages/person_detail/index'
      })}>个人修改</Button>
    </View>
  )
}
