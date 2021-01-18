import Taro, {} from '@tarojs/taro'
import {View, Text, Button} from '@tarojs/components'
import './index.scss'
import TestCommonComponent from "@/components/test";

export default function Index() {

  return (
    <View className='index'>
      <Text onClick={() => console.log('您好，程序员！')}>Hello world!</Text>
      <TestCommonComponent/>
      <Button onClick={() => Taro.navigateTo({
        url: '/pages/test/index'
      })}> go to mobx page!</Button>
    </View>
  )
}
