import { View, Text, Image, Input } from '@tarojs/components'
import '@/pages/AddressBook/components/search/index.scss'
export default function TestComponent() {
  return (
    <View className="search">
      <View className="input_box">
        <Image src="https://jgjz.oss-cn-beijing.aliyuncs.com/new_mini/images/ws/search.png"></Image>
        <Input type="text" placeholder="请输入名字或者手机号码查询"></Input>
      </View>
      <View className="add">
        <View className="add_botton">
          <Text>添加工友</Text>
        </View>
      </View>
    </View>
  )
}